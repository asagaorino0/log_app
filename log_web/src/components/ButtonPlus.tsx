import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    GestureResponderEvent,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const SIZE = 50;

type Props = {
    iconName: string;
    onPress: (event: GestureResponderEvent) => void;
};

export const ButtonPlus: React.FC<Props> = ({
    iconName,
    onPress,
}: Props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Feather name={iconName} color="#fff" size={30} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        backgroundColor: "tomato",
        position: "absolute",
        right: 16,
        bottom: 38,
        alignItems: "center",
        justifyContent: "center",
    },
});
