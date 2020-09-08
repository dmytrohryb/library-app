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
            user: undefined
        }
    }
    
    render(){
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand><Link class="nav-link brand" to="/">Library app</Link></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link><Link class="nav-link" to="/">Home</Link></Nav.Link>
                        <Nav.Link><Link class="nav-link" to="/books">Catalog</Link></Nav.Link>
                        <Nav.Link><Link class="nav-link" to="/rules">Rules</Link></Nav.Link>
                        <Nav.Link><Link class="nav-link" to="/about">About</Link></Nav.Link>
                    </Nav>
                <Form inline>
                    <Button variant="outline-warning" onClick={() => this.setState({signUpModal: true})}>Sign up</Button>
                    <div class="margin14"/>
                    <Button variant="success" onClick={() => this.setState({signInModal: true})}>Sign in</Button>
                </Form>
                <SigninModal show={this.state.signInModal} closeModal={() => this.setState({signInModal: false})}/>
                <SignupModal show={this.state.signUpModal} closeModal={() => this.setState({signUpModal: false})}/>
            </Navbar>
        )
    }
}