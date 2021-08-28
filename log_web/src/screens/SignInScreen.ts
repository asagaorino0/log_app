import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
    Home: undefined;
    SignIn: undefined;
};

type Props = StackScreenProps<RootStackParamList>;

export default function SignInScreen({ navigation }: { navigation: Props }) {
    // const : React.FC<Props> = ({ navigation }: Props) => {
    return (
        <View>
        <Button title= "Go to Details" onPress = {() => navigation.goBack()
} />

  );
};

// export default SignInScreen;