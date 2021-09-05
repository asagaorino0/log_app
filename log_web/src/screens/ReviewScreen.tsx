import * as React from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import firebase from "../lib/firebase";
import firestore from "../lib/firebase";
import { storage } from "../lib/firebase";
import * as ImagePicker from 'expo-image-picker';
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Detail } from '../types/detail'
import ButtonIcon from '../components/ButtonIcon'
import classname from 'classnames'

export default function ReviewScreen({ navigation, route }) {
    const item = route.params;
    const title = route.params?.title;
    const src = route.params?.src;
    const name = route.params?.name;
    const star = route.params?.star;
    const [reviewText, setReviewText] = React.useState('');
    const [image, setImage] = React.useState(null);
    const [uid, setUid] = React.useState(`${route.params?.uid}`);
    const [user, setUser] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [dsc, setDsc] = React.useState("");
    const db = firebase.firestore()
    const [loading, setLoading] = React.useState<boolean>(false);
    React.useEffect(() => {
        navigation.setOptions({
            title,
            headerLeft: () => (
                <Button onPress={() => navigation.goBack()} title="✕" />
            ),
        });
    }, [item]);
    type RootStackParamList = {
        Main: undefined;
        Detail: { item: Detail };
    };
    type Props = {
        navigation: StackNavigationProp<RootStackParamList, "Detail">;
        route: RouteProp<RootStackParamList, "Detail">;
        ButtonIcon: any
    };
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    const handleCreate = async () => {
        await
            handleUpload()
        db.collection('contents').add({
            name: `${name}`,
            title,
            src: `${image}`,
            dsc,
            url,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            star: 0,
        })
            .then((docref) => {
                db.collection('contents').doc(docref.id).set({
                    id: docref.id,
                }, { merge: true }//←上書きされないおまじない
                )
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            })
    }
    const uploadImage = async (uri: string, path: string) => {
        const localUri = await fetch(uri);
        const blob = await localUri.blob();
        const ref = firebase.storage().ref().child(path);
        let downloadUrl = "";
        try {
            await ref.put(blob);
            downloadUrl = await ref.getDownloadURL();
        } catch (err) {
            console.log(err);
        }
        return downloadUrl;
    };
    const handleUpload = async () => {
        setLoading(true);
        try {
            const storagePath = `/images/${image}`;
            const downloadUrl = await uploadImage(image, storagePath);
            setImage("")
        }
        catch (error) {
        }
        setLoading(false);
        navigation.goBack();
    };
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
            }}>
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>name: {name}</Text>
                <Text style={{ fontSize: 30 }}>レビュー</Text>
                <TextInput
                    placeholder="What's your Review?"
                    style={{ height: 30, padding: 10, backgroundColor: 'white' }}
                    value={reviewText}
                    onChangeText={setReviewText}
                    multiline={true}
                />
                <TextInput
                    placeholder="詳細"
                    style={{ height: 30, padding: 10, backgroundColor: 'white' }}
                    value={dsc}
                    onChangeText={setDsc}
                />
                <TextInput
                    placeholder="　url"
                    style={styles.input}
                    value={url}
                    onChangeText={setUrl}
                />
                <ButtonIcon name="camera-retro" onPress={pickImage} color="gray" />
                {image ? <Image source={{ uri: image }} style={styles.image} /> : null}
                <Button onPress={() => handleCreate()} title="レビューを投稿する" />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 150,
        resizeMode: "cover",
    },
    button: {
        flexBasis: '100%',
        color: 'white',
        backgroundColor: "black",
        justifyContent: 'center',
    },
    container: {
        width: "100%",
        height: 250,
        resizeMode: "cover",
    },
    heading: {
        fontSize: 24,
        color: 'rgba(14, 13, 13, .38)',
    },
    input: {
        height: 50,
        borderColor: "#999",
        borderBottomWidth: 1,
        backgroundColor: 'white',
        // marginTop: 10,
    },
});
