import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import firebase from "../lib/firebase";
import firestore from "../lib/firebase";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Detail } from '../types/detail'
// import { makeStyles } from '@material-ui/core/styles';


export default function DetailScreen({ navigation, route }) {
    // const { content } = route.params;
    const [uid, setUid] = React.useState(`${route.params?.uid}`);
    const ref = React.useRef(null);
    const [contents, setContents] = React.useState<[]>([]);
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
                                const contents = snapshot.docs.map((doc, id) => {
                                    return doc.id &&
                                        doc.data()
                                });
                                // setContents(contents);
                                console.log(contents)
                            })
                    }
                })
            })
    }, [])

    type RootStackParamList = {
        Main: undefined;
        Detail: { itemmm: Detail };
    };
    type Props = {
        navigation: StackNavigationProp<RootStackParamList, "Detail">;
        route: RouteProp<RootStackParamList, "Detail">;
    };


    return (
        <View style={styles.container}>
            <Text style={{ margin: 10 }}>contents: {route.params?.itemmm}</Text>

            <Text style={{ fontSize: 30 }}>This is a {route.params?.itemmm}!</Text>
            <Button onPress={() => navigation.goBack()} title="Mainへ" />
        </View>
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
