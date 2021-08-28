import * as React from 'react';
import { ScrollView, TouchableWithoutFeedback, Keyboard, Dimensions, StyleSheet, Button } from 'react-native';
import firebase from "../lib/firebase";
import "firebase/firestore";
import "firebase/auth";
import { useScrollToTop } from '@react-navigation/native';
import Card from '../components/Card'
import { StackNavigationProp } from "@react-navigation/stack";
import A from '../screens/A';
import D from '../screens/D';
// type Props = {
//     navigation: StackNavigationProp<RootStackParamList, "Home">;
//   };

type RootStackParamList = {
    Main: undefined;
    Profile: { userId: string };
    Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = StackNavigationProp<RootStackParamList, 'Main'>;

export default function MsgList({ navigation }) {
    const ref = React.useRef(null);
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

    // const onPressSrc = () => {
    //     () => navigation.navigate('Home')
    // };
    return (
        // <TouchableWithoutFeedback
        //     onPress={() => {
        //         Keyboard.dismiss()
        //     }}>


        <ScrollView ref={ref} style={{ flexDirection: "row", flexWrap: 'wrap' }}  >

            {contents.length !== 0 &&
                contents.map((contents) => {
                    return (
                        <Card
                            contents={contents}
                            key={`${contents.id} `}
                            // onPress={onPressSrc}
                            onPress={() => navigation.navigate('AScreen')}
                        // onClick={() => navigation.navigate('Profile')}
                        />

                    )
                })}
            <Button
                onPress={() => navigation.navigate('AScreen')}
                title="Open Modal　AAA"
            />
            <Button
                onPress={() => navigation.navigate('DScreen')}
                title="Open Modal　DDD"
            />

        </ScrollView>

        // </TouchableWithoutFeedback >
    );
}


// const { width } = Dimensions.get("window");
// const CONTAINER_WIDTH = width / 2;
// const PADDING = 16;
// const IMAGE_WIDTH = CONTAINER_WIDTH - PADDING * 2;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // alignItems: "center",
    }
    // image: {
    //     width: IMAGE_WIDTH,
    //     height: IMAGE_WIDTH * 0.7,
    // },
    // titleText: {
    //     fontSize: 16,
    //     color: "#000",
    //     marginTop: 8,
    //     fontWeight: "bold",
    // },
    // text: {
    //     fontSize: 12,
    //     color: "#888",
    //     marginVertical: 8,
    // },
});