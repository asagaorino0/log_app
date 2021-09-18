import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image, TouchableOpacity, Linking } from 'react-native';
import { Detail } from '../types/detail'
import { Review } from "../types/review";
import { AntDesign } from '@expo/vector-icons';
import { ReviewItem } from "../components/ReviewItem";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RouteProp } from "@react-navigation/native";
// import classname from 'classnames'
// import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from "../context/userContext";
import { ReviewsContext } from "../context/reviewsContext";
import { getReviews } from "../lib/firebase";
export default function DetailScreen({ navigation, route }) {
    const { user } = useContext(UserContext)
    const { reviews, setReviews } = useContext(ReviewsContext);
    const { detail } = route.params;
    const title = route.params?.title;
    const src = route.params?.src;
    const name = route.params?.name;
    const star = route.params?.star;
    const url = route.params?.url;
    const id = route.params?.id;

    useEffect(() => {
        navigation.setOptions({
            title,
        });
        const fetchReviews = async () => {
            const reviews = await getReviews(id);
            setReviews(reviews);
        };
        fetchReviews();
    }, []);

    type RootStackParamList = {
        Main: undefined;
        Review: { reviews: Review };
    };
    // type Props = {
    //     navigation: StackNavigationProp<RootStackParamList, "Detail">;
    //     route: RouteProp<RootStackParamList, "Detail">;
    // };


    const handleDetail = (item: Detail) => {
        navigation.navigate({
            name: 'Review',
            params: {
                title: item.title,
                name: user.name,
                star: item.star,
                src: item.src,
                url: item.url,
                id: item.id,
            },
            merge: true,
        });
    }
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: src }}></Image>
            <Text style={{ margin: 10 }}>name: {name}</Text>
            <View style={styles.container}>
                <FlatList
                    // ListHeaderComponent={<Detail detail={setail} />}
                    data={reviews}
                    renderItem={({ item }: { item: Review }) => (
                        <ReviewItem review={item} />
                    )}
                    keyExtractor={(item: Review) => item.id}
                />
                <Text style={{ margin: 10 }}>name: WW {id}</Text>
            </View>
            <TouchableOpacity
                onPress={() => handleDetail(route.params)}
            >
                <AntDesign name="pluscircle" size={40} color="red" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "90%",
        height: 250,
        // resizeMode: "cover",
        // justifyContent: 'center',
    },
    button: {
        flexBasis: '100%',
        color: "black",
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
});
