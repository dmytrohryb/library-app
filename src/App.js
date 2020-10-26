import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {ThemeProvider} from '@material-ui/core/styles';
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {MainView} from "./components/MainView/MainView";
import {theme} from "./assets/theme";
import {createStore} from "redux";
import rootReducer from './store/reducers'
import {Provider} from 'react-redux'
import SignIn from "./containers/SignInContainer";
import {SignUp} from "./components/SignUp/SignUp";
import Home from './containers/HomeRouteContainer'
import {News} from "./routes/News";
import {Catalog} from "./routes/Catalog";
import {About} from "./routes/About";
const store = createStore(rootReducer)
import {Alert} from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alert: {
                open: false,
                type: 'success',
                text: ''
            }
        }

        this.showAlert = this.showAlert.bind(this)
        this.hideAlert = this.hideAlert.bind(this)
    }

    showAlert(type, text){
        this.hideAlert()
        this.setState({alert: {open: true, type: type, text: text}})
    }

    hideAlert(){
        this.setState({alert: {open: false, type: '', text: ''}})
    }

    render() {
        return(
            <Router>
            <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg">
                    <div style={{flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh'}}>
                        <Grid container spacing={3}>

                            <Grid item xs={12}>
                                <Header showAlert={this.showAlert} />
                            </Grid>

                            <Grid item xs={12}>
                                <Switch>
                                    <Route exact path="/">
                                        <Home />
                                    </Route>
                                    <Route path="/news">
                                        <News />
                                    </Route>
                                    <Route path="/catalog">
                                        <Catalog />
                                    </Route>
                                    <Route path="/about">
                                        <About />
                                    </Route>
                                    <Route path="/sign-in">
                                        <SignIn showAlert={this.showAlert}/>
                                    </Route>
                                    <Route path="/sign-up">
                                        <SignUp showAlert={this.showAlert}/>
                                    </Route>
                                </Switch>
                                <MainView />
                            </Grid>


                            <Snackbar open={this.state.alert.open} autoHideDuration={6000} onClose={() => this.hideAlert()}>
                                <Alert onClose={() => this.hideAlert()} severity={this.state.alert.type}>
                                    {this.state.alert.text}
                                </Alert>
                            </Snackbar>

                        </Grid>
                        <footer style={{marginTop: 'auto'}}>
                            <Container style={{a: "center"}} maxWidth="sm">
                                <Footer />
                            </Container>
                        </footer>
                    </div>
                </Container>
            </ThemeProvider>
            </Provider>
            </Router>
        );

    }
}

export default App
