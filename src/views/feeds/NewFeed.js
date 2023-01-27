import React from 'react';
import { Row, Col, Card, Form, Button, Breadcrumb } from 'react-bootstrap';
import DropdownState from './components/DropdownState';
import { useState } from 'react';
import { postFeed } from '../../api/services/feeds';

const NewFeed = () => {

    const[slug, setSlug] = useState ("");
    const [name, setName] = useState("");
    const [active, setActive] = useState(1);
    const [description, setDescription] = useState("");

    const [error, setError] = useState(null);


    const createFeed = (slug, name, description, active)=> {
        postFeed(slug, name, description, active).then((response) => {
            console.log(response);
            window.location.href = '/app/feeds';
        })
        .catch((error) => {
            setError(error);
        })        
    };

    if (error) {
        console.log(error);
        return <p>Ups! Se produjo un error al crear el nuevo feed.</p>
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
                                    <Form.Control type="text" placeholder="Nombre" onChange={(e) => setName(e.target.value)} isInvalid={name === ''} isValid={name !== ''} />
                                    {name ? '' : <div className="invalid-feedback">Ingrese un nombre</div>}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Descripcion</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Descripcion" onChange={(e) => setDescription(e.target.value)} isInvalid={description === ''} isValid={description !== ''} />
                                    {description ? '' : <div className="invalid-feedback">Ingrese una descripcion</div>}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Estado Inicial</Form.Label>
                                    <DropdownState state={active} setActive={setActive}></DropdownState>
                                </Form.Group>                              
                                  
                                <Button variant="success" onClick={()=> createFeed(slug, name, description, active)}>Guardar</Button>
                                <Button variant="info" href='/app/feeds'>Volver</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>                    
            </Row>
        </React.Fragment>
    );
};

export default NewFeed;
