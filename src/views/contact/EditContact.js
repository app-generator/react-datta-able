import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Breadcrumb, Card, Form, Button } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import { putContact } from '../../api/services/contacts';

const EditContact = () => {
    const contact = useLocation().state;
    
    const [supportedName, setSupportedName] = useState(contact.name);
    const [selectRol, setSelectRol] = useState(contact.role);
    const [supportedPriority, setSupportedPriority] = useState(contact.priority);
    const [supportedContact, setSupportedContact] = useState(contact.username);
    const [supportedKey, setSupportedKey] = useState(contact.public_key);
    const [selectType, setSelectType] = useState(contact.type);
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

console.log(contact);

    const editContact = () => {
        let id = contact.url.split('/')[(contact.url.split('/')).length-2];
        putContact (id, supportedName, supportedContact, supportedKey, selectType, selectRol, supportedPriority)
        .then((response) => { 
            console.log(response)
            //setAlert
            sessionStorage.setItem('Alerta', JSON.stringify({name:`El contacto ${supportedName} ha sido editado`, type:1}));
            window.location.href = "/contact/tables"
        })
        .catch((error) => {
            setError(error)
            console.log(error)
            //setAlert
            setAlert({name:`El contacto ${supportedName} NO ha sido editado`, type:0})
        });    
    };

    return (
        <React.Fragment>
            <Alert alert={alert} stateAlert={stateAlert} />
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href="./app/dashboard/default"><i className="feather icon-home" /></Breadcrumb.Item>
                    <Breadcrumb.Item href="./tables"> Contactos</Breadcrumb.Item>
                    <Breadcrumb.Item active><b>Editar Contacto</b></Breadcrumb.Item>
                </Breadcrumb>    
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Contactos</Card.Title>
                            <span className="d-block m-t-5">Editar Contacto</span>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col sm={12} lg={6}>
                                        <Form.Group controlId="Form.Contact.Name">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control
                                                name="name"
                                                type="string"
                                                placeholder="Nombre"
                                                value={supportedName}
                                                isInvalid={supportedName === ''}
                                                isValid={supportedName !== ''}
                                                onChange={(event) =>  setSupportedName(event.target.value)}>
                                            </Form.Control>
                                            {supportedName ? '' : <div className="invalid-feedback">Ingrese nombre</div>}
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="Form.Contact.Rol">
                                            <Form.Label>Rol</Form.Label>
                                            <Form.Control
                                                name="role"
                                                type="choice"
                                                as="select"
                                                value={selectRol}
                                                onChange={(event) =>  setSelectRol(event.target.value)}>
                                                    <option value=''></option>
                                                    <option value='technical'>Tecnico</option>
                                                    <option value='administrative'>Administrativo</option>
                                                    <option value='abuse'>Abuso</option>
                                                    <option value='notifications'>Notificaciones</option>
                                                    <option value='noc'>NOC</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="Form.Contact.Priority" >
                                            <Form.Label>Prioridad</Form.Label>
                                            <Form.Control
                                                name="priority"
                                                type="field"                                            
                                                as="select"
                                                value={supportedPriority}
                                                isInvalid={supportedPriority == ''}
                                                isValid={supportedPriority !== ''}
                                                onChange={(event) =>  setSupportedPriority(event.target.value)}>
                                                    <option value=''>Seleccione</option>
                                                    <option value='http://localhost:8000/api/administration/priority/1/'>Critica</option>
                                                    <option value='http://localhost:8000/api/administration/priority/3/'>Alta</option>
                                                    <option value='http://localhost:8000/api/administration/priority/2/'>Media</option>
                                                    <option value='http://localhost:8000/api/administration/priority/6/'>Baja</option>
                                                    <option value='http://localhost:8000/api/administration/priority/5/'>Muy Baja</option>
                                            </Form.Control>
                                                {supportedPriority ? '' : <div className="invalid-feedback">Seleccione</div>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={3}>
                                        <Form.Group controlId="Form.Contact.Type">
                                            <Form.Label>Tipo</Form.Label>
                                            <Form.Control
                                                name="type"
                                                type="choice"
                                                as="select"
                                                value={selectType}
                                                onChange={(event) =>  setSelectType(event.target.value)}>
                                                    <option value=''></option>
                                                    <option value='email'>Correo Electronico</option>
                                                    <option value='telegram'>Telegram</option>
                                                    <option value='phone'>Teléfono</option>
                                                    <option value='uri'>URI</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="Form.Contact.Username">
                                            <Form.Label>Contacto</Form.Label>
                                            <Form.Control
                                                name="username"
                                                type="string"
                                                placeholder="Contacto"
                                                value={supportedContact}
                                                isInvalid={supportedContact === ''}
                                                isValid={supportedContact !== ''}
                                                onChange={(event) =>  setSupportedContact(event.target.value)} />
                                            {supportedContact ? '' : <div className="invalid-feedback">Ingrese informacion de contacto</div>}                                    
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group>
                                    <Form.Control 
                                        type="string"
                                        placeholder="Llave pública GPG"
                                        value={supportedKey}
                                        onChange={(event) =>  setSupportedKey(event.target.value)} />
                                {((supportedName !== '') && (supportedContact !== '') && (supportedPriority !== '' )) ? 
                                    <><Button variant="primary" onClick={editContact} >Guardar</Button></>
                                    : 
                                    <><Button variant="primary" disabled>Guardar</Button></> }
                                    <Button variant="primary" href="/contact/tables">Cancelar</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default EditContact;