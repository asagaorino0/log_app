import * as React from 'react';
import { StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Text, Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { StackNavigationProp } from "@react-navigation/stack";

const { width } = Dimensions.get("window");
const CONTAINER_WIDTH = width / 2 * 0.9;
const PADDING = 16;
const IMAGE_WIDTH = CONTAINER_WIDTH - PADDING * 2;
const styles = StyleSheet.create({
    image: {
        width: IMAGE_WIDTH * 0.9,
        height: IMAGE_WIDTH * 0.7,
    },
    container: {
        width: width / 2 * 0.9,
        padding: 5,
        backgroundColor: 'red',
    },
})

// type RootStackParamList = {
//     Home: undefined;
//     AScreen: { userId: string };
//     Feed: { sort: 'latest' | 'top' } | undefined;
// };

// type Props = StackNavigationProp<RootStackParamList, 'AScreen'>;

type card = {
    contents: [],
    navigation: any,
    key: any
    src: string
    title: string
    name: string
    star: number
    id: string

}

export default function SimpleCard({ contents }: { contents: card }
) {
    return (
        <Card style={styles.container} >
            <Card.Content>
                <Title>{contents.title}</Title>
                <Image
                    source={{ uri: `${contents.src}` }}
                    style={styles.image}
                />
                <FontAwesome name="star" size={24} />
                <FontAwesome name="star-o" size={24} />
                <Paragraph>{contents.name}</Paragraph>
            </Card.Content>
        </Card >
    )
}
