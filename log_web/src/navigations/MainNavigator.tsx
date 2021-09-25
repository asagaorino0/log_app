import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen'
import DetailScreen from '../screens/DetailScreen';
import ReviewScreen from '../screens/ReviewScreen';
import { UserContext } from "../context/userContext";
import { ReviewsContext } from "../context/reviewsContext";
import SubScreen from '../screens/SubScreen'

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

export const MainNavigator = () => {
    const { user } = useContext(UserContext);
    const { reviews } = useContext(ReviewsContext);
    return (
        <RootStackNavigator />
    );
};

const RootStackNavigator = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Group>
                <RootStack.Screen
                    name="戻る"
                    component={MainScreen}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name="Detail"
                    component={DetailScreen}
                />
                <RootStack.Screen
                    name="Sub"
                    component={SubScreen}
                />
                <RootStack.Screen
                    name="Review"
                    component={ReviewScreen}
                />
            </RootStack.Group>
            <RootStack.Group screenOptions={{ presentation: 'modal' }}>
            </RootStack.Group>
        </RootStack.Navigator>
    )
}
