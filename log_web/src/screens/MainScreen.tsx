import * as React from 'react';
import { View, ScrollView, Text, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';
import firebase from "../lib/firebase";
import "firebase/firestore";
import MsgList from '../components/MsgList'
import Card from '../components/Card'

// export default function MainScreen({ navigation }) {
export default function MainScreen({ navigation, route }: { navigation: any, route: any }) {
    const [uid, setUid] = React.useState(`${route.params?.uid}`);
    const ref = React.useRef(null);
    // const [name, setName] = React.useState('');
    // const [user, setUser] = React.useState('');
    // const [age, setAge] = React.useState('');
    const [contents, setContents] = React.useState('');
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
                            .orderBy("title")
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

    return (
        // <View style={styles.container}>

        <ScrollView ref={ref} style={styles.container}  >

            {contents.length !== 0 &&
                contents.map((contents) => {
                    return (
                        <TouchableOpacity
                            // <TouchableOpacity style={styles.container}
                            onPress={() => navigation.navigate('DScreen')}>
                            <Card
                                contents={contents}
                                key={`${contents.name} `}
                            // onPress={onPressSrc}
                            // onPress={() => navigation.navigate('AScreen')}
                            // onClick={() => navigation.navigate('Profile')}
                            />
                        </TouchableOpacity>
                    )
                })}
            <Button
                onPress={() => navigation.navigate('AScreen')}
                title="Open Modal　AA"
            />
            <Button
                onPress={() => navigation.navigate('DScreen')}
                title="Open Modal　DD"
            />
        </ScrollView>
        //* </View> */ 
    );
}

const { width } = Dimensions.get("window");
const CONTAINER_WIDTH = width / 2;

const styles = StyleSheet.create({
    button: {
        flexBasis: '10%',
        color: "black",
        justifyContent: 'center',
    },
    container: {
        width: CONTAINER_WIDTH,
        padding: 8,
    },
    display: {
        flexDirection: 'row',
        display: 'flex'
    },
});
