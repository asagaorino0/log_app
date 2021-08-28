import * as React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Text, Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import Hyperlink from 'react-native-hyperlink'
import A from '../screens/A';
import { StackNavigationProp } from "@react-navigation/stack";

const { width } = Dimensions.get("window");
const CONTAINER_WIDTH = width / 2;
const PADDING = 16;
const IMAGE_WIDTH = CONTAINER_WIDTH - PADDING * 2;
const styles = StyleSheet.create({
    image: {
        width: IMAGE_WIDTH * 0.9,
        height: IMAGE_WIDTH * 0.7,
    },
    container: {
        width: width / 2 * 0.9,
        padding: 6,
    },
})

{/* <Button
title="Go to Profile"
onPress={() => navigation.navigate('Profile')}
/> */}
type RootStackParamList = {
    Home: undefined;
    Profile: { userId: string };
    Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = StackNavigationProp<RootStackParamList, 'Home'>;

export default function SimpleCard({ contents }: { contents: any }, { navigation, navigate }: { navigation, navigate: Props }) {
    const onPressSrc = () => {
        () => navigation.navigate('Home')
    };
    return (

        <Card style={styles.container} >
            <Card.Content>
                <Title>{contents.title}</Title>
                <Image
                    source={{ uri: `${contents.src}` }}
                    style={styles.image}
                    onPress={onPressSrc}
                // onPress={() => navigation.navigate('A')}
                // onClick={onPressSrc}
                />
                <FontAwesome name="star" size={24} />
                <FontAwesome name="star-o" size={24} />
                <Paragraph>{contents.name}</Paragraph>
                {/* <Button
                    title="Go to Home"
                    onPress={onPressSrc}
                /> */}
            </Card.Content>
        </Card>
    )
}
