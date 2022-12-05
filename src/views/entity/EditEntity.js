import React from 'react';
import { Row, Col, Breadcrumb, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EditEntity = () => {
    return (
        <React.Fragment>          
            {/*<Row>
                <Breadcrumb>
                    <Breadcrumb.Item as={Link} to="#">
                        <i className="feather icon-sidebar" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item as={Link} to='/entity/tables'>
                        Entidades
                    </Breadcrumb.Item>
                    <Breadcrumb.Item as={Link} to="#" active>
                        Agregar Entidad
                    </Breadcrumb.Item>
                </Breadcrumb>    
    </Row>*/}
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Entidades</Card.Title>
                            <span className="d-block m-t-5">Editar Entidad</span>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={12} lg={6}>
                                    <Form>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control type="email" placeholder="Text" />
                                        </Form.Group>    
                                        <Button variant="primary">Guardar</Button>
                                        <Button variant="primary" href="/entity/tables">Cancelar</Button>
                                    </Form>
                                </Col>
                                <Col sm={12} lg={6}>
                                    <Form.Group controlId="formPlaintextEmail">
                                        <Form.Label>Slug</Form.Label>
                                        <Form.Control readOnly defaultValue="unNombre" /> 
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default EditEntity;
