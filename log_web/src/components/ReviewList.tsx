import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, FlatList, SafeAreaView } from "react-native";
import firebase from "../lib/firebase";
import { ReviewItem } from "../components/ReviewItem";
import { ReviewsContext } from "../context/reviewsContext";
// import { reviewDocs } from "../lib/firebase";
// import { LinearGradient } from "expo-linear-gradient";
/* components */
// import { Stars } from "./Stars";
import { Detail } from "../types/detail";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
// import { RootStackParamList } from "../types/navigation";
import { Review } from "../types/review";

type Props = {
    detail: Detail;
};

export const ReviewList = ({ route }) => {
    const { detail } = route.params;
    const title = route.params?.title;
    const id = route.params?.id;
    const { reviews, setReviews } = useContext(ReviewsContext);
    useEffect(() => {
        const fetchReviews = async () => {
            const reviews = await getReviews(detail.id);
            setReviews(reviews);
        };
        fetchReviews();
    }, []);
    const getReviews = async (id: string) => {
        const reviewDocs = await firebase
            .firestore()
            .collection("contents")
            .doc(id)
            .collection("reviews")
            .orderBy("createdAt", "desc")
            .get();
        return reviewDocs.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as Review)
        );
    }
    return (
        <View style={styles.container}>
            <FlatList
                // ListHeaderComponent={<ShopDetail shop={shop} />}
                data={reviews}
                renderItem={({ item }: { item: Review }) => (
                    <View style={styles.container}>
                        <View style={styles.leftContainer}>
                            <View>
                                {/* <Stars score={review.score} starSize={16} textSize={12} /> */}
                                <Text style={styles.reviewText}>{item.reviewText}</Text>
                            </View>
                            <Text
                                style={styles.nameText}
                            >{`${item.name}   ${item.createdAt}`}</Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Image style={styles.image} source={{ uri: item.src }} />
                        </View>
                    </View>
                )}
                keyExtractor={(item: Review) => item.id}
            />
            {/* <ReviewItem review={item} /> */}
            <Text style={{ margin: 10 }}>name: WWW
            </Text>
        </View>
    );
};

//     return (
//         <View style={styles.container}>
//             <View style={styles.image}>
//                 {/* <Image style={styles.image} source={{ uri: src }}></Image> */}
//                 <View style={styles.nameContainer}>
//                     <Text style={styles.title}>www</Text>
//                     <Text style={styles.title}>{detail.title}</Text>
//                     {/* <Text style={styles.text}>{name}</Text> */}
//                 </View>
//             </View>
//             {/* <View style={styles.stars}>
//                 <Stars star={star} starSize={28} textSize={20} />
//             </View> */}
//         </View>
//     );
// };

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    // },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "flex-start",
    },
    // imageContainer: {
    //     width: "100%",
    //     height: 250,
    //     resizeMode: "cover",
    // },
    // nameContainer: {
    //     position: "absolute",
    //     left: 16,
    //     bottom: 16,
    //     flexDirection: "row",
    //     justifyContent: "flex-start",
    //     alignItems: "flex-end",
    // },
    // stars: {
    //     margin: 16,
    // },
    // image: {
    //     width: "100%",
    //     height: 250,
    //     resizeMode: "cover",
    // },
    // title: {
    //     fontSize: 20,
    //     color: "#fff",
    //     fontWeight: "bold",
    // },
    // text: {
    //     fontSize: 16,
    //     color: "#fff",
    //     fontWeight: "bold",
    //     marginLeft: 16,
    // },
    // gradient: {
    //     position: "absolute",
    //     left: 0,
    //     right: 0,
    //     top: 0,
    //     height: 250,
    // },
    leftContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    rightContainer: {},
    image: {
        width: 100,
        height: 100,
    },
    reviewText: {
        marginTop: 4,
        color: "#000",
    },
    nameText: {
        color: "#888",
        fontSize: 12,
    },
});