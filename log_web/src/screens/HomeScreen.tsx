import * as React from 'react';
// import * as functions from "../../../proaca-function/functions/node_modules/firebase-functions";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MainScreen from '../screens/MainScreen'
import UploadScreen from '../screens/UploadScreen';
// import ThirdScreen from '../screens/ThirdScreen';
import firebase from "../lib/firebase";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SubScreen from '../screens/SubScreen'
// import { getFunctions } from '../lib/firebase'

function HomeScreen({ navigation }: { navigation: any }) {


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Profile"
                onPress={() => navigation.navigate('Profile')}
            />
            <Button
                title="log in"
                onPress={() => navigation.navigate('Main')}
            />
        </View>
    )
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>

            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen}
                    options={{
                        tabBarLabel: 'Homeeeeee',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" size={26} color={color} />
                        )
                    }} />
                <Tab.Screen name="Main" component={MainScreen}
                    options={{
                        tabBarLabel: 'Main',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome name="search" size={24} color={color} />
                        )
                    }} />
                <Tab.Screen name="Upload" component={UploadScreen}
                    options={{
                        tabBarLabel: 'Upload',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome name="plus" size={24} color={color} />
                        )
                    }} />
                <Tab.Screen name="Profile" component={SubScreen}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome name="user-circle-o" size={24} color={color} />
                        )
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
