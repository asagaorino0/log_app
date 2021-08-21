import * as React from 'react';
// import * as functions from "../../../proaca-function/functions/node_modules/firebase-functions";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SubScreen from '../screens/SubScreen'
// import ThirdScreen from '../screens/ThirdScreen';
import firebase from "../lib/firebase";
// import { getFunctions } from '../lib/firebase'

function HomeScreen({ navigation }: { navigation: any }) {


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Sub!"
                onPress={() => navigation.navigate('Sub')}
            />
        </View>
    )
}
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Sub" component={SubScreen} />
                {/* <Stack.Screen name="Third" component={ThirdScreen} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}


