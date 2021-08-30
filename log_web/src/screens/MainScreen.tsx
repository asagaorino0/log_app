import * as React from 'react';
import { SafeAreaView, View, FlatList, Text, StyleSheet, Image, Button, TouchableOpacity, Dimensions, Alert } from 'react-native';
import firebase from "../lib/firebase";
import firestore from "../lib/firebase";
import Card from '../components/Card'
// import { Divider } from 'react-native-elements';
// import { Card, Title, Paragraph } from 'react-native-paper';
// import { FontAwesome } from '@expo/vector-icons';
// import { makeStyles } from '@material-ui/core/styles';

export default function MainScreen({ navigation, route }: { navigation: any, route: any }) {
    const [uid, setUid] = React.useState(`${route.params?.uid}`);
    const ref = React.useRef(null);
    // const [name, setName] = React.useState('');
    // const [user, setUser] = React.useState('');
    // const [age, setAge] = React.useState('');
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
                                setContents(contents);
                                console.log(contents)
                            })
                    }
                })
            })
    }, [])

    interface card {
        // contents: [],
        navigation: any,
        key: any
        src: string
        title: string
        name: string
        star: number
        id: string
    }

    return (
        <SafeAreaView style={styles.container} >

            <FlatList
                data={contents}
                renderItem={({ item }: { item: card }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('DetailScreen')}
                    >
                        <Card
                            contents={item}
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
            />
            {/* <Button
                onPress={() => navigation.navigate('AScreen')}
                title="Open Modal　AA"
            /> */}
            <Button
                onPress={() => navigation.navigate('DetailScreen')}
                title="Open D"
            />
        </SafeAreaView >


    );
}

const { width } = Dimensions.get("window");
const CONTAINER_WIDTH = width / 2;

// const useStyles = makeStyles({

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    display: {
        flexDirection: 'row',
        display: 'flex'
    },
});
