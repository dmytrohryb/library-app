import React from 'react'
import {BookCard} from "../components/BookCard";
import {Container, Row, Col} from "react-bootstrap";
import '../styles/CatalogPage.css'

export const Catalog = () => {
    
    return (
        <Container className='main'>
            <div className='divider'/>
            <Row>
                <Col className='content'><BookCard/></Col>
                <Col className='content'><BookCard/></Col>
                <Col className='content'><BookCard/></Col>
                <Col className='content'><BookCard/></Col>
                <Col className='content'><BookCard/></Col>
            </Row>
            <div className='divider'/>
            <Row>
                <Col className='content'><BookCard/></Col>
                <Col className='content'><BookCard/></Col>
                <Col className='content'><BookCard/></Col>
                <Col className='content'><BookCard/></Col>
                <Col className='content'><BookCard/></Col>
            </Row>
        </Container>
    )
}