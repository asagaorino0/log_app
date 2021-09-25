import * as functions from 'firebase-functions';
import { User } from "../../log_web/src/types/user";
import { Review } from "../../log_web/src/types/review";
import { Detail } from "../../log_web/src/types/detail";
import algoliasearch from "algoliasearch";
const ALGOLIA_ID = "850F8FHWU7";
const ALGOLIA_ADMIN_KEY = "9e4c58d0332abb3ca4b8c5d2d06100f9";
// const ALGOLIA_ID = functions.config().algolia.id;
// const ALGOLIA_ADMIN_KEY = functions.config().algolia.key;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
// const algoliasearch = require('algoliasearch').default;
// const client = algoliasearch(functions.config().algolia.app_id, functions.config().algolia.api_key);
const index = client.initIndex("log_app");
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// const { TranslationServiceClient } = require('@google-cloud/translate');
const { TranslationServiceClient } = require("@google-cloud/translate").v3;

const projectId = "log-app-6b654";
const location = "asia-northeast2";

// // 言語判定
// async function detectLanguage(text: any) {
//     const translationClient = new TranslationServiceClient();
//     const req = {
//         parent: translationClient.locationPath(projectId, location),
//         content: text,
//         mimeType: "text/plain"
//     };
//     const res = await translationClient.detectLanguage(req);
//     // let sourceLang = null;
//     for (const elem of res) {
//         if (elem == null) // なぜかnullがレスポンスに含まれる
//             continue;
//         return elem["languages"][0]["languageCode"];
//     }
// }

// // 翻訳
// async function translate(text: any, sourceLang: any, targetLang: any) {
//     const translationClient = new TranslationServiceClient();
//     const req = {
//         parent: translationClient.locationPath(projectId, location),
//         contents: [text],
//         mimeType: "text/plain",
//         sourceLanguageCode: sourceLang,
//         targetLanguageCode: targetLang,
//     };
//     const res = await translationClient.translateText(req);
//     for (const elem of res) {
//         if (elem == null) // なぜかnullがレスポンスに含まれる
//             continue;
//         return elem["translations"][0]["translatedText"];
//     }
// }

// async function sample(text: any) {
//     const result = {};
//     console.log(text)
//     // result["original"] = text;


//     // 言語判定
//     const sourceLang = await detectLanguage(text);

//     // 翻訳
//     for (const targetLang of ["en", "ja", "zh-TW", "zh-CN", "ge"]) {
//         if (targetLang == sourceLang) // Target language can't be equal to source language. というエラーを防ぐため
//             continue;
//         const targetText = await translate(text, sourceLang, targetLang);
//         console.log(targetText)
//         // result[targetLang] = targetText;
//     }

//     return result;
// }

// exports.helloWorld = async function (req: any, res: any) {
//     sample("Hello, World!").then(result => {
//         console.log(result);
//         res.send(result);
//     }).catch(err => {
//         console.log(err);
//     });
// };


const translate = new TranslationServiceClient();
// List of output languages.
const LANGUAGES = ["en", "ja", "zh-TW", "zh-CN"];
// Translate an incoming message.
exports.translate = functions
    .region("us-central1")
    .database.ref("contents/{itemId}/reviews/{reviewId}").onUpdate(
        (change, context) => {
            const snapshot = change.after;
            if (snapshot.val().translated) {
                return null;
            }
            const promises = [];
            for (let i = 0; i < LANGUAGES.length; i++) {
                const language = LANGUAGES[i];

                if (language !== context.params.languageID) {
                    promises.push(async () => {
                        const results = await translate.translateText({
                            contents: [snapshot.val().message],
                            parent: translate.locationPath(projectId, location),
                            sourceLanguageCode: context.params.languageID,
                            targetLanguageCode: language
                        });
                        return admin.database().ref(`contents/{itemId}/reviews/{reviewId}/${snapshot.key}`).set({
                            message: results[0],
                            translated: true,
                        });
                    });
                }
            }
            return Promise.all(promises);
        });


exports.onReview = functions
    .region("us-central1")
    .firestore.document("contents/{itemId}/reviews/{reviewId}")
    .onUpdate(async (change, context) => {
        const { itemId, reviewId } = context.params;
        const review = change.after.data() as Review;
        const db = admin.firestore();
        try {
            const contentsRef = db.collection("contents").doc(itemId);
            const contentsDoc = await contentsRef.get();
            const contents = contentsDoc.data() as Detail;
            console.log(contents.title)
            index.saveObject({
                objectID: reviewId,
                ...review,
            });
        } catch (err) {
            console.log(err);
        }
    });

exports.delReview = functions
    .region("us-central1")
    .firestore.document("contents/{itemId}/reviews/{reviewId}")
    .onDelete((snap, context) => {
        const { reviewId } = context.params;
        const deletedValue = snap.data();
        console.log(deletedValue)
        index.deleteObject(reviewId)
    });

exports.updateUser = functions
    .region("us-central1")
    .firestore.document("users/{userID}")
    .onUpdate(async (change, context) => {
        const previousValue = change.before.data();
        const newValue = change.after.data();
        const userId = previousValue.userId;
        const newUser = newValue.name as User;
        console.log('newUser', newUser)
        try {
            const snapshot = await db
                .collectionGroup("reviews")
                .where("userId", "==", userId)
                .orderBy("timestamp", "asc")
                .get();
            const batch = db.batch();
            snapshot.docs.forEach((contentsDoc: any) => {
                const user = { name: newValue.name };
                batch.set(contentsDoc.ref, user, { merge: true });
            });
            await batch.commit();
        } catch (err) {
            console.log(err);
        }
    });
