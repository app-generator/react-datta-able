import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Breadcrumb, Card, Form, Button } from 'react-bootstrap';
import { putEntity } from '../../api/services/entities';


const EditEntity = () => {
    const entity = useLocation().state;
    const [name, setName] = useState(entity.name);
    const [error, setError] = useState(null);

    console.log(entity);

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

    const editEntity = () => {
        let slug = slugify(name);
        let id = entity.url.split('/')[(entity.url.split('/')).length-2];
        putEntity(id, name, slug, entity.active)
        .then((response) => { 
            console.log(response)
            //setAlert
            sessionStorage.setItem('Alerta', JSON.stringify({name:`La entidad ${name} ha sido editada`, type:1}));
            window.location.href = "/entity/tables"
        })
        .catch((error) => {
            setError(error)
            console.log(error)
            //setAlert
            sessionStorage.setItem('Alerta', JSON.stringify({name:`La entidad ${name} NO ha sido editada`, type:0}));
        });    
    };

    return (
        <React.Fragment>          
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href="./app/dashboard/default"><i className="feather icon-home" /></Breadcrumb.Item>
                    <Breadcrumb.Item href="./tables"> Entidades</Breadcrumb.Item>
                    <Breadcrumb.Item active><b>Editar Entidad</b></Breadcrumb.Item>
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
                                                isInvalid={name === ''}
                                                isValid={name !== ''} 
                                                type="nombre" 
                                                placeholder="Nombre" />
                                            {name ? '' : <div className="invalid-feedback">Ingrese nombre</div>}
                                        </Form.Group>
                                        {name === '' ? 
                                            <><Button variant="primary" onClick={editEntity} disabled>Guardar</Button></> 
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
