import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import Constants from 'expo-constants';
if (!firebase.apps.length) {
    firebase.initializeApp(Constants.manifest.extra!.firebase);
}
export const firestore = firebase.firestore()
export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()


export default firebase