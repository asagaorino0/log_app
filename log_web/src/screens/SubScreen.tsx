import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Button, View, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, Keyboard } from 'react-native';
import firebase from "../lib/firebase";
import { loginUser } from "../lib/firebase";
import { UserContext } from "../context/userContext";
export default function SubScreen({ navigation }: { navigation: any }) {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const db = firebase.firestore()
    const { setUser } = useContext(UserContext);

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
    }
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
            }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Sub Screen</Text>
                <Button
                    title="Go to Upload"
                    onPress={() => navigation.navigate('Upload')}
                />
                <Text style={{ margin: 10 }}>uid: {userId}</Text>
                <View>
                    <Text>name:{name}</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                    <TouchableHighlight onPress={onPress}>
                        <View style={styles.button}>
                            <Text>Save User Info</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    titleText: {
        marginTop: 5,
        marginBottom: 30,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    button: {
        alignItems: "center",
        padding: 10
    },
    input: {
        height: 20,
        borderColor: 'gray',
        borderWidth: 1
    },
});
