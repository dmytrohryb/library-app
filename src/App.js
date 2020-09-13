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
import Axios from "axios";
import Cookies from "js-cookie";

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            guestMode: true,
            userMode: false,
            adminMode: false,
            userData: {}
        }

        this.identification()
        this.changeMode = this.changeMode.bind(this)
        this.getCurrentMode = this.getCurrentMode.bind(this)
        this.identification = this.identification.bind(this)
    }

    identification(){
        if(Cookies.get('session')){

            Axios.post('http://localhost:4000/identification', {
                token: Cookies.get('session')
            }).then(res => {
                this.setState({userData: res.data[0]})
                this.changeMode(res.data[0])
            }).catch(err => {

            })
        }
    }

    changeMode(user){

        switch (user.role_id){
            case 1:
                this.setState({guestMode: false, userMode: false, adminMode: true, userData: user})
                break
            case 2:
                this.setState({guestMode: false, userMode: true, adminMode: false, userData: user})
                break
            default:
                this.setState({guestMode: true, userMode: false, adminMode: false, userData: {}})
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
              <Navigation changeUser={this.changeMode} userData={this.state.userData} userMode={this.getCurrentMode()} />
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