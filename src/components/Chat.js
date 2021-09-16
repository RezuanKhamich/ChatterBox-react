import React, { useContext, useState } from 'react'
import { Context } from '../index'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Container, Grid, Button } from '@material-ui/core'
import TextField from "@material-ui/core/TextField"
import {useCollectionData} from 'react-firebase-hooks/firestore'
import Loader from './Loader'
import firebase from 'firebase'


const Chat = () => {
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )

    const sendMessage = async () => {
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue('')
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <Container>
            <Grid container
                justify={"center"}
                style={{ height: window.innerHeight - 50, marginTop: 20 }}>
                <div style={{ width: '80%', height: '68vh', border: '1px solid gray', overflow: 'auto' }}>

                </div>
                <Grid
                    container
                    direction={"column"}
                    alignItems={"flex-end"}
                    style={{ width: '80%' }}
                >
                    <TextField 
                        fullWidth
                        rowsMax={2}
                        variant={"outlined"}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    >
                            
                    </TextField>
                    <Button 
                        variant={"outlined"}
                        style={{marginTop: "10px"}}
                        onClick={sendMessage}
                    >
                        Отправить
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Chat;