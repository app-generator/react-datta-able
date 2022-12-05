import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

const AddUser = () => {
    return (
        <>
          <Card>
                        <Card.Header>
                            <Card.Title as="h5">Form Grid</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>

                                <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Nombre de usuario</Form.Label>
                                        <Form.Control placeholder="1234 Main St" />
                                </Form.Group>

                                <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Nombre/s</Form.Label>
                                        <Form.Control placeholder="1234 Main St" />
                                </Form.Group>
                                <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control placeholder="1234 Main St" />
                                </Form.Group>
                                

                                <Form.Group controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Button variant="primary">Cargar Usuario</Button>
                            </Form>
                        </Card.Body>
                    </Card>
            
        </>
    )
}

export default AddUser
