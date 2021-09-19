import React, { useContext } from 'react'
import { Container, Grid, Box, Button, ThemeProvider, Typography, createTheme } from '@material-ui/core'
import RalewayWoff2 from '../fonts/Raleway-Regular.woff2';
import { Context } from '../index'
import firebase from 'firebase'

const Login = () => {

    const { auth } = useContext(Context)

    const theme = createTheme({
        typography: {
          fontFamily: 'Raleway, Arial',
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: `
              @font-face {
                font-family: 'Raleway';
                font-style: normal;
                font-display: swap;
                font-weight: 400;
                src: "local('Raleway'), local('Raleway-Regular'), url(${RalewayWoff2}) format('woff2')";
                unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
              }
            `,
          },
        },
      });

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const { user } = await auth.signInWithPopup(provider)
        console.log(user)
    }
    return (
        <Container>
            <div className="main-box">
                <img className="logo" src="./media/logo.png" />
                <ThemeProvider theme={theme}>
                    <Typography className="main-title" variant="h3" style={{lineHeight: 2}}>ChatterBox - общайся легко </Typography>
                </ThemeProvider>
            </div>
            <img className="main-img" src="./media/People.jpg"></img>
            <Grid container
                alignItems={"center"}
                justifyContent={"center"}

            >
                <Grid style={{ width: '80%', background: '#F50057' }}
                    container
                    alignItems={"center"}
                    direction={"column"}
                >
                    <Box p={5}>
                        <Button onClick={login} variant="contained" size="large">Войти с помощью Google</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login