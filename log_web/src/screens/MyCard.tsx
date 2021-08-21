import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const styles = StyleSheet.create({
    green: {
        color: '#fff',
        backgroundColor: '#A6C742',
        width: '70%',
        margin: 5,
        marginLeft: 105,
        // marginRight: 10,
        borderRadius: 10,
        // padding: 16,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
    },
});

export default function SimpleCard({ messages }: { messages: any }) {

    return (
        <Card style={{ justifyContent: 'flex-start', }}>
            <Card.Content style={styles.green}>
                <Title>{messages.message}</Title>
                <Paragraph>{messages.name}</Paragraph>
                {/* <Paragraph>{messages.age}</Paragraph> */}
                <Paragraph>{messages.uid}</Paragraph>
            </Card.Content>
        </Card>
    );

}