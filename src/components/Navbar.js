import React, {useContext} from 'react'
import {AppBar, Toolbar, Grid, Button} from '@material-ui/core'
import { LOGIN_ROUTE } from '../utils/consts'
import { NavLink } from 'react-router-dom'
import {useAuthState} from 'react-firebase-hooks/auth'
import {Context} from '../index'

export const Navbar = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return (
        <AppBar position="static" color={"secondary"}>
            <Toolbar variant={"dense"}>
                <Grid container justify={"flex-end"}>
                    {user ?
                        <Button onClick={() => auth.signOut()} variant={"outlined"}>Выйти</Button>
                    :
                    <NavLink to={LOGIN_ROUTE}>
                        <Button variant={"outlined"}>Логин</Button>
                    </NavLink>
                    }                   
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
