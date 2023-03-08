import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/navigation/navigation';

const CreateTask = () => {

   
    return (
    <React.Fragment>
        <Row>
            <Navigation actualPosition="Crear Tarea" path="/task/tables" index ="Tarea"/>
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Header>

                    </Card.Header>
                    <Card.Body>

                    </Card.Body>
                    <Card.Footer >

                    </Card.Footer>
                </Card>
                <Alert/>
            </Col>
        </Row>
    </React.Fragment>
)}

export default CreateTask; 
