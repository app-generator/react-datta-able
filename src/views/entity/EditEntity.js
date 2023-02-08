import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Breadcrumb, Card, Form, Button } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import { putEntity } from '../../api/services/entities';
import { validateAlphanumeric } from '../user/validators';

const EditEntity = () => {
    const entity = useLocation().state;
    const [name, setName] = useState(entity.name);
    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)
    const [error, setError] = useState(null);

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
    
    const create = (e) => {
        setName(e.target.value)   
    };

    const slugify = (str) => {
        return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '_')
      .replace(/^-+|-+$/g, '')
    }

    //Update
    const editEntity = () => {
        let slug = slugify(name); //backend
        let id = entity.url.split('/')[(entity.url.split('/')).length-2];
        putEntity(id, name, slug, entity.active)
        .then((response) => { 
            console.log(response)
            sessionStorage.setItem('Alerta', JSON.stringify({name:`La entidad ${name} ha sido editada`, type:1}));
            window.location.href = "/entity/tables"
        })
        .catch((error) => {
            setError(error)
            console.log(error)
            setAlert({name:`La entidad ${name} NO ha sido editada`, type:0})
        });    
    };

    return (
        <React.Fragment>          
            <Alert alert={alert} stateAlert={stateAlert} />
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href="./app/dashboard/default"><i className="fas fa-home" /></Breadcrumb.Item>
                    <Breadcrumb.Item active>Entidades</Breadcrumb.Item>
                    <Breadcrumb.Item active>Editar Entidad</Breadcrumb.Item>
                </Breadcrumb>    
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Entidades</Card.Title>
                            <span className="d-block m-t-5">Editar Entidad</span>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={12} >
                                    <Form>                                       
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control 
                                                value={name} 
                                                onChange={create} 
                                                isInvalid={name === '' || !validateAlphanumeric(name)}
                                                isValid={name !== '' && validateAlphanumeric(name)}
                                                type="nombre" 
                                                placeholder="Nombre" 
                                                maxLength="255"/>
                                            {name!=='' ? '' : <div className="invalid-feedback">Ingrese nombre</div>}
                                            {!name || validateAlphanumeric(name) ? "" : <div className="invalid-feedback">Ingrese caracteres validos</div>}
                                        </Form.Group>
                                        {name === '' || !validateAlphanumeric(name) ? 
                                            <><Button variant="primary" disabled>Guardar</Button></> 
                                            : 
                                            <><Button variant="primary" onClick={editEntity} >Guardar</Button></>}
                                        <Button variant="primary" href="/entity/tables">Cancelar</Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default EditEntity;
