import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, Button, Container, Grid, Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import firebase from "firebase";

const Chat = () => {
    const { auth, firestore } = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')

    const [messages, setMessages] = useState([])
    const [emptyMessage, setEmptyMessage] = useState(false)

    useEffect(() => {
        firestore.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
        console.log("getData")
    }, [])

    const sendMessage = async () => {
        if(value){
            firestore.collection('messages').add({
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                text: value,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            setValue('');
            setEmptyMessage(false);
        } else{
            setEmptyMessage(true);
        }
    }

    return (
        <Container>
            <Grid container
                justifyContent={"center"}
                style={{ height: window.innerHeight - 50, marginTop: 20 }}>
                <div style={{ width: '80%', height: '60vh', border: '1px solid gray', overflowY: 'auto' }}>
                    {messages.map(message => {
                        return (
                            <div style={{
                                margin: 10,
                                border: user.uid === message.uid ? '2px solid green' : '2px dashed red',
                                marginLeft: user.uid === message.uid ? 'auto' : '10px',
                                width: 'fit-content',
                                padding: 5,
                            }}>
                                <Grid container>
                                    <Avatar src={message.photoURL} />
                                    <div>{message.displayName}</div>
                                </Grid>
                                <div>{message.text}</div>
                            </div>
                        )
                    })}
                </div>
                <Grid
                    container
                    direction={"column"}
                    alignItems={"flex-end"}
                    style={{ width: '80%' }}
                >
                    <TextField
                        fullWidth
                        error = {!emptyMessage ? '' : "error"}
                        rowsMax={2}
                        id="outlined-error"
                        label="Сообщение"
                        defaultValue="Hello World"
                        helperText={!emptyMessage ? ' ' : "Вы не ввели сообщение"}
                        variant={"outlined"}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Button onClick={sendMessage} color="secondary" variant={"contained"}>Отправить</Button>
                </Grid>

            </Grid>
        </Container>
    )
}

export default Chat;