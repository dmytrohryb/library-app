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

        this.changeMode = this.changeMode.bind(this)
        this.getCurrentMode = this.getCurrentMode.bind(this)
    }

    changeMode(user){
        console.log(user)
        switch (user.role_id){
            case 1:
                this.setState({guestMode: false, userMode: false, adminMode: true})
                break
            case 2:
                this.setState({guestMode: false, userMode: true, adminMode: false})
                break
            default:
                this.setState({guestMode: true, userMode: false, adminMode: false})
        }
    }

    getCurrentMode(){
        if(this.state.guestMode){
            return 'guest'
        }
        if(this.state.userMode){
            return 'user'
        }
        if(this.state.adminMode){
            return 'admin'
        }
    }

    render(){
        return (
            <Router>
              <Navigation changeUser={this.changeMode} userMode={this.getCurrentMode()} />
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