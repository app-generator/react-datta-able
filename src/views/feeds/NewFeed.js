import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Breadcrumb } from 'react-bootstrap';
import DropdownState from './components/DropdownState';
import { postFeed } from '../../api/services/feeds';
import Alert from '../../components/Alert/Alert';

const NewFeed = () => {

    const[slug, setSlug] = useState ("");
    const [name, setName] = useState("");
    const [active, setActive] = useState(1);
    const [description, setDescription] = useState("");

    const [error, setError] = useState(null);

    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)

    useEffect( ()=> {
        if(sessionStorage.getItem('Alerta')) {
            const storage = JSON.parse(sessionStorage.getItem('Alerta'));
            setAlert(storage)
                setTimeout(() => {
                    setAlert(null)
                    setStateAlert(null)
                    sessionStorage.removeItem('Alerta')
                }, 5000);
        }
    },[]);


    const createFeed = ()=> {
        postFeed(slug, name, description, active).then((response) => {
            console.log(response);
            sessionStorage.setItem('Alerta', JSON.stringify({name:`La fuente de informacion ${name} ha sido creada`, type:1}));
            window.location.href = '/app/feeds';
        })
        .catch((error) => {
            setError(error);
            if (error) {
                setAlert({name:`La fuente de informacion ${name} NO ha sido creada`, type:0})
            }
        })        
    };
    
    return (
        <React.Fragment>
            <Alert alert={alert} stateAlert={stateAlert} />
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href='/app/dhasboard/default'>
                        <i className="fas fa-home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href='/app/feeds'>
                        Fuentes de Informacion
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href='#' active>
                        <b>Crear fuente de informacion</b> 
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

                                { name === '' || description === '' ?
                                    <Button variant="primary" disabled>Guardar</Button>
                                    :
                                    <Button variant="primary" onClick={createFeed}>Guardar</Button>
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

export default NewFeed;
