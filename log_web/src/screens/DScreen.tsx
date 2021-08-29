import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import firebase from "../lib/firebase";
import "firebase/firestore";

export default function DScreen({ navigation, route }: { navigation: any, route: any }) {

    return (
        <View style={styles.container}>
            {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
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
    display: {
        flexDirection: 'row',
        display: 'flex'
    },
});
