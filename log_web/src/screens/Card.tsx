import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const styles = StyleSheet.create({
    pink: {
        color: '#fff',
        backgroundColor: 'pink',
        width: '70%',
        margin: 5,
        borderRadius: 10,
    },
})

export default function SimpleCard({ messages }: { messages: any }) {
    return (
        <Card>
            <Card.Content style={styles.pink}>
                <Title>{messages.message}</Title>
                <Paragraph>{messages.name}</Paragraph>
                <Paragraph>{messages.uid}</Paragraph>
            </Card.Content>
        </Card>
    )
}