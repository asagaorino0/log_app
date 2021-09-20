import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, Button, ActivityIndicator } from 'react-native';
import firebase from "../lib/firebase";
import { loginUser } from "../lib/firebase";
import { getReviews } from "../lib/firebase";
import firestore from "../lib/firebase";
import { storage } from "../lib/firebase";
import * as ImagePicker from 'expo-image-picker';
// import { Detail } from '../types/detail'
import ButtonIcon from '../components/ButtonIcon'
import ButtonText from '../components/Button'
import { Loading } from '../components/Loading'
import classname from 'classnames'
import { UserContext } from "../context/userContext";
import { ReviewsContext } from "../context/reviewsContext";
import { Review } from "../types/review";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/rootStackParamList";
import moment from "moment";
// import { Stars } from "../components/Stars";
import { StarSet } from "../components/StarSet";


export default function ReviewScreen({ navigation, route }) {
    const { setUser, user } = useContext(UserContext)
    const { setReviews, reviews } = useContext(ReviewsContext)
    const item = route.params;
    const title = route.params?.title;
    const id = route.params?.id;
    // const star = route.params?.star;
    const [reviewText, setReviewText] = useState('');
    const [storagePath, setStoragePath] = useState("");
    const [uri, setUri] = useState('');
    const [src, setSrc] = useState('');
    const [star, setStar] = useState<number>();
    const [git, setGit] = useState('');
    const [url, setUrl] = useState('');
    const [dsc, setDsc] = useState("");
    const [itemId, setItemId] = useState('');
    const db = firebase.firestore()
    const [loading, setLoading] = useState<boolean>(false);
    const daytime = moment().format("YYYYMMDDhhmmss");

    useEffect(() => {
        navigation.setOptions({
            title,
            headerLeft: () => (
                <Button onPress={() => navigation.goBack()} title="✕" />
            ),
        })
        const fetchUser = async () => {
            const user = await loginUser();
            setUser(user)
        };
        fetchUser();
    }, []);

    type Props = {
        navigation: StackNavigationProp<RootStackParamList, "Detail">;
        route: RouteProp<RootStackParamList, "Detail">;
        ButtonIcon: any
    };
    const getExtention = (path: string) => {
        return path.split(".").pop();
    };

    const handleCreate = async () => {
        setLoading(true);
        const downloadUrl = await uploadImage(uri, storagePath);
        setSrc(downloadUrl)
        const review = {
            userId: `${user.userId}`,
            itemId: id,
            name: `${user.name}`,
            src: `${downloadUrl}`,
            title,
            dsc,
            git,
            url,
            reviewText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            star,
        } as Review;
        await db
            .collection("contents")
            .doc(id)
            .collection("reviews")
            .add(review)
            .then((docref) => {
                db.collection('contents')
                    .doc(id)
                    .collection("reviews").doc(docref.id).set({
                        reviewId: docref.id,
                    }, { merge: true }//←上書きされないおまじない
                    )
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            })
        fetchReviews()
        setLoading(false);
        navigation.goBack();
    };

    const fetchReviews = async () => {
        const reviews = await getReviews(id);
        setReviews(reviews);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [4, 4],

            quality: 1,
        });
        if (!result.cancelled) {
            setUri(result.uri);
            const ext = getExtention(result.uri);
            const storagePath = `items/${id}/${daytime}.${ext}`;
            setStoragePath(storagePath)
        }
    };
    const uploadImage = async (uri: string, storagePath: string) => {
        const localUri = await fetch(uri);
        const blob = await localUri.blob();
        const ref = firebase.storage().ref().child(storagePath);
        let downloadUrl = "";
        try {
            await ref.put(blob);
            downloadUrl = await ref.getDownloadURL();
        } catch (err) {
            console.log(err);
        }
        return downloadUrl;
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
            }}>
            <View style={styles.container}>
                {/* <Text style={{ margin: 10 }}>name: {user.name}{`${storagePath}`}</Text> */}
                {/* <Stars star={star} starSize={16} textSize={12} /> */}
                <StarSet star={star} onChangeStar={(value) => setStar(value)} />
                <Text style={styles.text}>レビュー</Text>
                <TextInput
                    placeholder="What's your Review?"
                    style={styles.inputReview}
                    value={reviewText}
                    onChangeText={setReviewText}
                    multiline={true}
                />
                <TextInput
                    placeholder="詳細"
                    style={styles.inputReview}
                    value={dsc}
                    onChangeText={setDsc}
                    multiline={true}
                />
                <TextInput
                    placeholder="　github"
                    style={styles.inputUrl}
                    value={git}
                    onChangeText={setGit}
                />
                <TextInput
                    placeholder="　url"
                    style={styles.inputUrl}
                    value={url}
                    onChangeText={setUrl}
                />
                <ButtonIcon name="camera-retro" onPress={pickImage} color="gray" />
                {uri ? <Image source={{ uri: uri }} style={styles.image} /> : null}
                <ButtonText onPress={() => handleCreate()} text="レビューを投稿する" />
                <Loading visible={loading} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        resizeMode: "cover",
        // justifyContent: 'center',
    },
    container: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    heading: {
        fontSize: 24,
        color: 'rgba(14, 13, 13, .38)',
    },
    inputUrl: {
        height: 50,
        borderColor: "#999",
        backgroundColor: 'white',
        marginTop: 5,
    },
    inputReview: {
        marginTop: 5,
        height: 60,
        padding: 10,
        backgroundColor: 'white'
    },
    text: {
        fontSize: 30
    },
});