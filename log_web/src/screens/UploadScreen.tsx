import * as React from 'react';
import { Button, Text, View, StyleSheet, TextInput } from "react-native";
import firebase from "../lib/firebase";
import "firebase/firestore";
import { useDropzone } from "react-dropzone";
import { storage } from "../lib/firebase";
import { Card, Title, Paragraph } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Input } from 'react-native-elements';

const styles = StyleSheet.create({
    titleText: {
        marginTop: 5,
        marginBottom: 30,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    button: {
        alignItems: "center",
        padding: 10
    },
    inputtt: {
        height: 20,
        borderColor: 'gray',
        borderWidth: 1
    },
});

export default function UploadScreen({ navigation, route, props }: { navigation: any, route: any, props: Props }) {
    //現在ログインしているユーザーを取得する
    const [uid, setUid] = React.useState(`${route.params?.uid}`);
    const [name, setName] = React.useState('');
    const [user, setUser] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [title, setTitle] = React.useState("");
    const [dsc, setDsc] = React.useState("");
    const db = firebase.firestore()
    React.useEffect(() => {
        firebase.auth().signInAnonymously()
            .then(() => {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        var uid = user.uid;
                        setUid(uid)
                        firebase
                            .firestore()
                            .collection("users")
                            .where("id", "==", `${user.uid}`)
                            .get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    console.log(doc.id, " => ", doc.data())
                                    setName(doc.data().name)
                                })
                            })
                    }
                })
            })
    }, [])

    const handleCreate = async () => {
        // if (e.key === 'Enter') {
        await
            db.collection('contents').add({
                name: `${name}`,
                title,
                src: `${src}`,
                dsc,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                star: 0,

            })
                .then((docref) => {
                    // console.log("Document successfully written!:", docref.id);
                    setTitle("");
                    setSrc("");
                    setMyFiles([]);
                    setClickable(false);
                    db.collection("contents").doc(docref.id).set({
                        id: docref.id,
                    }, { merge: true }//←上書きされないおまじない
                    )
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                })
    }
    // }
    const [myFiles, setMyFiles] = React.useState<File[]>([]);
    const [clickable, setClickable] = React.useState(false);
    const [src, setSrc] = React.useState("");
    const onDrop = React.useCallback(async (acceptedFiles: File[]) => {
        if (!acceptedFiles[0]) return;
        try {
            setMyFiles([...acceptedFiles]);
            setClickable(true);
            handlePreview(acceptedFiles);
        } catch (error) {
            alert(error);

        }
    }, []);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });
    const handleUpload = async (accepterdImg: any) => {
        try {
            // アップロード処理
            const uploadTask: any = storage
                .ref(`/images/${myFiles[0].name}`)
                .put(myFiles[0]);
            // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, next, error);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
        }
        catch (error) {
        }
    };
    const handlePreview = (files: any) => {
        if (files === null) {
            return;
        }
        const file = files[0];
        if (file === null) {
            return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setSrc(reader.result as string);
        };
    };
    const { acceptedFiles } = useDropzone();
    const files = acceptedFiles.map(file => (
        <li key={file.name}>{file.path}</li>
    ));

    return (
        <View>
            <Text>title</Text>
            <TextInput
                style={styles.inputtt}
                value={title}
                onChangeText={setTitle}
            />
            <Text>概要</Text>
            <TextInput
                style={styles.inputtt}
                value={dsc}
                onChangeText={setDsc}
            />
            <Card>
                <Card.Content>
                    <Paragraph>ファイルを添付</Paragraph>
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <form >
                            <input
                                {...getInputProps()}
                            />
                        </form>
                        {myFiles.length === 0 ? (
                            <FontAwesome name="folder" size={24} />
                        ) : (
                            <View style={{ width: '180px', height: '180px' }}>
                                {myFiles.map((file: File) => (
                                    <React.Fragment key={file.name}>
                                        {src && <img src={src} />}
                                    </React.Fragment>
                                ))}
                            </View>
                        )}
                        <Paragraph>
                            {files}
                        </Paragraph>
                    </div>
                    <Button
                        title="upload"
                        onPress={() => handleUpload(myFiles)}
                    />
                </Card.Content>
            </Card>
            <FontAwesome name="send" onClick={handleCreate} size={120} />
        </View>



        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Text>Home Screen</Text>
        //     <Button
        //         title="Go to Profile"
        //         onPress={() => navigation.navigate('Profile')}
        //     />
        //     <Button
        //         title="log in"
        //         onPress={() => navigation.navigate('Main')}
        //     />
        // </View>
    )
}
