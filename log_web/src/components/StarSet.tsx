import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
    star: number;
    starSize?: number;
    onChangeStar: (value: number) => void;
};

export const StarSet: React.FC<Props> = ({
    star,
    starSize,
    onChangeStar,
}: Props) => {
    const starStyle = [styles.star, starSize && { fontSize: starSize }];

    const stars = [1, 2, 3, 4, 5].map((count) => (
        <TouchableOpacity
            onPress={() => onChangeStar(count)}
            key={count.toString()}
        >
            <FontAwesome
                style={starStyle}
                name={star >= count ? "star" : "star-o"}
            />
        </TouchableOpacity>
    ));

    return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    star: {
        marginRight: 8,
        fontSize: 24,
        color: "red",
    },
    starText: {
        fontSize: 14,
        color: "#000",
        fontWeight: "bold",
    },
});
