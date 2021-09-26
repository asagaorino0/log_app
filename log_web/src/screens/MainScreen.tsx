import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet, Image, Button, TouchableOpacity, Dimensions, Alert } from 'react-native';
import firebase from "../lib/firebase";
import { loginUser } from "../lib/firebase";
import { UserContext } from "../context/userContext";
import Card from '../components/Card'
import { Detail } from '../types/detail'
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/rootStackParamList";

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "Main">;
};
export default function MainScreen({ navigation, route }: { navigation: any, route: any }) {
    const ref = React.useRef(null);
    const [contents, setContents] = useState([]);
    const db = firebase.firestore()
    const { setUser } = useContext(UserContext);
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    useEffect(() => {
        const fetchUser = async () => {
            const user = await loginUser();
            setUser(user);
            setUserId(user.userId)
            setName(user.name)
        };
        fetchUser();
    }, []);

    useEffect(() => {
        firebase
            .firestore()
            .collection("contents")
            .orderBy("title")
            .onSnapshot((snapshot) => {
                const contents = snapshot.docs.map((doc, id) => {
                    return doc.id &&
                        doc.data()
                });
                setContents(contents);
            })
    }, [])
    return (
        <SafeAreaView style={styles.container} >
            <FlatList
                data={contents}
                renderItem={({ item }: { item: Detail }) => {
                    const handleDetail = (item: Detail) => {
                        navigation.navigate({
                            name: 'Detail',
                            params: {
                                title: item.title,
                                name: item.name,
                                star: item.star,
                                src: item.src,
                                url: item.url,
                                id: item.id,
                                git: item.git
                            },
                            merge: true,
                        });
                    }
                    return (
                        <TouchableOpacity
                            onPress={() => handleDetail(item)}
                        >
                            <Card
                                contents={item}
                                key={item.id}
                            />
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
            />
            <Text>name:{name}</Text>

        </SafeAreaView >
    );
}

const { width } = Dimensions.get("window");
const CONTAINER_WIDTH = width / 2;

// const useStyles = makeStyles({

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    display: {
        flexDirection: 'row',
        display: 'flex'
    },
});
