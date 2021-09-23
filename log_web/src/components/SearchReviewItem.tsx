

import React, { useContext } from 'react';
import { View, StyleSheet, Text, Button, Linking } from "react-native";
import firebase, { getReviews } from "../lib/firebase";
import moment from "moment";
import { Stars } from "../components/Stars";
import { Review } from "../types/review";
import { ReviewsContext } from "../context/reviewsContext";
import Hyperlink from 'react-native-hyperlink'
import ButtonImage from '../components/ButtonImage'
import { ButtonDel } from "../components/ButtonDel";

type Props = {
    review: Review;
    ButtonImage: Review;
};

export const SearchReviewItem: React.FC<Props> = ({ review }: Props) => {
    // const timestamp = moment(review.timestamp.toDate()).format("YYYY/M/D");
    const db = firebase.firestore()
    const id = review.itemId
    const { reviews, setReviews } = useContext(ReviewsContext);
    const deleteId = async () => {
        alert(`${review.reviewText}:非表示！`)
        await
            db.collection("contents").doc(review.itemId).collection("reviews").doc(`${review.reviewId}`).set({
                batu: 1,
            }, { merge: true }//←上書きされないおまじない
            )
        const reviews = await getReviews(id);
        setReviews(reviews);
    };
    const openUrl = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(review.src)
        }
    }
    const openGit = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(review.git);
        } else {
            return
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <View>
                    <Stars star={review.star} starSize={16} textSize={12} />
                    <Text style={styles.reviewText} onPress={() => openGit(review.src)}>{review.reviewText}{review.batu}</Text>
                </View>
                {review.url.length !== 0 &&
                    <Hyperlink linkDefault={true}>
                        <Text style={styles.urlText}>
                            {`参考サイト：${review.url}`}
                        </Text>
                    </Hyperlink>}
                <Text style={styles.reviewText} >{review.dsc}</Text>
            </View>
            <View style={styles.rightContainer}  >
                <ButtonImage style={styles.image} source={{ uri: review.src }} onPress={() => openUrl(review.src)}></ButtonImage>
                <ButtonDel
                    iconName="x"
                    onPress={deleteId}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
    },
    leftContainer: {
        flexDirection: "column",
        // justifyContent: "flex-start",
    },
    rightContainer: {},
    image: {
        width: 100,
        height: 100,
        // justifyContent: "flex-end",
    },
    reviewText: {
        marginTop: 4,
        color: "#000",
        width: 210,
    },
    urlText: {
        marginTop: 4,
        color: "#888",
        fontSize: 12,
        width: 210,
    },
});