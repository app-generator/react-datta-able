import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { postFeed } from '../../api/services/feeds';
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/Navigation/Navigation'
import FormFeed from './components/FormFeed'

const CreateFeed = () => {    
    const [name, setName] = useState("");
    const [active, setActive] = useState(true);
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false)
   
    const createFeed = ()=> {
        postFeed(name, description, active)
        .then(() => {
            window.location.href = '/feeds';
        })
        .catch((error) => {
            setError(error); 
            setShowAlert(true)            
        })  
        .finally(() => {
            setShowAlert(true) 
        })      
    };

    const resetShowAlert = () => {
        setShowAlert(false);
    }    
    
    return (
        <React.Fragment>
            <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>
            <Row>
                <Navigation actualPosition="Agregar fuente de información" path="/feeds" index ="Fuentes de Información"/>
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Fuente de Informacion</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <FormFeed  name={name} setName={setName} active={active} setActive={setActive} description={description} setDescription={setDescription} createFeed={createFeed}/>
                        </Card.Body>
                    </Card>
                </Col>                    
            </Row>
        </React.Fragment>
    );
};

export default CreateFeed;
