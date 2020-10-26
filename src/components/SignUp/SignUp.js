import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios'
const md5 = require('md5')
import CircularProgress from '@material-ui/core/CircularProgress';
import {Redirect, Link} from 'react-router-dom';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export function SignUp(props) {
    const classes = useStyles();

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const [surname, setSurname] = React.useState('')
    const [success, setSuccess] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [confirmation, setConfirmation] = React.useState(false)
    const [confirmationCode, setConfirmationCode] = React.useState('')


    function createUser(){
            if(validateUserData()){
                if(/@/.test(email)){
                setLoading(true)
                setConfirmation(false)
                setSuccess(false)

                    Axios.post('http://localhost:4000/create-user', {
                        email: email,
                        password: md5(password),
                        name: name,
                        surname: surname,
                        role_id: 2
                    }).then(res => {
                        if(res.data === true){
                            setTimeout(() => props.showAlert('success', 'Письмо с кодом подтверждения отправлено по адресу ' + email), 2000)
                            setTimeout(() => {
                                setLoading(false)
                                setConfirmation(true)
                                setSuccess(false)
                            }, 1500)
                        }else{
                            if(res.data === 'email exists'){
                                setTimeout(() => props.showAlert('error', 'This email already exists!'), 2000)
                                setTimeout(() => {
                                    setLoading(false)
                                    setConfirmation(false)
                                    setSuccess(false)
                                }, 1500)
                            }else{
                                setTimeout(() => props.showAlert('error', 'Ошибка подтверждения почтового адреса! Возможно вы указали несуществующий адрес, убедитесь что указан верный адрес и попробуте снова.'), 2000)
                                setTimeout(() => {
                                    setLoading(false)
                                    setConfirmation(false)
                                    setSuccess(false)
                                }, 1500)
                            }

                        }
                    }).catch(err => {
                        setTimeout(() => props.showAlert('error', 'нет соединения с сервером'), 2000)
                        setTimeout(() => {
                            setLoading(false)
                            setConfirmation(false)
                            setSuccess(false)
                        }, 1500)
                    })
                }else{
                    props.showAlert('error', 'Некорректный email адрес!')
                }
            }

    }

    function validateUserData(){
        if(!email) return false
        if(!password) return false
        if(!name) return false
        if(!surname) return false
        return true
    }

    function validateCode(){
        if(confirmationCode.length === 6) {
            setLoading(true)
            setConfirmation(false)
            setSuccess(false)
            Axios.post('http://localhost:4000/confirmation-email', {
                email: email,
                password: md5(password),
                name: name,
                surname: surname,
                gender_id: 1,
                role_id: 1,
                code: confirmationCode
            }).then(res => {
                if(res.data === true){
                    setTimeout(() => props.showAlert('success', 'Email confirmed, account created!'), 2000)
                    setTimeout(() => {
                        setLoading(false)
                        setConfirmation(false)
                        setSuccess(true)
                    }, 1500)
                }else{
                    setTimeout(() => props.showAlert('error', 'Invalid confirmation code'), 2000)
                    setTimeout(() => {
                        setLoading(false)
                        setConfirmation(true)
                        setSuccess(false)
                    }, 1500)
                }
            }).catch(err => {
                setTimeout(() => props.showAlert('error', 'нет соединения с сервером'), 2000)
                setTimeout(() => {
                    setLoading(false)
                    setConfirmation(false)
                    setSuccess(false)
                }, 1500)
            })
        }
    }

    function changeEmail(e){
        setEmail(e.target.value)
    }

    function changePassword(e){
        setPassword(e.target.value)
    }

    function changeFirstName(e){
        setName(e.target.value)
    }

    function changeLastName(e){
        setSurname(e.target.value)
    }

    function changeConfirmationCode(e){
        setConfirmationCode(e.target.value)
    }

    const LoadingScreen = (
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

    const FormConfirmationEmail = (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <h2>Confirmation Email</h2>
            <TextField
                autoComplete="fname"
                name="code"
                variant="outlined"
                required
                fullWidth
                id="code"
                label="Confirmation code"
                autoFocus
                onChange={changeConfirmationCode}
            />
            <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={e => {
                    validateCode()
                }}
            >
                Continue
            </Button>
        </Grid>
    )

    const FormRegistration = (<>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="First name"
                        autoFocus
                        onChange={changeFirstName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="surname"
                        label="Last name"
                        name="surname"
                        autoComplete="lname"
                        onChange={changeLastName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={changeEmail}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={changePassword}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                </Grid>
            </Grid>
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={createUser}
            >
                Sign Up
            </Button>
            <Grid container justify="flex-end">
                <Grid item>
                    <Link to="/sign-in">
                        Already have an account? Sign in
                    </Link>
                </Grid>
            </Grid>
        </>
    )

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    {(loading) ? LoadingScreen : (confirmation) ? FormConfirmationEmail : (success) ? <Redirect to='/sign-in' /> : FormRegistration}
                </form>
            </div>

        </Container>
    )
}
