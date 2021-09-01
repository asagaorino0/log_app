import * as React from 'react';
import { SafeAreaView, View, FlatList, TextInput, StyleSheet, Image, Button, TouchableOpacity, Dimensions, Alert } from 'react-native';
import firebase from "../lib/firebase";
import firestore from "../lib/firebase";
import Card from '../components/Card'
import { StackNavigationProp } from "@react-navigation/stack";
import { Detail } from '../types/detail'
// import { makeStyles } from '@material-ui/core/styles';
type RootStackParamList = {
    Main: undefined;
    Detail: { contents: Detail };
};
type Props = {
    navigation: StackNavigationProp<RootStackParamList, "Main">;
};
export default function MainScreen({ navigation, route }: { navigation: any, route: any }) {
    const [uid, setUid] = React.useState(`${route.params?.uid}`);
    const ref = React.useRef(null);
    const [contents, setContents] = React.useState([]);
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

    return (
        <SafeAreaView style={styles.container} >
            <FlatList
                data={contents}
                // key={`${contents.id}`}
                renderItem={({ item }: { item: Detail }) => {

                    const handleDetail = (item: Detail) => {
                        // setItem(item)
                        alert(item)
                        navigation.navigate({
                            name: 'Detail',
                            params: { itemmm: item.title },
                            merge: true,
                        });
                    }
                    return (
                        <TouchableOpacity
                            onPress={() => handleDetail(item)}
                        >
                            <Card
                                contents={item}
                                key={item.id}
                            />
                        </TouchableOpacity>

                    )
                }}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
            />
            <Button
                onPress={() => navigation.navigate('Detail')}
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
