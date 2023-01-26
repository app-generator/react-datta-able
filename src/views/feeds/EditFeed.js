import React from 'react';
import { Row, Col, Card, Form, Button, Breadcrumb } from 'react-bootstrap';
import DropdownState from './components/DropdownState';
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import { putFeed } from '../../api/services/feeds';

const EditFeed = () => {
    const location = useLocation();
    const feed = location.state.feed;

    const[slug, setSlug] = useState (feed.slug);
    const [name, setName] = useState(feed.name);
    const [active, setActive] = useState(feed.active);
    const [description, setDescription] = useState(feed.description);

    const [error, setError] = useState(null);

    const changeFeed = (url, slug, name, description, active)=> {
        putFeed(url, slug, name, description, active).then((response) => {
            console.log(response);
            window.history.back();
        })
        .catch((error) => {
            setError(error);
        })        
    };

    if (error) {
        console.log(error);
        return <p>Ups! Se produjo un error al editar el feed {feed.name}.</p>
      }
    
   
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
                        Modificar 
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
                                    <Form.Control type="text"  defaultValue={feed.name} onChange={(e) => setName(e.target.value)} isInvalid={name === ''} isValid={name !== ''} />
                                    {name ? '' : <div className="invalid-feedback">Ingrese un nombre</div>}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Descripcion</Form.Label>
                                    <Form.Control as="textarea" rows={3} defaultValue={feed.description} onChange={(e) => setDescription(e.target.value)} isInvalid={description === ''} isValid={description !== ''} />
                                    {description ? '' : <div className="invalid-feedback">Ingrese una descripcion</div>}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Estado</Form.Label>
                                    <DropdownState state={feed.active} setActive={setActive}></DropdownState>
                                </Form.Group>
                              
                                  
                                <Button variant="success" onClick={()=> changeFeed(feed.url, slug, name, description, active)}>Guardar</Button>
                                <Button variant="info" href='/app/feeds'>Volver</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>                    
            </Row>
        </React.Fragment>
    );
};

export default EditFeed;
