import React, { useState, useEffect } from 'react';
import { Row, Col, Card, } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import Alert from '../../components/Alert/Alert';
import { putFeed } from '../../api/services/feeds';
import Navigation from '../../components/Navigation/Navigation';
import FormFeed from './components/FormFeed'
import { getFeed } from '../../api/services/feeds';


const EditFeed = () => {
    const location = useLocation();
    const fromState = location.state;
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [active, setActive] = useState(true);
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {                
        getFeed(fromState.url).then((response) => {
            setUrl(response.data.url)
            setName(response.data.name)
            setActive(response.data.active)
            setDescription(response.data.description)
            console.log(response.data)
        })
        .catch((error)=>{
            setError(error)
        })
        .finally(() => {

        })
    }, []);

    const editFeed = ()=> {
        putFeed(url, name, description, active)
        .then(() => {
            window.location.href = '/feeds';
        })
        .catch((error) => {
            setShowAlert(true) 
            setError(error);           
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
                <Navigation actualPosition="Editar fuente de información" path="/feeds" index ="Fuentes de Información"/> 
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Fuente de Informacion</Card.Title>
                        </Card.Header>
                        <Card.Body>
                        <FormFeed  name={name} setName={setName} active={active} setActive={setActive} description={description} setDescription={setDescription} createFeed={editFeed}/>
                        </Card.Body>
                    </Card>
                </Col>                    
            </Row>
        </React.Fragment>
    );
};

export default EditFeed;
