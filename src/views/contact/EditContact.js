import React from 'react';
import { Row, Col, Breadcrumb, Card, Form, Button } from 'react-bootstrap';

const EditContact = () => {
    return (
        <React.Fragment>          
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href="./app/dashboard/default">
                        <i className="feather icon-home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="./tables">
                        <i className="fas fa-network-wired" /> Contactos
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <b>Editar Contacto</b>
                    </Breadcrumb.Item>
                </Breadcrumb>    
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Contactos</Card.Title>
                            <span className="d-block m-t-5">Editar Contacto</span>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={12} >
                                    <Form>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control type="text" placeholder="Ingrese nombre..." />
                                        </Form.Group>    
                                        <Button variant="primary">Guardar</Button>
                                        <Button variant="primary" href="/contact/tables">Cancelar</Button>
                                    </Form>
                                </Col>
                                
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default EditContact;