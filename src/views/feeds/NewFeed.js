import React from 'react';
import { Row, Col, Card, Form, Button, Breadcrumb } from 'react-bootstrap';
import FeedState from './components/FeedState';


const NewFeed = () => {
   
    return (
        <React.Fragment>
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href='/app/dhasboard/default'>
                        <i className="fas fa-home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href='/app/feeds'>
                        Fuentes de Informacion
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href='#' active>
                        Nueva 
                    </Breadcrumb.Item>
                </Breadcrumb>    
            </Row>
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
                                    <Form.Control type="text" placeholder="Nombre" />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Descripcion</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Descripcion" />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Estado Inicial</Form.Label>
                                    <FeedState></FeedState>
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

export default NewFeed;
