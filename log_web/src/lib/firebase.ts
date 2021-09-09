import firebase from 'firebase/app';
import { useContext, useState } from 'react';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import Constants from 'expo-constants';
import { User, initialUser } from "../types/user";

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
        // user: []
    } as User;
};
// export const contentsLoad = () => {
//     const [contents, setContents] = useState([]);
//     firebase
//         .firestore()
//         .collection("contents")
//         .orderBy("title")
//         .onSnapshot((snapshot) => {
//             const contents = snapshot.docs.map((doc, id) => {
//                 return doc.id &&
//                     doc.data()
//             });
//         })
// };

export default firebase