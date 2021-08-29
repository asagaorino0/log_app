import * as React from 'react';
import { View, ScrollView, Text, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';
import firebase from "../lib/firebase";
import firestore from "../lib/firebase";
import Card from '../components/Card'
// import { makeStyles } from '@material-ui/core/styles';

export default function MainScreen({ navigation, route }: { navigation: any, route: any }) {
    const [uid, setUid] = React.useState(`${route.params?.uid}`);
    const ref = React.useRef(null);
    // const [name, setName] = React.useState('');
    // const [user, setUser] = React.useState('');
    // const [age, setAge] = React.useState('');
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

    type card = {
        contents: any,
        navigation: any,
        key: any
    }

    return (
        <View style={styles.container} >

            <ScrollView
                ref={ref}
            // numColumns={2}
            >

                {contents.length !== 0 &&
                    contents.map((contents, id) => {

                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('DScreen')}
                            >
                                <Card
                                    contents={contents}
                                    key={id}
                                // numColumns={2}
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
        </View>
    );
}

const { width } = Dimensions.get("window");
const CONTAINER_WIDTH = width / 2;

// const useStyles = makeStyles({

const styles = StyleSheet.create({
    container: {
        width: width,
        // padding: 8,
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        // flexWrap: 'wrap',//スクロールが無効になってしまう
    },
    display: {
        flexDirection: 'row',
        display: 'flex'
    },
});
