import * as functions from 'firebase-functions';
import { User } from "../../log_web/src/types/user";
import { Review } from "../../log_web/src/types/review";
import { Detail } from "../../log_web/src/types/detail";
import algoliasearch from "algoliasearch";

const ALGOLIA_ID = functions.config().algolia.id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.key;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex("log_app");
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

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
