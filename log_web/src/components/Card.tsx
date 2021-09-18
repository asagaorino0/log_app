import * as React from 'react';
import { StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Text, Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { StackNavigationProp } from "@react-navigation/stack";
import { Detail } from '../types/detail'


export default function SimpleCard({ contents }: { contents: Detail }
) {
    return (
        <Card style={styles.container} >
            <Card.Content>
                <Title>{contents.title}</Title>
                <Text>{contents.id}</Text>
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

const { width } = Dimensions.get("window");
const CONTAINER_WIDTH = width / 2;
const PADDING = 16;
const IMAGE_WIDTH = CONTAINER_WIDTH - PADDING * 2;
const styles = StyleSheet.create({
    image: {
        width: IMAGE_WIDTH,
        height: IMAGE_WIDTH * 0.7,
    },
    container: {
        width: width / 2,
        backgroundColor: "#fff",
        // padding: 6,
        // backgroundColor: 'red',
    },
})

