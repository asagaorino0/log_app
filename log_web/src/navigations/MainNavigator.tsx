import * as React from 'react';
// import * as functions from "../../../proaca-function/functions/node_modules/firebase-functions";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MainScreen from '../screens/MainScreen'
import AScreen from '../screens/AScreen';
import DScreen from '../screens/DScreen';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

// const MainStack = () => (
//     <Stack.Navigator    >
//         <Stack.Screen
//             name="Main"
//             component={MainScreen}
//             options={{ headerShown: false }}
//         />
//     </Stack.Navigator>
// );

export const MainNavigator = () => (
    <RootStack.Navigator>
        <RootStack.Group>
            <RootStack.Screen
                name="Main"
                component={MainScreen}
                options={{ headerShown: false }}
            />
            <RootStack.Screen name="DScreen" component={DScreen} />
        </RootStack.Group>
        <RootStack.Group screenOptions={{ presentation: 'modal' }}>
            <RootStack.Screen name="AScreen" component={AScreen} />
        </RootStack.Group>
    </RootStack.Navigator>
);
// export const MainNavigator = () => (
//     <Stack.Navigator>
//         <Stack.Group>
//             <Stack.Screen
//                 name="Main"
//                 component={MainScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen name="DScreen" component={DScreen} />
//         </Stack.Group>
//         <Stack.Group screenOptions={{ presentation: 'modal' }}>
//             <Stack.Screen name="AScreen" component={AScreen} />
//         </Stack.Group>
//     </Stack.Navigator>
// );

