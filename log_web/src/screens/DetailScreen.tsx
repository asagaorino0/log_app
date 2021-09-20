import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image, TouchableOpacity, Linking } from 'react-native';
import { Detail } from '../types/detail'
import { Review } from "../types/review";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/rootStackParamList";
import { AntDesign } from '@expo/vector-icons';
import { ReviewItem } from "../components/ReviewItem";
// import classname from 'classnames'
// import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from "../context/userContext";
import { ReviewsContext } from "../context/reviewsContext";
import { getReviews } from "../lib/firebase";
import ButtonImage from '../components/ButtonImage'
import Hyperlink from 'react-native-hyperlink'
import { ButtonPlus } from "../components/ButtonPlus";

export default function DetailScreen({ navigation, route }) {
    const { user } = useContext(UserContext)
    const { reviews, setReviews } = useContext(ReviewsContext);
    const { detail } = route.params;
    const title = route.params?.title;
    const src = route.params?.src;
    const name = route.params?.name;
    const star = route.params?.star;
    const url = route.params?.url;
    const git = route.params?.git;
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

    type Props = {
        navigation: StackNavigationProp<RootStackParamList, "Detail">;
        route: RouteProp<RootStackParamList, "Detail">;
        ButtonImege: any;
    };


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
                git: item.git,
            },
            merge: true,
        });
    }
    const onPress = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
    }
    return (
        <View style={styles.container}>
            <ButtonImage style={styles.image} src={src} onPress={() => onPress(url)}></ButtonImage>
            <View>
                {/* {git.length !== 0 && */}
                <Hyperlink linkDefault={true}>
                    <Text style={styles.nameText}>
                        {git}
                    </Text>
                </Hyperlink>
                {/* } */}
            </View>
            <View style={styles.container}>
                <FlatList
                    data={reviews}
                    renderItem={({ item }: { item: Review }) => (
                        <ReviewItem review={item} />
                    )}
                    keyExtractor={(item: Review) => item.reviewId}
                />
            </View>
            <ButtonPlus
                iconName="plus"
                onPress={() => handleDetail(route.params)}
            />
            {/* <TouchableOpacity
                onPress={() => handleDetail(route.params)}
            >
                <AntDesign name="pluscircle" size={40} color="tomato" />
            </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "90%",
        height: 250,
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
    nameText: {
        margin: 10
    },
});
