import React from 'react'
import {Modal, Button, Form, Spinner} from "react-bootstrap"
import Axios from "axios";
import Cookies from "js-cookie";

export class LogoutModal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            formScreen: true,
            loadingScreen: false,
            successScreen: false,
            errorScreen: false
        }

        this.changeScreen = this.changeScreen.bind(this)
        this.getBodyScreen = this.getBodyScreen.bind(this)
        this.getFooterScreen = this.getFooterScreen.bind(this)
        this.getTitleScreen = this.getTitleScreen.bind(this)

        this.formFooter = this.formFooter.bind(this)
        this.formScreen = this.formScreen.bind(this)
        this.errorFooter = this.errorFooter.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.continue = this.continue.bind(this)
        this.logout = this.logout.bind(this)
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

    continue(){
        this.props.changeUser({})
        this.closeModal()
    }

    closeModal(){
        setTimeout(() => this.changeScreen(), 1000)
        this.props.closeModal()
    }

    logout(){
        this.changeScreen('loadingScreen')
        Axios.post('http://localhost:4000/close-session', {
            token: Cookies.get('session')
        }).then(res => {
            if(res){
                if(res){
                    Cookies.remove('session')

                    setTimeout(() => this.changeScreen('successScreen'), 1000)

                }else{
                    setTimeout(() => this.changeScreen('errorScreen'), 1000)
                }

            }else {

            }

        }).catch(err => {

        })

    }

    formScreen(){
        return <>
            <Form>
                <Form.Label>Are you sure you want to close the session?</Form.Label>
            </Form>
        </>
    }

    formFooter(){
        return <>
            <Button variant="success" onClick={() => this.closeModal()}>
                Close
            </Button>
            <Button variant="danger" onClick={() => this.logout()}>
                Logout
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
            return 'Log out'
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
            return 'Session closed successfully'
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

    render() {
        return(
            <Modal show={this.props.show} onHide={() => {}}>
                <Modal.Header >
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