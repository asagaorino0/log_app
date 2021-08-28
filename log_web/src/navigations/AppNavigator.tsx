import * as React from 'react';
// import * as functions from "../../../proaca-function/functions/node_modules/firebase-functions";
// import { Button, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MainScreen from '../screens/MainScreen'
import UploadScreen from '../screens/UploadScreen';
// import ThirdScreen from '../screens/ThirdScreen';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SubScreen from '../screens/SubScreen'
import HomeScreen from '../screens/HomeScreen';
// import Card from '../components/Card';
// import MsgList from '../components/MsgList';
// import A from '../screens/A';
import { MainNavigator } from "./MainNavigator";
import { MsgListNavigator } from "./MsgListNavigator";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
export const AppNavigator = () => {
    return (

        <NavigationContainer>
            <Tab.Navigator>
                {/* <Tab.Screen name="Home" component={MainNavigator}
                    options={{
                        tabBarLabel: 'Homeeeeee',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" size={26} color={color} />
                        )
                    }} /> */}
                <Tab.Screen name="Home" component={HomeScreen}
                    options={{
                        tabBarLabel: 'Homeeeeee',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" size={26} color={color} />
                        )
                    }} />
                {/* <Tab.Screen name="Main" component={MainScreen}
                    options={{
                        tabBarLabel: 'Main',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome name="search" size={24} color={color} />
                        )
                    }} /> */}
                <Tab.Screen name="Main" component={MsgListNavigator}
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
                {/* </Stack.Navigator> */}
            </Tab.Navigator>
        </NavigationContainer>

    );
};


// export default function HomeScreen({ navigation }: { navigation: any }) {
//     const Tab = createMaterialBottomTabNavigator();
// return (
//     <NavigationContainer independent={true}>
//         <Tab.Navigator>
//             <Tab.Screen name="Home" component={HomeScreen}
//                 options={{
//                     tabBarLabel: 'Homeeeeee',
//                     tabBarIcon: ({ color }) => (
//                         <MaterialCommunityIcons name="home" size={26} color={color} />
//                     )
//                 }} />
{/* <Tab.Screen name="Main" component={MainScreen}
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
                    }} /> */}
//             </Tab.Navigator>
//         </NavigationContainer>
//     );
// }
