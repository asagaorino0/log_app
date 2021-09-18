

import React, { useContext } from 'react';
import { View, StyleSheet, Text, Image, Button, Linking } from "react-native";
import firebase, { getReviews } from "../lib/firebase";
import moment from "moment";
// import { Stars } from "../components/Stars";
import { Review } from "../types/review";
import { ReviewsContext } from "../context/reviewsContext";
import Hyperlink from 'react-native-hyperlink'

type Props = {
    review: Review;
};

export const ReviewItem: React.FC<Props> = ({ review }: Props) => {
    const timestamp = moment(review.timestamp.toDate()).format("YYYY/M/D");
    const db = firebase.firestore()
    const id = review.itemId
    const { reviews, setReviews } = useContext(ReviewsContext); const deleteId = async () => {
        alert(`${review.id}:削除！`)
        await
            db.collection("contents").doc(review.itemId).collection("reviews").doc(`${review.id}`).delete()
        const reviews = await getReviews(id);
        setReviews(reviews);
    };
    const openUrl = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(review.src);
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <View>
                    {/* <Stars score={review.score} starSize={16} textSize={12} /> */}
                    <Text style={styles.reviewText} onPress={() => openUrl(review.src)}>{review.reviewText}</Text>
                </View>

                <Text
                    style={styles.nameText}
                >{`${review.name}   ${timestamp}`}</Text>
                {review.url.length !== 0 &&
                    <Hyperlink linkDefault={true}>
                        <Text style={styles.urlText}>
                            {`参考サイト：${review.url}`}
                        </Text>
                    </Hyperlink>}
            </View>
            <View style={styles.rightContainer}  >
                <Image style={styles.image} source={{ uri: review.src }} />
            </View>
            <Button onPress={deleteId} title="✕" />
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
        justifyContent: "flex-end",
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
    nameText: {
        color: "#888",
        fontSize: 12,
    },
});