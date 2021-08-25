import * as React from 'react';
import { ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import firebase from "../lib/firebase";
import "firebase/firestore";
import "firebase/auth";
import { useScrollToTop } from '@react-navigation/native';
import Card from '../screens/Card'
import MyCard from '../screens/MyCard'

export default function MsgList({ navigation }: { navigation: any }) {

    const [uid, setUid] = React.useState('');
    const [name, setName] = React.useState('');
    const [user, setUser] = React.useState('');
    const [age, setAge] = React.useState('');
    const [contents, setContents] = React.useState('');
    const db = firebase.firestore()
    React.useEffect(() => {
        firebase.auth().signInAnonymously()
            .then(() => {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        var uid = user.uid;
                        setUid(uid)
                        firebase
                            .firestore()
                            .collection("contents")
                            .orderBy("timestamp")
                            .onSnapshot((snapshot) => {
                                const contents = snapshot.docs.map((doc) => {
                                    return doc.id &&
                                        doc.data()
                                });
                                setContents(contents);
                                console.log(contents)
                            })
                    }
                })
            })
    }, [])

    const ref = React.useRef(null);
    // const ref = (component) => this.ScrollView = component
    // useScrollToTop(ref);


    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
            }}>

            <ScrollView ref={ref}>
                {contents.length !== 0 &&
                    contents.map((contents, index) => {
                        return (
                            <Card contents={contents} key={`${contents.id} `} />
                        )
                    })}
            </ScrollView>
        </TouchableWithoutFeedback >
    );

}