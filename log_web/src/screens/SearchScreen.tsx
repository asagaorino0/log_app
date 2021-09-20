import React, { useState } from "react";
import { StyleSheet, SafeAreaView, TextInput, FlatList } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/rootStackParamList";
// import { searchReview } from "../lib/algolia";
import { Review } from "../types/review";
import { SearchReviewItem } from "../components/SearchReviewItem";
import algoliasearch, { SearchClient } from "algoliasearch";
import Constants from "expo-constants";

const client: SearchClient = algoliasearch(
    Constants.manifest.algolia.appId,
    Constants.manifest.algolia.searchApiKey
);
const searchReview = async (query: string) => {
    const index = client.initIndex("log_app");
    return await index.search(query);
};
type Props = {
    navigation: StackNavigationProp<RootStackParamList, "Search">;
    route: RouteProp<RootStackParamList, "Search">;

};
// export const SearchScreen: React.FC<Props> = ({ navigation, route }: Props) => {
export default function SearchScreen({ navigation, route }) {
    const [keyword, setKeyword] = useState<string>();
    const [reviews, setReviews] = useState<Review[]>([]);
    const onChangeText = async (text: string) => {
        setKeyword(text);
        if (!text) {
            setReviews([]);
        } else {
            const result = await searchReview(text);
            if (result.hits.length > 0) {
                const reviews = result.hits.map((hit) => {
                    return (hit as unknown) as Review;
                });
                setReviews(reviews);
            } else {
                setReviews([]);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="検索キーワード"
                onChangeText={onChangeText}
                value={keyword}
            />
            <FlatList
                data={reviews}
                renderItem={({ item }) => <SearchReviewItem review={item} />}
                keyExtractor={(item) => item.reviewId}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "flex-start",
    },
    input: {
        height: 50,
        borderColor: "#999",
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 15,
        margin: 16,
    },
});