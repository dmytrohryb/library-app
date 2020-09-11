import React from 'react'
import {Modal, Button, Form, Spinner} from "react-bootstrap"
import Axios from "axios";
const md5 = require('md5')

export class SigninModal extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            formScreen: true,
            loadingScreen: false,
            successScreen: false,
            errorScreen: false,
            userData: {
                login: null,
                password: null
            },
            user: {}
        }

        this.loginHandleChange = this.loginHandleChange.bind(this)
        this.passwordHandleChange = this.passwordHandleChange.bind(this)
        this.changeScreen = this.changeScreen.bind(this)
        this.getBodyScreen = this.getBodyScreen.bind(this)
        this.getFooterScreen = this.getFooterScreen.bind(this)
        this.getTitleScreen = this.getTitleScreen.bind(this)

        this.formFooter = this.formFooter.bind(this)
        this.formScreen = this.formScreen.bind(this)
        this.errorFooter = this.errorFooter.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.continue = this.continue.bind(this)
        this.login = this.login.bind(this)

    }

    continue(){
        this.props.changeUser(this.state.user)
        this.closeModal()
    }

    closeModal(){
        setTimeout(() => this.changeScreen(), 1000)
        this.props.closeModal()
    }

    loginHandleChange(event){
        let temp = this.state.userData
        temp['login'] = event.target.value
        this.setState({userData: temp})
    }

    passwordHandleChange(event){
        let temp = this.state.userData
        temp['password'] = event.target.value
        this.setState({userData: temp})
    }

    changeScreen(screen){
        switch(screen){
            case 'formScreen':
                this.setState({
                    formScreen: true,
                    loadingScreen: false,
                    successScreen: false,
                    errorScreen: false
                })
                break
            case 'loadingScreen':
                this.setState({
                    formScreen: false,
                    loadingScreen: true,
                    successScreen: false,
                    errorScreen: false
                })
                break
            case 'successScreen':
                this.setState({
                    formScreen: false,
                    loadingScreen: false,
                    successScreen: true,
                    errorScreen: false
                })
                break
            case 'errorScreen':
                this.setState({
                    formScreen: false,
                    loadingScreen: false,
                    successScreen: false,
                    errorScreen: true
                })
                break
            default:
                this.setState({
                    formScreen: true,
                    loadingScreen: false,
                    successScreen: false,
                    errorScreen: false
                })
                break
        }
    }

    formScreen(){
        return <>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={this.loginHandleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.passwordHandleChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
            </Form>
        </>
    }

    formFooter(){
        return <>
            <Button variant="secondary" onClick={() => this.closeModal()}>
                Close
            </Button>
            <Button variant="success" onClick={() => this.login()}>
                Login
            </Button>
        </>
    }

    errorFooter(){
        return <>
            <Button variant="primary" onClick={() => this.changeScreen('formScreen')}>
                Try again
            </Button>
            <Button variant="secondary" onClick={() => this.closeModal()}>
                Close
            </Button>
        </>
    }

    getTitleScreen(){
        if(this.state.formScreen && !this.state.loadingScreen && !this.state.successScreen && !this.state.errorScreen){
            return 'Authorization'
        }else if(!this.state.formScreen && this.state.loadingScreen && !this.state.successScreen && !this.state.errorScreen){
            return 'Loading'
        }else if(!this.state.formScreen && !this.state.loadingScreen && this.state.successScreen && !this.state.errorScreen){
            return 'Success'
        }else{
            return 'Error'
        }
    }

    getBodyScreen(){
        if(this.state.formScreen && !this.state.loadingScreen && !this.state.successScreen && !this.state.errorScreen){
            return this.formScreen()
        }else if(!this.state.formScreen && this.state.loadingScreen && !this.state.successScreen && !this.state.errorScreen){
            return <Spinner animation="border" variant="success" />
        }else if(!this.state.formScreen && !this.state.loadingScreen && this.state.successScreen && !this.state.errorScreen){
            return 'Welcome, ' + this.state.userData.login + '!'
        }else{
            return 'An error has occurred! Do want to try again?'
        }
    }

    getFooterScreen() {
        if(this.state.formScreen && !this.state.loadingScreen && !this.state.successScreen && !this.state.errorScreen){
            return this.formFooter()
        }else if(!this.state.formScreen && this.state.loadingScreen && !this.state.successScreen && !this.state.errorScreen){
            return 'Please wait'
        }else if(!this.state.formScreen && !this.state.loadingScreen && this.state.successScreen && !this.state.errorScreen){
            return <Button variant="success" onClick={() => this.continue()}>Continue</Button>
        }else{
            return this.errorFooter()
        }
    }

    login(){
        if(this.state.userData.login &&
            this.state.userData.password
        ){
            this.changeScreen('loadingScreen')

            Axios.post('http://localhost:4000/create-session', {
                login: this.state.userData.login,
                password: md5(this.state.userData.password)
            }).then(res => {
                if(res.data){
                    this.setState({user: res.data})
                    setTimeout(() => this.changeScreen('successScreen'), 1000)
                }else{
                    setTimeout(() => this.changeScreen('errorScreen'), 1000)
                }
            }).catch(err => {
                setTimeout(() => this.changeScreen('errorScreen'), 1000)
            })
        }
    }

    render(){
        return(
            <Modal show={this.props.show} onHide={(this.state.success) ? () => this.continue() :() => this.closeModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.getTitleScreen()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.getBodyScreen()}
                </Modal.Body>
                <Modal.Footer>
                    {this.getFooterScreen()}
                </Modal.Footer>
            </Modal>
        )
    }
}