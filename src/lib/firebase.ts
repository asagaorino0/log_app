import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import Constants from 'expo-constants';
if (!firebase.apps.length) {
    firebase.initializeApp(Constants.manifest.extra!.firebase);
}
export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()

// export const functions = firebase.functions()
// export function getFunctions() {
//     const region = 'us-central1'
//     return firebase.app().functions(region)
// }
export default firebase