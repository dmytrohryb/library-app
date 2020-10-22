import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from "@material-ui/core/CircularProgress";
const md5 = require('md5')
import Axios from "axios";
import {changeUser} from "../../store/PersonalBlock/actions";
import {connect} from "react-redux";
import {Alert, AlertTitle} from "@material-ui/lab";

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

function SignIn(props) {
    const classes = useStyles()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loaded, setLoaded] = React.useState(true)
    const [error, setError] = React.useState(false)

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
            Axios.post('http://localhost:4000/create-user', {
                email: email,
                password: md5(password)
            }).then(res => {
                if(res.data){
                    setTimeout(() => setLoaded(true), 1000)
                    props.changeUser('user')
                }else{
                    setTimeout(() => {
                        setLoaded(true)
                        setError(true)
                    }, 1000)
                }
            }).catch(err => {
                setTimeout(() => {
                    setLoaded(true)
                    setError(true)
                }, 1000)
            })
        }
    }

    function validateUserData(){
        if(!email) return false
        if(!password) return false
        return true
    }

    const Error = (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >

                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    This is an error alert — <strong>check it out!</strong>
                </Alert>

                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={e => {
                        setLoaded(Boolean(e))
                        setError(!Boolean(e))
                    }}
                >
                    Try again
                </Button>

        </Grid>
    )

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

    const Loaded = (<>
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
                <Link href="#" variant="body2">
                    Forgot password?
                </Link>
            </Grid>
            <Grid item>
                <Link href="#" variant="body2">
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
                    {(!error) ? (loaded) ? Loaded : Loading : Error}
                </form>
            </div>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        user: state.personalBlock.user
    }
}

const mapDispatchToProps = {
    changeUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
