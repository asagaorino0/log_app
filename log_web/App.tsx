import * as React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './src/screens/HomeScreen';
// import { StyleSheet, Text, View } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from "./src/navigations/AppNavigator";
// import { MainNavigator } from "./src/navigations/MainNavigator";
// import { HomeNavigator } from "./src/navigations/HomeNavigator";

export default function App() {
    return <AppNavigator />
    // return <MainNavigator />
    // return <HomeNavigator />;
}
// const Stack = createStackNavigator();
// export default function App() {
//     return (
//         <HomeScreen />
        //     );
        // }


        // const App: React.FC = () => {
        // return 
        // <AppNavigator />

//     )
// };



