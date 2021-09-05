import * as React from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, Linking } from 'react-native';
// import firebase from "../lib/firebase";
// import firestore from "../lib/firebase";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Detail } from '../types/detail'
import classname from 'classnames'
import { AntDesign } from '@expo/vector-icons';
import Hyperlink from 'react-native-hyperlink'
// import { makeStyles } from '@material-ui/core/styles';


export default function DetailScreen({ navigation, route }) {
    const title = route.params?.title;
    const src = route.params?.src;
    const name = route.params?.name;
    const star = route.params?.star;
    const url = route.params?.url;

    React.useEffect(() => {
        navigation.setOptions({
            title,
        });
    }, [navigation]);

    type RootStackParamList = {
        Main: undefined;
        Detail: { item: Detail };
    };
    type Props = {
        navigation: StackNavigationProp<RootStackParamList, "Detail">;
        route: RouteProp<RootStackParamList, "Detail">;
    };
    // const className = require('classnames')

    const handleDetail = (item: Detail) => {
        // setItem(item)
        // alert(item)
        navigation.navigate({
            name: 'Review',
            params: {
                title: item.title,
                name: item.name,
                star: item.star,
                src: item.src,
                url: item.url,
            },
            merge: true,
        });
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: src }}></Image>
            <Text style={{ margin: 10 }}>name: {name}</Text>
            <Hyperlink linkDefault={true}>
                <Text style={{ fontSize: 15 }}>

                    {url}
                </Text>
            </Hyperlink>
            {/* <Hyperlink >{url}</Hyperlink> */}
            <Text style={{ fontSize: 30 }}>This is a {title}!</Text>
            {/* <Button onPress={() => navigation.goBack()} title="Mainへ" /> */}
            <TouchableOpacity
                onPress={() => handleDetail(route.params)}
            >
                <AntDesign name="pluscircle" size={30} color="tomato" />
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
    // container: {
    //     flex: 1,
    //     backgroundColor: "#fff",
    //     justifyContent: "flex-start",
    //     width: "100%",
    // },
    heading: {
        fontSize: 24,
        color: 'rgba(14, 13, 13, .38)',
    },
    paragraph: {
        fontSize: 18,
        color: '#737373',
    },
});
