import * as functions from 'firebase-functions';
import { User } from "../../log_web/src/";
import algoliasearch from "algoliasearch";

const ALGOLIA_ID = functions.config().algolia.id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.key;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
// const index = client.initIndex("log_app");


const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
exports.updateUser = functions
    .region("us-central1")
    .firestore.document("users/{userID}")
    .onUpdate(async (change, context) => {
        const previousValue = change.before.data();
        const newValue = change.after.data();
        const userId = previousValue.userId;
        const newUser = newValue.name as User;
        console.log('1', userId)
        console.log('2', newValue.name)
        console.log('3', newUser)
        try {
            const snapshot = await db
                .collection("contents")
                .where("userId", "==", userId)
                .get();
            const batch = db.batch();
            // snapshot.docs.forEach((contents: any) => {
            snapshot.docs.forEach((contentsDoc: any) => {
                // const user = { ...contentsDoc.data().user, name: newValue.name };
                const user = { name: newValue.name };
                // batch.update(contentsDoc.ref, { user });
                batch.set(contentsDoc.ref, user, { merge: true });
                // batch.set(contents, { user }, { merge: true });
            });
            await batch.commit();
        } catch (err) {
            console.log(err);
        }
    });

import axios from 'axios';
import { JSDOM } from 'jsdom'
export const getOgpFromExternalWebsite = functions.https.onRequest(async (request, response) => {
    const targetUrls = extractUrlParams(request, response);
    console.log('encodedUri::', targetUrls)
    if (!targetUrls) return;
    const ogps: any = {};
    // リクエストで渡されたURLごとにOGPを取得
    await Promise.all(
        targetUrls.map(async (targetUrl: string) => {
            const encodedUri = encodeURI(targetUrl);
            console.log('encodedUri::', encodedUri)
            const headers = { 'User-Agent': 'bot' };
            try {
                const res = await axios.get(encodedUri, { headers: headers });
                const html = res.data;
                const dom = new JSDOM(html);
                const meta = dom.window.document.head.querySelectorAll("meta");
                const ogp = extractOgp([...meta]);
                // URLをキーとして、取得したOGPをまとめて返す
                ogps[targetUrl] = ogp;
            } catch (error) {
                console.error(error)
                sendErrorResponse(response, error)
            }
        }));
    response.status(200).json(ogps);
})
// リクエストからOGPを取得しに行くURLを抽出
function extractUrlParams(request: functions.https.Request, response: functions.Response<any>): string[] {
    const url = request.query.url;
    const urls = request.query.urls;
    if (url && urls) {
        sendErrorResponse(response, "Request query can't have both 'url' and 'urls'");
        return [];
    } else if (url) {
        if (Array.isArray(url)) {
            sendErrorResponse(response, "'url' must be string");
            return [];
        }
        return [<string>url];
    } else if (urls) {
        if (!Array.isArray(urls)) {
            sendErrorResponse(response, "'urls' must be array of string");
            return [];
        }
        return <string[]>urls;
    } else {
        sendErrorResponse(response, "Either 'url' or 'urls' must be included");
        return [];
    }
}
// HTMLのmetaタグからogpを抽出
function extractOgp(metaElements: HTMLMetaElement[]): object {
    const ogp = metaElements
        .filter((element: Element) => element.hasAttribute("property"))
        .reduce((previous: any, current: Element) => {
            const property = current.getAttribute("property")?.trim();
            if (!property) return;
            const content = current.getAttribute("content");
            previous[property] = content;
            return previous;
        }, {});
    return ogp;
}
function sendErrorResponse(response: functions.Response<any>, message: string): void {
    response.status(400).send(message);
}

