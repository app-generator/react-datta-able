import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown,Breadcrumb } from 'react-bootstrap';


const AddPriority = () => {
    return (
        <>
          <Card>
          <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href="./app/dashboard/default">
                        <i className="feather icon-home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="./list-Priorities">
                        <i className="fas fa-network-wired" /> Prioridad
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <b>Agregar Prioridad</b>
                    </Breadcrumb.Item>
                </Breadcrumb>    
            </Row>
                        <Card.Header>
                            <Card.Title as="h5">Form Grid</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                            <th></th>
                                    

                                <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Impacto</Form.Label>
                                        <Form.Control placeholder="1234 Main St" />
                                </Form.Group>

                                <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Urgencia</Form.Label>
                                        <Form.Control placeholder="1234 Main St" />
                                </Form.Group>
                                <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Tiempo de respuesta</Form.Label>
                                        <Form.Control placeholder="1234 Main St" />
                                </Form.Group>
                                <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Unresponse time (?</Form.Label>
                                        <Form.Control placeholder="1234 Main St" />
                                </Form.Group>
                                <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Tiempo de resolucion</Form.Label>
                                        <Form.Control placeholder="1234 Main St" />
                                </Form.Group>
                                <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Tiempo sin resolver</Form.Label>
                                        <Form.Control placeholder="1234 Main St" />
                                </Form.Group>

                          

                                <Button variant="primary">Cargar Usuario</Button>
                            </Form>
                        </Card.Body>
                    </Card>
            
        </>
    )
}

export default AddPriority