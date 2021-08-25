import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import Hyperlink from 'react-native-hyperlink'

const styles = StyleSheet.create({
    pink: {
        color: '#fff',
        // width: '45%',
        margin: 5,
        borderRadius: 10,
    },
})

export default function SimpleCard({ contents }: { contents: any }) {
    return (
        <Card>
            <Card.Content>
                <Title>{contents.title}</Title>
                <Image
                    source={{ uri: `${contents.src}` }}
                    style={{ width: 200, height: 200 }}
                />
                {/* <Hyperlink linkDefault={true}>
                    <Text >
                        This text will be parsed to check for clickable strings like https://firebasestorage.googleapis.com/v0/b/log-app-6b654.appspot.com/o/images%2F2.ReactNativeCourse_2.pdf?alt=media&token=a479d2cf-55fd-4506-847a-a22393452438 and made clickable.
                    </Text>
                </Hyperlink> */}
                <Paragraph>{contents.name}</Paragraph>
            </Card.Content>
        </Card>
    )
}