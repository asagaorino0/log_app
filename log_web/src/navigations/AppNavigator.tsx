import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import UploadScreen from '../screens/UploadScreen';
import { FontAwesome } from '@expo/vector-icons';
import SubScreen from '../screens/SubScreen'
import SearchScreen from '../screens/SearchScreen'
import HomeScreen from '../screens/HomeScreen';
import { MainNavigator } from "./MainNavigator";
import { UserContext } from "../context/userContext";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
export const AppNavigator = () => {
    const { user } = useContext(UserContext);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Main"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer >
    );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            {/* ///ヘッダーみたいにホームのタブだけ消したい
            <Tab.Screen name="Home" component={HomeScreen}
                options={{ 
                    tabBarLabel: 'sign-in',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="sign-in" size={26} color={color} />
                    )
                }} /> */}
            <Tab.Screen name="main" component={MainNavigator}
                options={{
                    tabBarLabel: 'Main',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={24} color={color} />
                    )
                }} />
            <Tab.Screen name="Search" component={SearchScreen}
                options={{
                    tabBarLabel: 'Search',
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