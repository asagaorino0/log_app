import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import Constants from 'expo-constants';
import { User } from "../types/user";
import { Detail } from '../types/detail'
import { Review } from "../types/review";

if (!firebase.apps.length) {
    firebase.initializeApp(Constants.manifest.extra!.firebase);
}
export const firestore = firebase.firestore()
export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()

export const loginUser = async () => {
    const userCredential = await firebase.auth().signInAnonymously();
    const { uid } = userCredential.user;
    const userDoc = await firebase.firestore().collection("users").doc(uid).get();
    return {
        userId: uid,
        name: userDoc.data().name,
    } as User;
};
// export const getReviews = async (id: string) => {
//     const reviewDocs = await
//         db
//             .collection("contents")
//             .doc(id)
//             .collection("reviews")
//             // .where('batu', '==', 0)
//             .orderBy("timestamp", "desc")
//             .get();
//     return reviewDocs.docs.map(
//         (doc) => ({ ...doc.data(), reviewId: doc.id } as Review)
//         // , alert(id),
//     );
// };
export const getReviews = async (id: string) => {
    const reviewDocs = await
        db
            .collection("contents")
            .doc(id)
            .collection("reviews")
            // .where('batu', '==', 0)
            .orderBy("timestamp", "desc")
            .get();
    return reviewDocs.docs.map(
        (doc: any) => ({ ...doc.data() } as Review),
    );
};
export const createReview = async (review: any, id: string) => {
    const reviewDocs = await
        db.collection("contents")
            .doc(id)
            .collection("reviews")
            .add(review)
            .then((docref) => {
                db.collection('contents')
                    .doc(id)
                    .collection("reviews").doc(docref.id).set({
                        reviewId: docref.id,
                    }, { merge: true }//←上書きされないおまじない
                    )
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            })
}
export const createContent = async (content: any) => {
    const contentDocs = await
        db.collection("contents")
            .add(content)
            .then((docref) => {
                db.collection('contents').doc(docref.id).set({
                    id: docref.id,
                }, { merge: true }//←上書きされないおまじない
                )
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            })
}
export default firebase