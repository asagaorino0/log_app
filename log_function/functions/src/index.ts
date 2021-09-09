import * as functions from "firebase-functions";
import { User } from "../../../log_web/src/types/user";

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

// exports.userTrigger = functions.firestore
//     .document('users/{name}')
//     .onUpdate((change, context) => {
//         const previousValue = change.before.data();
//         console.log(previousValue.userId)
//         const newValue = change.after.data();
//         const name = newValue.name;
//         console.log(name)
//         const batch = db.batch();
//         db.collectionGroup("contents")
//             .where("userId", "==", previousValue.userId)
//             .onSnapshot((querySnapshot: any) => {
//                 // var messages: any = [];
//                 querySnapshot.forEach((doc: any) => {
//                     // batch.set(cities, { name: 'New York City' }, { merge: true });
//                     console.log("WW", doc.data());
//                     // messages.push(doc.data().age);
//                     batch.set(doc.data(), { name: name }, { merge: true });
//                 });
//             });
//     });

