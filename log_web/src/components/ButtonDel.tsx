import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    GestureResponderEvent,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const SIZE = 20;

type Props = {
    iconName: string;
    onPress: (event: GestureResponderEvent) => void;
};

export const ButtonDel: React.FC<Props> = ({
    iconName,
    onPress,
}: Props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Feather name={iconName} color="#fff" size={10} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        backgroundColor: "gray",
        position: "absolute",
        right: 4,
        bottom: 2,
        alignItems: "center",
        justifyContent: "center",
    },
});
