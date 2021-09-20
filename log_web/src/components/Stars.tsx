import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
    star: number;
    starSize?: number;
    textSize?: number;
};

export const Stars: React.FC<Props> = ({
    star,
    starSize = 16,
    textSize = 14,
}: Props) => {
    const starStyle = [styles.star, { fontSize: starSize }];
    return (
        <View style={styles.container}>
            <FontAwesome
                style={starStyle}
                name={star >= 1 ? "star" : star >= 0.5 ? "star-half-o" : "star-o"}
            />
            <FontAwesome
                style={starStyle}
                name={star >= 2 ? "star" : star >= 1.5 ? "star-half-o" : "star-o"}
            />
            <FontAwesome
                style={starStyle}
                name={star >= 3 ? "star" : star >= 2.5 ? "star-half-o" : "star-o"}
            />
            <FontAwesome
                style={starStyle}
                name={star >= 4 ? "star" : star >= 3.5 ? "star-half-o" : "star-o"}
            />
            <FontAwesome
                style={starStyle}
                name={star >= 5 ? "star" : star >= 4.5 ? "star-half-o" : "star-o"}
            />
            <Text style={[styles.starText, { fontSize: textSize }]}>{star}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    star: {
        marginRight: 4,
        color: "tomato",
    },
    starText: {
        color: "#000",
        fontWeight: "bold",
    },
});