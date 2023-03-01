import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Breadcrumb, Card, Button } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';

const EditNetwork = () => {
    const network = useLocation().state;
    console.log(network);
    
    return (
        <React.Fragment>
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href="./app/dashboard/default"><i className="fas fa-home" /></Breadcrumb.Item>
                    <Breadcrumb.Item active>Redes</Breadcrumb.Item>
                    <Breadcrumb.Item active>Editar Red</Breadcrumb.Item>
                </Breadcrumb> 
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Redes</Card.Title>
                            <span className="d-block m-t-5">Editar Red</span>
                        </Card.Header>
                        <Card.Body>
                         <p> EDITAR </p>
                         <Button variant="primary" href="/network/tables">Cancelar</Button>
                        </Card.Body>
                    </Card>
                    <Alert/>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default EditNetwork;