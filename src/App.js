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
import SignIn from "./components/SignIn/SignIn";
import {SignUp} from "./components/SignUp/SignUp";
import {Home} from './routes/Home'
import {News} from "./routes/News";
import {Catalog} from "./routes/Catalog";
import {About} from "./routes/About";
const store = createStore(rootReducer)

class App extends React.Component {

    constructor(props) {
        super(props);

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
                                <Header />
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
                                        <SignIn />
                                    </Route>
                                    <Route path="/sign-up">
                                        <SignUp />
                                    </Route>
                                </Switch>
                                <MainView />
                            </Grid>

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
