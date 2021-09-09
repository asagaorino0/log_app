import * as React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    GestureResponderEvent,
    NativeSyntheticEvent, NativeTouchEvent
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
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
            <FontAwesome name={name} color={color} size={34} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
});