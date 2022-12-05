import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';


const FormsElements = () => {
   
    return (
        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Fuente de Informacion</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>                                
                                <Form.Group as={Col}>
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" placeholder="Abusix" />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Descripcion</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Reportes relacionados  con SPAM de https://abusix.com" />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Activo</Form.Label>
                                    <Button className="btn-icon btn-rounded" variant={'outline-success'} >
                                        <i className='feather icon-check mx-1'/>
                                    </Button>
                                </Form.Group>
                              
                                  
                                <Button variant="primary">Guardar</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>                    
            </Row>
        </React.Fragment>
    );
};

export default FormsElements;
