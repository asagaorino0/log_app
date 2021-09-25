import * as React from 'react';
import { Button, Text, View, StyleSheet } from "react-native";
export default function HomeScreen({ navigation }: { navigation: any }) {
    return (
        <View style={styles.container}>
            <Text>備　忘　録</Text>
            <Button
                title="log in"
                onPress={() => navigation.navigate('Main')}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});