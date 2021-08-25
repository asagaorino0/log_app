import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from "../lib/firebase";
import "firebase/firestore";
import MsgList from '../components/MsgList'

export default function MainScreen({ navigation, route }: { navigation: any, route: any }) {
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
                                    setName(doc.data().name)
                                })
                            })
                    }
                })
            })
    }, [])

    return (
        <View style={styles.container}>
            <MsgList />
        </View>

        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Text style={{ margin: 10 }}>uid: {uid}</Text>
        //     <Text style={{ margin: 10 }}>name: {`${name}`}</Text>
        // </View>
    );
}

const styles = StyleSheet.create({
    button: {
        flexBasis: '10%',
        color: "black",
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    display: {
        flexDirection: 'row',
        display: 'flex'
    },
});
