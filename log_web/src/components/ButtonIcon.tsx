import * as React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    GestureResponderEvent,
    NativeSyntheticEvent, NativeTouchEvent
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
    //     onPress: (event: GestureResponderEvent) => void;
    //     name?: string;
    //     color?: string;
    // };
    // interface ButtonProps {
    // title: string;
    onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
    color?: string;
    accessibilityLabel?: string;
    disabled?: boolean;
    name: string;
    testID?: string;
}

export default function ButtonIcon({
    onPress,
    name,
    color = "#000",
}: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {/* <FontAwesome name="star" size={24} /> */}
            <FontAwesome name={name} color={color} size={32} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
});