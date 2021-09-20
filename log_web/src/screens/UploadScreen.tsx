import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import firebase from "../lib/firebase";
import * as ImagePicker from 'expo-image-picker';
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/rootStackParamList";
import { loginUser } from "../lib/firebase";
import ButtonIcon from '../components/ButtonIcon'
import { UserContext } from "../context/userContext";

export default function UploadScreen({ navigation, route }) {
    const { user } = useContext(UserContext)
    const [name, setName] = useState('');
    const item = route.params;
    const src = route.params?.src;
    const star = route.params?.star;
    const [reviewText, setReviewText] = useState('');
    const [image, setImage] = useState<string>(null);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [git, setGit] = useState('');
    const [dsc, setDsc] = useState("");
    const db = firebase.firestore()
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await loginUser();
            console.log(user.name)
            setName(user.name)
        };
        fetchUser();
    }, []);

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
            name: `${user.name}`,
            title,
            src: `${image}`,
            dsc,
            git,
            url,
            userId: `${user.userId}`,
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
        navigation.goBack();
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
    };
    return (
        <SafeAreaView style={styles.container} >
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss()
                }}>
                <View style={styles.container}>
                    <Text style={styles.name}>name:{user.name}</Text>
                    <Text style={styles.text}>新規投稿</Text>
                    <TextInput
                        placeholder="Title?"
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        multiline={true}
                    />
                    <TextInput
                        placeholder="What's your Review?"
                        style={styles.input}
                        value={reviewText}
                        onChangeText={setReviewText}
                        multiline={true}
                    />
                    <TextInput
                        placeholder="詳細"
                        style={styles.input}
                        value={dsc}
                        onChangeText={setDsc}
                    />
                    <TextInput
                        placeholder="　url"
                        style={styles.input}
                        value={url}
                        onChangeText={setUrl}
                    />
                    <TextInput
                        placeholder="　git"
                        style={styles.input}
                        value={git}
                        onChangeText={setGit}
                    />
                    <ButtonIcon name="camera-retro" onPress={pickImage} color="gray" />
                    {image ? <Image source={{ uri: image }} style={styles.image} /> : null}
                    <Button onPress={() => handleCreate()} title="記事を投稿する" />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
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
        marginTop: 5,
        height: 50,
        borderColor: "#999",
        backgroundColor: 'white',
    },
    text: {
        fontSize: 30
    },
    name: {
        margin: 10
    }
});
