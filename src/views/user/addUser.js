import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown,Breadcrumb } from 'react-bootstrap';


const AddUser = () => {
    return (
        <>
          <Card>
          <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href="./app/dashboard/default">
                        <i className="feather icon-home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="./list-user">
                        <i className="fas fa-network-wired" /> Usuarios
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <b>Agregar Usuario</b>
                    </Breadcrumb.Item>
                </Breadcrumb>    
            </Row>
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
                                
                                <Form.Group>
                                    <Form.Label>Prioridad : </Form.Label>
                                    <select Select aria-label="Default select example">
                                        <option>opciones</option>
                                        <option value="1">critico</option>
                                        <option value="2">alto</option>
                                        <option value="3">medio</option>
                                        <option value="4">bajo</option>
                                        <option value="5">muy bajo</option>
                                        
                                        
                                    </select>
                                </Form.Group>
                            
                          

                                <Button variant="primary">Cargar Usuario</Button>
                            </Form>
                        </Card.Body>
                    </Card>
            
        </>
    )
}

export default AddUser
