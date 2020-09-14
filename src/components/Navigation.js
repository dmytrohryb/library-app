import React from 'react'
import {
    Button,
    Nav,
    Navbar,
    Form
  } from 'react-bootstrap'
import {Link} from "react-router-dom"
import '../styles/Navigation.css'
import {SigninModal} from './SigninModal'
import {SignupModal} from './SignupModal'
import {LogoutModal} from "./LogoutModal";
import {NavigationButton} from "./base/NavigationButton";

export class Navigation extends React.Component {

    constructor(props){
        super(props)
        this.state = {

        }

        this.userMode = this.userMode.bind(this)
        this.guestMode = this.guestMode.bind(this)
        this.adminMode = this.adminMode.bind(this)
        this.changeMode = this.changeMode.bind(this)
        this.changeUser = this.changeUser.bind(this)
    }

    changeUser(user){

        this.props.changeUser(user)
    }

    changeMode(){
        switch (this.props.userMode){
            case 'guest':
                return this.guestMode()
            case 'user':
                return this.userMode()
            case 'admin':
                return this.adminMode()
        }
    }

    adminMode(){
        return(
            <>
                <Form inline>
                    <Button variant="warning" onClick={() => this.setState({signUpModal: true})}>Admin panel</Button>
                    <div className="margin14"/>
                    <Button variant="success" onClick={() => this.setState({signUpModal: true})}>My profile</Button>
                    <div className="margin14"/>
                    <Button variant="outline-danger" onClick={() => this.setState({logoutModal: true})}>Logout</Button>
                </Form>
                <LogoutModal show={this.state.logoutModal} changeUser={this.changeUser} closeModal={() => this.setState({logoutModal: false})}/>
            </>
        )
    }

    userMode(){
        return (
            <>
                <Form inline>
                    <div className="welcome-text">Welcome, {this.props.userData.login}</div>
                    <div className="margin14"/>
                    <Button variant="success" onClick={() => this.setState({signUpModal: true})}>My profile</Button>
                    <div className="margin14"/>
                    <Button variant="outline-danger" onClick={() => this.setState({logoutModal: true})}>Logout</Button>
                </Form>
                <LogoutModal show={this.state.logoutModal} changeUser={this.changeUser} closeModal={() => this.setState({logoutModal: false})}/>
            </>
        )
    }

    guestMode(){
        return (
            <>
                <Form inline>


                    <NavigationButton name='Register' onPress={() => this.setState({signUpModal: true})}/>
                    <div className="margin14"/>
                    <NavigationButton name='Login' onPress={() => this.setState({signInModal: true})}/>
                </Form>
                <SigninModal show={this.state.signInModal} changeUser={this.changeUser} closeModal={() => this.setState({signInModal: false})}/>
                <SignupModal show={this.state.signUpModal} closeModal={() => this.setState({signUpModal: false})}/>
            </>
        )
    }
    
    render(){
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand><Link className="nav-link brand" to="/">Library app</Link></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Link className="nav-link" to="/">News</Link>
                        <Link className="nav-link" to="/books">Catalog</Link>
                        <Link className="nav-link" to="/rules">Rules</Link>
                        <Link className="nav-link" to="/about">About</Link>
                        <Link className="nav-link" to="/about">Top readers</Link>
                        <Link className="nav-link" to="/about">Top authors</Link>
                    </Nav>
                {this.changeMode()}
            </Navbar>
        )
    }
}