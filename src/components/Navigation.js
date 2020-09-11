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
                    <Button variant="outline-danger" onClick={() => this.setState({signInModal: true})}>Log out</Button>
                </Form>
            </>
        )
    }

    userMode(){
        return (
            <>
                <Form inline>
                    <Button variant="warning" onClick={() => this.setState({signUpModal: true})}>My profile</Button>
                    <div className="margin14"/>
                    <Button variant="outline-danger" onClick={() => this.setState({signInModal: true})}>Log out</Button>
                </Form>
            </>
        )
    }

    guestMode(){
        return (
            <>
                <Form inline>
                    <Button variant="outline-warning" onClick={() => this.setState({signUpModal: true})}>Sign up</Button>
                    <div className="margin14"/>
                    <Button variant="success" onClick={() => this.setState({signInModal: true})}>Sign in</Button>
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
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/books">Catalog</Link>
                        <Link className="nav-link" to="/rules">Rules</Link>
                        <Link className="nav-link" to="/about">About</Link>
                    </Nav>
                {this.changeMode()}
            </Navbar>
        )
    }
}