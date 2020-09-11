import React from 'react'
import { Modal, Button, Form, Col, Spinner } from "react-bootstrap"
import Axios from 'axios'
const md5 = require('md5')

export class SignupModal extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            formScreen: true,
            loadingScreen: false,
            successScreen: false,
            errorScreen: false,
            userData: {
                login: null,
                email: null,
                password: null,
                phone: null,
                gender: null,
                age: null
            }
        }

        this.loginHandleChange = this.loginHandleChange.bind(this)
        this.emailHandleChange = this.emailHandleChange.bind(this)
        this.passwordHandleChange = this.passwordHandleChange.bind(this)
        this.phoneHandleChange = this.phoneHandleChange.bind(this)
        this.genderHandleChange = this.genderHandleChange.bind(this)
        this.ageHandleChange = this.ageHandleChange.bind(this)

        this.getBodyScreen = this.getBodyScreen.bind(this)
        this.getFooterScreen = this.getFooterScreen.bind(this)
        this.getTitleScreen = this.getTitleScreen.bind(this)

        this.formFooter = this.formFooter.bind(this)
        this.formScreen = this.formScreen.bind(this)
        this.errorFooter = this.errorFooter.bind(this)
        
        this.changeScreen = this.changeScreen.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.signUp = this.signUp.bind(this)
    }

    signUp(){
        if(this.state.userData.login &&
            this.state.userData.email &&
            this.state.userData.password && 
            this.state.userData.phone &&
            this.state.userData.gender &&
            this.state.userData.age
        ){
            this.changeScreen('loadingScreen')
        
            Axios.post('http://localhost:4000/create-user', {
                    login: this.state.userData.login,
                    email: this.state.userData.email,
                    password: md5(this.state.userData.password),
                    phone: this.state.userData.phone,
                    gender: (this.state.userData.gender === 'Male') ? 1 : 2,
                    age: this.state.userData.age,
                    role_id: 2
            }).then(res => {
                if(res.data){
                    setTimeout(() => this.changeScreen('successScreen'), 1000)
                }else{
                    setTimeout(() => this.changeScreen('errorScreen'), 1000)
                }
            }).catch(err => {
                setTimeout(() => this.changeScreen('errorScreen'), 1000)
            })
        }
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

    emailHandleChange(event){
        let temp = this.state.userData
        temp['email'] = event.target.value
        this.setState({userData: temp})
    }

    passwordHandleChange(event){
        let temp = this.state.userData
        temp['password'] = event.target.value
        this.setState({userData: temp})
    }

    phoneHandleChange(event){
        let temp = this.state.userData
        temp['phone'] = event.target.value
        this.setState({userData: temp})
    }

    genderHandleChange(event){
        let temp = this.state.userData
        temp['gender'] = event.target.value
        this.setState({userData: temp})
    }

    ageHandleChange(event){
        let temp = this.state.userData
        temp['age'] = event.target.value
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
        return(
            <Form>
                <Form.Group controlId="formBasicLogin">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="login" placeholder="Enter username" onChange={this.loginHandleChange}/>
                    <Form.Text className="text-muted">
                    Come up with an original username.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={this.emailHandleChange}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="phone" placeholder="Enter phone" onChange={this.phoneHandleChange}/>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..." onChange={this.genderHandleChange}>
                            <option>Male</option>
                            <option>Female</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Age</Form.Label>
                        <Form.Control onChange={this.ageHandleChange}/>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.passwordHandleChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
            </Form>
        )
    }

    formFooter(){
        return <>
            <Button variant="secondary" onClick={() => this.closeModal()}>
                Close
            </Button>
            <Button variant="success" onClick={() => this.signUp()}>
                Registration
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
            return 'Registration'
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
            return 'Registration successfully completed! '
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
            return <Button variant="success" onClick={() => this.closeModal()}>Continue</Button>
        }else{
            return this.errorFooter()
        }
    }

    render(){
        return(
            <Modal show={this.props.show} onHide={() => this.closeModal()}>
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