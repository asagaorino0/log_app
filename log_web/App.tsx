import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();
export default function App() {
    return (
        <HomeScreen />
    );
}


