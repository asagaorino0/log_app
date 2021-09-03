import * as React from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image } from 'react-native';
// import firebase from "../lib/firebase";
// import firestore from "../lib/firebase";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Detail } from '../types/detail'
import classname from 'classnames'
// import { makeStyles } from '@material-ui/core/styles';


export default function ReviewScreen({ navigation, route }) {
    const title = route.params?.title;
    const src = route.params?.src;
    const name = route.params?.name;
    const star = route.params?.star;
    const [postText, setPostText] = React.useState('');

    // const [uid, setUid] = React.useState(`${route.params?.uid}`);
    // const ref = React.useRef(null);
    // const [contents, setContents] = React.useState<[]>([]);
    // React.useEffect(() => {
    //     firebase.auth().signInAnonymously()
    //         .then(() => {
    //             firebase.auth().onAuthStateChanged((user) => {
    //                 if (user) {
    //                     var uid = user.uid;
    //                     setUid(uid)
    //                     firebase
    //                         .firestore()
    //                         .collection("contents")
    //                         .orderBy("title")
    //                         .onSnapshot((snapshot) => {
    //                             const contents = snapshot.docs.map((doc, id) => {
    //                                 return doc.id &&
    //                                     doc.data()
    //                             });
    //                             // setContents(contents);
    //                             console.log(contents)
    //                         })
    //                 }
    //             })
    //         })
    // }, [])

    React.useEffect(() => {
        navigation.setOptions({
            // title: title,
            title,

            headerLeft: () => (
                // <Button title="X" onPress={() => navigation.goBack()} />
                <Button onPress={() => navigation.goBack()} title="✕" />

            ),

        });
    }, [navigation, title, src]);

    type RootStackParamList = {
        Main: undefined;
        Detail: { item: Detail };
    };
    type Props = {
        navigation: StackNavigationProp<RootStackParamList, "Detail">;
        route: RouteProp<RootStackParamList, "Detail">;
    };

    return (
        <View style={styles.image}>
            {/* <Image style={styles.image} source={{ uri: src }}></Image> */}
            <Text style={{ margin: 10 }}>name: {name}</Text>
            <Text style={{ fontSize: 30 }}>レビュー</Text>
            <TextInput
                multiline
                placeholder="What's your Review?"
                style={{ height: 200, padding: 10, backgroundColor: 'white' }}
                value={postText}
                onChangeText={setPostText}
            />
            <Button onPress={() => navigation.goBack()} title="Mainへ" />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 250,
        resizeMode: "cover",
    },
    button: {
        flexBasis: '10%',
        color: "black",
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        color: 'rgba(14, 13, 13, .38)',
    },
    paragraph: {
        fontSize: 18,
        color: '#737373',
    },
});
