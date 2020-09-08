import React from 'react'
import './styles/App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import {About} from './pages/About'
import {Home} from './pages/Home'
import {Rules} from './pages/Rules'
import {Catalog} from './pages/Catalog'
import {Navigation} from './components/Navigation'

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            guestMode: true,
            userMode: false,
            adminMode: false
        }
    }

    render(){
        return (
            <Router>
              <Navigation />
              <Switch>
                  <Route path="/about">
                    <About />
                  </Route>
                  <Route path="/books">
                    <Catalog />
                  </Route>
                  <Route path="/rules">
                    <Rules />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
            </Router>
        )
    }
}

export default App;