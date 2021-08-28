import * as React from 'react';
// import * as functions from "../../../proaca-function/functions/node_modules/firebase-functions";
import { Button, Text, View } from "react-native";
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
import Card from '../components/Card';
import MsgList from '../components/MsgList';
import AScreen from '../screens/AScreen';
import DScreen from '../screens/DScreen';
import { MsgListNavigator } from "./MsgListNavigator";

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStack = () => (
    <Stack.Navigator    >
        <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="MsgList" component={MsgListNavigator} /> */}
    </Stack.Navigator>
);

export const MainNavigator = () => (
    <RootStack.Navigator>
        <RootStack.Group>
            <RootStack.Screen
                name="Main"
                component={MainStack}
                options={{ headerShown: false }}
            />
            {/* <RootStack.Screen name="Main" component={MainScreen} /> */}
            <RootStack.Screen name="DScreen" component={DScreen} />
            {/* <RootStack.Screen name="Card" component={Card} /> */}
            {/* <RootStack.Screen name="MsgList" component={MsgListNavigator} /> */}
        </RootStack.Group>
        <RootStack.Group screenOptions={{ presentation: 'modal' }}>
            <RootStack.Screen name="AScreen" component={AScreen} />
        </RootStack.Group>
    </RootStack.Navigator>
);


