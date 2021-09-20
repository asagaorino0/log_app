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
    const userDoc = await firebase.firestore().collection("users").doc(`${uid}`).get();
    return {
        userId: uid,
        name: userDoc.data().name,
    } as User;
};
export const getReviews = async (id: string) => {
    const reviewDocs = await firebase
        .firestore()
        .collection("contents")
        .doc(id)
        .collection("reviews")
        .orderBy("timestamp", "desc")
        .get();
    return reviewDocs.docs.map(
        (doc) => ({ ...doc.data(), reviewId: doc.id } as Review)
    );
};

export default firebase