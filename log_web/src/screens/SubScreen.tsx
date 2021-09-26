import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import firebase from "../lib/firebase";
import { loginUser } from "../lib/firebase";
import { UserContext } from "../context/userContext";
import ButtonText from '../components/Button'
export default function SubScreen({ navigation }: { navigation: any }) {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const db = firebase.firestore()
    const { setUser, user } = useContext(UserContext);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await loginUser();
            setUser(user);
            setUserId(user.userId)
            setName(user.name)
        };
        fetchUser();
    }, []);

    const onPress = () => {
        db.collection('users').doc(`${userId}`).set({
            name: `${name}`,
            userId: `${userId}`,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }, { merge: true }//←上書きされないおまじない
        )
        navigation.goBack();
    }
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
            }}>
            <View style={styles.container}>
                <Button
                    title="Go to Home"
                    onPress={() => navigation.navigate('home')}
                />
                <Text style={styles.uid}>uid: {userId}</Text>
                <View>
                    <Text>name:</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                    <ButtonText onPress={onPress} text="名前を変更する" />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "90%",
        // justifyContent: 'center',
        resizeMode: "cover",
    },
    button: {
        flexBasis: '100%',
        color: 'white',
        backgroundColor: "black",
        justifyContent: 'center',
    },
    input: {
        height: 35,
        borderColor: "#999",
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 15,
        margin: 8,
    },
    uid: {
        margin: 10
    }
});
