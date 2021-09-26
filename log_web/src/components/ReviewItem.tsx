import React, { useContext } from 'react';
import { View, StyleSheet, Text, Linking } from "react-native";
import firebase, { getReviews } from "../lib/firebase";
import moment from "moment";
import { Stars } from "../components/Stars";
import { Review } from "../types/review";
import { ReviewsContext } from "../context/reviewsContext";
import Hyperlink from 'react-native-hyperlink'
import { ButtonImage } from '../components/ButtonImage'
import { ButtonDel } from "../components/ButtonDel";

type Props = {
    review: Review;
};

export const ReviewItem: React.FC<Props> = ({ review }: Props) => {
    const timestamp = moment(review.timestamp.toDate()).format("YYYY/M/D");
    const db = firebase.firestore()
    const id = review.itemId
    const { reviews, setReviews } = useContext(ReviewsContext);
    const deleteId = async () => {
        alert(`${review.reviewText}:削除しました！`)
        await
            db.collection("contents").doc(review.itemId).collection("reviews").doc(`${review.reviewId}`).delete()
        const reviews = await getReviews(id);
        setReviews(reviews);
    };
    const openUrl = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(review.src);
        }
    }
    const openGit = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(review.git);
        }
    }
    const ja = review.translated.ja
    const openTranslated = async (ja) => {
        alert(ja)
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <View>
                    <Stars star={review.star} starSize={16} textSize={12} />
                    <Text style={styles.reviewText}>{review.reviewText}</Text>
                </View>
                <Text style={styles.text}>{timestamp}</Text>
                {review.translated.ja.length !== 0 &&
                    <Text onPress={() => openTranslated(review.translated.ja)} style={styles.text}>日本語に翻訳</Text>
                }
                {review.git.length !== 0 &&
                    <Text style={styles.text} onPress={() => openGit(review.git)}>Git hubを表示</Text>
                }
                {review.url.length !== 0 &&
                    <Hyperlink linkDefault={true}>
                        <Text style={styles.text}>
                            {`参考サイト：${review.url}`}
                        </Text>
                    </Hyperlink>}
            </View>
            <View style={styles.rightContainer}  >
                <ButtonImage
                    style={styles.image}
                    source={{ url: review.src }}
                    onPress={() => openUrl(review.src)}>
                </ButtonImage>
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
    },
    rightContainer: {},
    image: {
        width: 100,
        height: 100,
    },
    reviewText: {
        marginTop: 4,
        color: "#000",
        width: 210,
    },
    text: {
        marginTop: 4,
        color: "#888",
        fontSize: 12,
        width: 210,
    },
});