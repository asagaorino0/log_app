import * as React from 'react';
import { View, Text } from 'react-native';
import firebase from "../lib/firebase";
import "firebase/firestore";

export default function FourthScreen({ navigation, route }: { navigation: any, route: any }) {
    const [uid, setUid] = React.useState(`${route.params?.uid}`);
    const [name, setName] = React.useState('');
    const [user, setUser] = React.useState('');
    const [age, setAge] = React.useState('');
    React.useEffect(() => {
        firebase.auth().signInAnonymously()
            .then(() => {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        var uid = user.uid;
                        setUid(uid)
                        firebase
                            .firestore()
                            .collection("users")
                            .where("id", "==", `${user.uid}`)
                            .get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    console.log(doc.id, " => ", doc.data())
                                    setUser(doc.data())
                                    setName(doc.data().name)
                                    setAge(doc.age)
                                    console.log(user)
                                })
                            })
                    }
                })
            })
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ margin: 10 }}>uid: {uid}</Text>
            <Text style={{ margin: 10 }}>name: {`${user.name}`}</Text>
            <Text style={{ margin: 10 }}>age: {`${user.age}`}</Text>
        </View>
    );
}