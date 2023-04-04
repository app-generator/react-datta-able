import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Breadcrumb } from 'react-bootstrap';
import DropdownState from '../../components/Dropdown/DropdownState'
import { useLocation } from "react-router-dom";
import Alert from '../../components/Alert/Alert';
import { putFeed } from '../../api/services/feeds';
import { validateName, validateDescription } from './components/ValidatorFeed';
import Navigation from '../../components/Navigation/Navigation';


const EditFeed = () => {
    const location = useLocation();
    const feed = location.state.feed;       
    const [name, setName] = useState(feed.name);
    const [active, setActive] = useState(feed.active);
    const [description, setDescription] = useState(feed.description);
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false)

    
    const editFeed = ()=> {
        putFeed(feed.url, name, description, active)
        .then(() => {
            window.location.href = '/app/feeds';
        })
        .catch((error) => {
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
                <Navigation actualPosition="Editar fuente de información" path="/app/feeds" index ="Fuentes de Información"/> 
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
                                    <Form.Control type="text"  defaultValue={feed.name} onChange={(e) => setName(e.target.value)} isValid={validateName(name)} isInvalid={!validateName(name)} />
                                    {validateName(name) ? '' : <div className="invalid-feedback">Ingrese un nombre que contenga hasta 100 caracteres, solo letras y que no sea vacio</div>}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Descripcion</Form.Label>
                                    <Form.Control as="textarea" rows={3} defaultValue={feed.description} onChange={(e) => setDescription(e.target.value)} isValid={validateDescription(description)} isInvalid={!validateDescription(description)} />
                                    {validateDescription(description) ? '' : <div className="invalid-feedback">Ingrese una descripcion que contenga hasta 250 caracteres y que no sea vacía</div>}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Estado</Form.Label>
                                    <DropdownState state={feed.active} setActive={setActive}></DropdownState>
                                </Form.Group>                             
                                  
                                { validateName(name) && validateDescription(description) ?
                                    <Button variant="primary" onClick={editFeed}>Guardar</Button>
                                    :
                                    <Button variant="primary" disabled>Guardar</Button>
                                    
                                }
                                
                                <Button variant="info" href='/app/feeds'>Cancelar</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>                    
            </Row>
        </React.Fragment>
    );
};

export default EditFeed;
