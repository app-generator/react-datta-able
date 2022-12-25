import React from 'react';
import { Row, Col, Card, Form, Breadcrumb } from 'react-bootstrap';


const ViewFeed = () => {
   
    return (
        <React.Fragment>
            <Row>
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href='/app/dhasboard/default'>
                        <i className="fas fa-home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href='/app/feeds'>
                        Fuentes de Informacion
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href='#' active>
                        Vista 
                    </Breadcrumb.Item>
                </Breadcrumb>    
            </Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Fuente de Informacion</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>                                
                                <Form.Group as={Col}>
                                    <Form.Label>Id del sitema</Form.Label>
                                    <Form.Control type="text" placeholder="abusix" disabled readOnly />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" placeholder="Abusix" disabled readOnly />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Descripcion</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Reportes relacionados  con SPAM de https://abusix.com" disabled readOnly />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Creado el</Form.Label>
                                    <Form.Control type="text" placeholder="2019-03-22T16:21:24Z" disabled readOnly />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Ultima modificacion</Form.Label>
                                    <Form.Control type="text" placeholder="2019-03-22T16:21:24Z" disabled readOnly />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Control type="text" placeholder="Activo" disabled readOnly />
                                </Form.Group>                            
                                
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>                    
            </Row>
        </React.Fragment>
    );
};

export default ViewFeed;