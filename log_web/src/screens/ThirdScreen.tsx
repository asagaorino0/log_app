import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableHighlight } from 'react-native';
import firebase from "../lib/firebase";
import "firebase/firestore";
import "firebase/auth";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MsgList from '../screens/MsgList'
import { Button, TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'
import FourthScreen from '../screens/FourthScreen'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const styles = StyleSheet.create({
    button: {
        flexBasis: '10%',
        color: "black",
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    display: {
        flexDirection: 'row',
        display: 'flex'
    },
});

function ThirdScreen({ navigation, route }) {

    const [uid, setUid] = React.useState('');
    const [name, setName] = React.useState('');
    const [user, setUser] = React.useState('');
    const [age, setAge] = React.useState('');
    const [message, setMessage] = React.useState('');
    const db = firebase.firestore()
    React.useEffect(() => {
        firebase.auth().signInAnonymously()
            .then(() => {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        var uid = user.uid;
                        setUid(uid)
                        firebase
                            .firestore()
                            .collection("users")
                            .where("id", "==", `${user.uid}`)
                            .get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    console.log(doc.id, " => ", doc.data())
                                    setUser(doc.data())
                                    setName(doc.data().name)
                                    setAge(doc.data().age)
                                    console.log(user)
                                })
                            })
                    }
                })
            })
    }, [])
    const handleCreate = async (e) => {
        console.log(`${message}`)
        await
            db.collection('messages').add({
                name: `${name}`,
                age: `${age}`,
                message: `${message}`,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                uid: `${uid}`,
            })
                .then((docref) => {
                    console.log("Document successfully written!:", docref.id);
                    setMessage("");
                    db.collection("messages").doc(docref.id).set({
                        id: docref.id,
                    }, { merge: true }//←上書きされないおまじない
                    )
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                })
    };

    return (
        <View style={styles.container}>
            <MsgList />
            <View >
                <View style={styles.display}>
                    {/* <div id="flexbox"> */}
                    <TextInput
                        // multiline
                        placeholder=""
                        value={message}
                        onChangeText={setMessage}
                        style={{ flexBasis: '90%' }}

                    />
                    <View style={styles.button} >
                        <FontAwesome name="send" size={26} onPress={handleCreate} />
                    </View>
                    {/* <Button onPress={handleCreate}>
                        <Text>send！</Text>
                    </Button> */}


                </View>
            </View>
        </View>
    );
}

export default function App() {
    const Tab = createMaterialBottomTabNavigator();
    const Stack = createStackNavigator();
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator initialRouteName="home" component={ThirdScreen}>
                <Tab.Screen
                    name="Third"
                    component={ThirdScreen}
                    options={{
                        tabBarLabel: 'Homeeeeee',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        )
                    }}
                />
                <Tab.Screen
                    name="Fourth"
                    component={FourthScreen}
                    options={{
                        tabBarLabel: 'User',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome name="user-circle-o" size={24} color={color} />
                        )
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer >
    );
}

