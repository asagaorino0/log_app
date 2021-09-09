import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import UploadScreen from '../screens/UploadScreen';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SubScreen from '../screens/SubScreen'
import HomeScreen from '../screens/HomeScreen';
import { MainNavigator } from "./MainNavigator";
import { UserContext } from "../context/userContext";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
export const AppNavigator = () => {
    const { user } = useContext(UserContext);
    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer >
    );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarLabel: 'Homeeeeee',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" size={26} color={color} />
                    )
                }} />
            <Tab.Screen name="Main" component={MainNavigator}
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
    );
}