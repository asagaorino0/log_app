import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import firebase from "../lib/firebase";
import "firebase/firestore";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Detail } from '../types/detail'

// interface card {
//     // contents: [],
//     navigation: any,
//     key: any
//     src: string
//     title: string
//     name: string
//     star: number
//     id: string
// }


export default function DetailScreen({ navigation, route }: { navigation, route: Props }) {

    return (
        <View style={styles.container}>
            {/* `navigation.state.params`からリストで渡した`item`の中身が取れる */}
            <Text style={[styles.heading, { marginBottom: 24 }]}>{navigation.navigate.name}</Text>
            {/* <Text style={styles.paragraph}>{navigation.navigate.url}</Text> */}
            <Text style={{ fontSize: 30 }}>This is a D!</Text>
            <Button onPress={() => navigation.goBack()} title="Mainへ" />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        flexBasis: '10%',
        color: "black",
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        color: 'rgba(14, 13, 13, .38)',
    },
    paragraph: {
        fontSize: 18,
        color: '#737373',
    },
});
