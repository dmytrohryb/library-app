import React from 'react'
import { Modal, Button, Form } from "react-bootstrap"

export class SigninModal extends React.Component {
    
    constructor(props){
        super(props)
    }

    signIn(){

    }

    render(){
        return(
            <>
            <Modal show={this.props.show} onHide={() => this.props.closeModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.props.closeModal()}>
                        Close
                    </Button>
                    <Button variant="success" onClick={this.signIn}>
                        Sign in
                    </Button>
                </Modal.Footer>
            </Modal>
            </>
        )
    }
}