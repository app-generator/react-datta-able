import React, { useState, useEffect } from 'react';
import { Row, Col, Card,Breadcrumb, Form, Button } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import { postContact } from '../../api/services/contacts';

const CreateContact = () => {
    const [supportedName, setSupportedName] = useState('');
    const [selectRol, setSelectRol] = useState('');
    const [supportedPriority, setSupportedPriority] = useState('0');
    const [supportedContact, setSupportedContact] = useState('');
    const [supportedKey, setSupportedKey] = useState('');
    const [selectType, setSelectType] = useState('');
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

    const getPrioridades = {
        "count": 5,
        "next": null,
        "previous": null,
        "results": [
            {
                "url": "http://localhost:8000/api/administration/priority/1/",
                "color": "#FFFFFF",
                "created": "2019-03-22T16:24:33Z",
                "modified": "2022-05-27T20:03:30.447000Z",
                "name": "Critical",
                "severity": 1,
                "attend_time": "00:00:00",
                "solve_time": "01:00:00",
                "attend_deadline": "00:01:00",
                "solve_deadline": "2 00:00:00",
                "notification_amount": 3
            },
            {
                "url": "http://localhost:8000/api/administration/priority/3/",
                "color": "#FFFFFF",
                "created": "2019-03-22T16:24:33Z",
                "modified": "2022-04-09T00:26:44.802000Z",
                "name": "High",
                "severity": 2,
                "attend_time": "00:10:00",
                "solve_time": "04:00:00",
                "attend_deadline": "03:00:00",
                "solve_deadline": "2 00:00:00",
                "notification_amount": 3
            },
            {
                "url": "http://localhost:8000/api/administration/priority/2/",
                "color": "#FFFFFF",
                "created": "2019-03-22T16:24:33Z",
                "modified": "2022-04-09T00:26:25.310000Z",
                "name": "Medium",
                "severity": 3,
                "attend_time": "01:00:00",
                "solve_time": "08:00:00",
                "attend_deadline": "07:00:00",
                "solve_deadline": "2 00:00:00",
                "notification_amount": 3
            },
            {
                "url": "http://localhost:8000/api/administration/priority/6/",
                "color": "#FFFFFF",
                "created": "2019-03-22T16:24:33Z",
                "modified": "2022-04-09T00:33:40.089000Z",
                "name": "Low",
                "severity": 4,
                "attend_time": "04:00:00",
                "solve_time": "2 00:00:00",
                "attend_deadline": "1 00:00:00",
                "solve_deadline": "2 00:00:00",
                "notification_amount": 3
            },
            {
                "url": "http://localhost:8000/api/administration/priority/5/",
                "color": "#FFFFFF",
                "created": "2019-03-22T16:24:33Z",
                "modified": "2022-04-09T00:19:17.743000Z",
                "name": "Very Low",
                "severity": 5,
                "attend_time": "1 00:00:00",
                "solve_time": "7 00:00:00",
                "attend_deadline": "1 00:00:00",
                "solve_deadline": "2 00:00:00",
                "notification_amount": 3
            }
        ]
    };

    const createContact = () => {
        postContact (supportedName, supportedContact, supportedKey, selectType, selectRol, supportedPriority)
        .then((response) => { 
            console.log(response)
            //setAlert
            sessionStorage.setItem('Alerta', JSON.stringify({name:`El contacto ${supportedName} ha sido creado.`, type:1}));
            window.location.href = "/contact/tables"
        })
        .catch((error) => {
            setError(error)
            console.log(error)
            //setAlert
            setAlert({name:`El contacto ${supportedName} NO ha sido creado`, type:0})
        });    
    };

    return (
        <React.Fragment>
            <Alert alert={alert} stateAlert={stateAlert} />
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href="./app/dashboard/default"><i className="feather icon-home" /></Breadcrumb.Item>
                    <Breadcrumb.Item href="./tables"> Contactos</Breadcrumb.Item>
                    <Breadcrumb.Item active><b>Crear Contacto</b></Breadcrumb.Item>
                </Breadcrumb>    
            </Row>
            <Row>
                <Col sm={12}>                   
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Contactos</Card.Title>
                            <span className="d-block m-t-5">Agregar Contacto</span>
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
                                                isInvalid={supportedPriority == '0'}
                                                isValid={supportedPriority !== '0'}
                                                onChange={(event) =>  setSupportedPriority(event.target.value)}>
                                                <option value='0'>Seleccione</option>
                                                {getPrioridades.results.map((prioridad) => {                
                                                    return (
                                                        <option value={prioridad.url}>{prioridad.name}</option>
                                                    );
                                                })}
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
                                    <><Button variant="primary" onClick={createContact} >Guardar</Button></>
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

export default CreateContact;