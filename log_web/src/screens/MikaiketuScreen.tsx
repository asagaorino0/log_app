import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet, Image, Button, TouchableOpacity, Dimensions, Alert } from 'react-native';
import firebase, { copyReview } from "../lib/firebase";
import ButtonText from '../components/Button'
import { Detail } from '../types/detail'
import { Review } from "../types/review";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/rootStackParamList";
// import ReviewScreen from './ReviewScreen';
import { ReviewsContext } from "../context/reviewsContext";
import { getReviews } from "../lib/firebase";
// import { makeStyles } from '@material-ui/core/styles';

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "Mikaiketu">;
    route: RouteProp<RootStackParamList, "Mikaiketu">;
    review: Review
};
export default function MikaiketuScreen({ navigation, route }: { navigation: any, route: any }) {
    const ref = React.useRef(null);
    const [contents, setContents] = useState([]);
    const { reviews, setReviews } = useContext(ReviewsContext);
    const db = firebase.firestore()
    const { review } = route.params;
    const title = route.params?.title;
    const [loading, setLoading] = useState<boolean>(false);
    const [itemTitle, setItemTitle] = useState('');
    const [itemId, setItemId] = useState('');
    // const [name, setName] = useState('');
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const user = await loginUser();
    //         setUser(user);
    //         setUserId(user.userId)
    //         setName(user.name)
    //     };
    //     fetchUser();
    // }, []);

    useEffect(() => {
        navigation.setOptions({
            title,
        });
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
            })
        const fetchReviews = async () => {
            const reviews = await getReviews(itemId);
            setReviews(reviews);
        };
        fetchReviews();
    }, [])
    const handleCreate = async (item: Review) => {
        const review = {
            userId: item.userId,
            // itemId,
            // name,
            // src,
            // title,
            // dsc,
            // git,
            // url,
            reviewText: item.reviewText,
            // timestamp: firebase.firestore.FieldValue.serverTimestamp(),            star,
            // batu,
            // translated: {
            //     en: item.en,
            //     ja: item.ja,
            // },
        } as Review;
        await copyReview(review, itemId);
        fetchReviews()
        setLoading(false);
        navigation.goBack();
    };
    const fetchReviews = async () => {
        const reviews = await getReviews(itemId);
        setReviews(reviews);
    };
    return (
        <SafeAreaView style={styles.container} >
            <FlatList
                data={reviews}
                renderItem={({ item }: { item: Review }) => (
                    <Text>【{item.reviewText}】を</Text>
                )}
                keyExtractor={(item: Review) => item.reviewId}
            />
            <Text>{ }</Text>
            <FlatList
                data={contents}
                renderItem={({ item }: { item: Detail }) => {
                    const handleDetail = (item: Detail) => {
                        setItemId(item.id)
                        setItemTitle(item.title)
                        alert(itemId)
                    }
                    return (

                        <TouchableOpacity
                            onPress={() => handleDetail(item)}
                        >
                            <Text>{item.title}</Text>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
            />
            <ButtonText onPress={() => handleCreate(review)} text={`${itemTitle}に移動する`} />
        </SafeAreaView >
    );
}

const { width } = Dimensions.get("window");
const CONTAINER_WIDTH = width / 2;

// const useStyles = makeStyles({

const styles = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    display: {
        flexDirection: 'row',
        display: 'flex'
    },
});
