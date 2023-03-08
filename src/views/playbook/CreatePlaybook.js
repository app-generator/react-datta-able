import React from 'react';
import { Card, Col, Row } from 'react-bootstrap'; 
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/navigation/navigation';

const CreatePlaybook = () => {

   
    return (
    <React.Fragment>
        <Row>
            <Navigation actualPosition="Agregar Playbook" path="/playbook/tables" index ="Playbook"/>
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

export default CreatePlaybook; 
