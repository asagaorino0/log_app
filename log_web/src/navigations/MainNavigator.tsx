import React, { useContext } from 'react';
import { Button, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen'
import DetailScreen from '../screens/DetailScreen';
import ReviewScreen from '../screens/ReviewScreen';
import { UserContext } from "../context/userContext";
import { ReviewsContext } from "../context/reviewsContext";
import SubScreen from '../screens/SubScreen'

const Stack = createStackNavigator();
const RootStack = createStackNavigator();
// const SubStack = () => (
//     <Stack.Navigator    >
//         <Stack.Screen
//             name="Sub"
//             component={SubScreen}
//             options={{ headerShown: false }}
//         />
//     </Stack.Navigator>
// );

export const MainNavigator = () => {
    const { user } = useContext(UserContext);
    const { reviews } = useContext(ReviewsContext);
    return (
        //         // <NavigationContainer>
        //             {!user ? <SubStack /> : 
        <RootStackNavigator />
        // }
        //         // </NavigationContainer>
    );
};

const RootStackNavigator = () => {
    return (
        //         <NavigationContainer>
        //             {!user ? <SubScreen /> :
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
                // options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name="Sub"
                    component={SubScreen}
                // options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name="Review"
                    component={ReviewScreen}
                />
            </RootStack.Group>
            <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                {/* <RootStack.Screen
                    name="Review"
                    component={ReviewScreen}
                /> */}
            </RootStack.Group>
        </RootStack.Navigator>
        // }
        //         </NavigationContainer>
    )
}
