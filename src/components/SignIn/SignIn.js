import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Redirect, Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from "@material-ui/core/CircularProgress";
const md5 = require('md5')
import Axios from "axios";
import Cookies from 'js-cookie'
import openSocket from 'socket.io-client';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export function SignIn(props) {
    const classes = useStyles()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loaded, setLoaded] = React.useState(true)
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)

    function changeEmail(e){
        setEmail(e.target.value)
        console.log(email)
    }

    function changePassword(e){
        setPassword(e.target.value)
        console.log(password)
    }

    function createSession(){
        if(validateUserData()){
            setLoaded(false)
            setLoading(true)
            setSuccess(false)
            Axios.post('http://localhost:4000/create-session', {
                email: email,
                password: md5(password)
            }).then(res => {
                if(res.data){
                    setTimeout(() => {
                        setLoaded(false)
                        setLoading(false)
                        setSuccess(true)
                        props.showAlert('success', 'Авторизация прошла успешно, добро пожаловать!')
                    }, 1000)
                    Cookies.set('token', res.data.token)
                    openSocket('http://localhost:8000', {query: {
                            token: res.data.token
                        }})
                    props.changeUser(res.data.userData)
                }else{
                    setTimeout(() => {
                        setLoaded(true)
                        setLoading(false)
                        setSuccess(false)
                        props.showAlert('error', 'Неверный email или пароль')
                    }, 1000)
                }
            }).catch(err => {
                setTimeout(() => {
                    setLoaded(true)
                    setLoading(false)
                    setSuccess(false)
                    props.showAlert('error', 'Ошибка соединения с сервером! Попробуте позже.')
                }, 1000)
            })
        }
    }

    function validateUserData(){
        if(!email) return false
        if(!password) return false
        return true
    }

    const Loading = (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <h2>Loading...</h2>
            <CircularProgress/>
        </Grid>
    )

    const FormAithorization = (<>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={changeEmail}
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={changePassword}
        />
        <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
        />
        <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={createSession}
        >
            Sign In
        </Button>
        <Grid container>
            <Grid item xs>
                <Link to="/">
                    Forgot password?
                </Link>
            </Grid>
            <Grid item>
                <Link to='/sign-up'>
                    {"Don't have an account? Sign Up"}
                </Link>
            </Grid>
        </Grid>
    </>)


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    {(loading && !loaded && !success) ? Loading : (loaded && !loading && !success) ? FormAithorization : <Redirect to='/' /> }
                </form>
            </div>
        </Container>
    );
}


