import React from 'react'
import {AppBar, Toolbar, Grid, Button} from '@material-ui/core'
import { LOGIN_ROUTE } from '../utils/consts'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
    const user = false
    return (
        <AppBar position="static" color={"secondary"}>
            <Toolbar variant={"dense"}>
                <Grid container justify={"flex-end"}>
                    {user ?
                        <Button variant={"outlined"}>Выйти</Button>
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
