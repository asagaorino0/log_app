import * as React from 'react';

import {
    StyleSheet,
    TouchableOpacity,
    GestureResponderEvent,
    Image,
    NativeSyntheticEvent,
    NativeTouchEvent
} from "react-native";

type Props = {
    onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
    src: any;
    accessibilityLabel?: string;
    disabled?: boolean;
    testID?: string;
    source: any;
    style: any;
}

export default function ButtonImage({
    onPress,
    src,
    source = { uri: src },
    style,
}: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.image}>
            <Image source={source} style={style} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    image: {
        width: "100%",
        alignItems: 'center',
    },
});