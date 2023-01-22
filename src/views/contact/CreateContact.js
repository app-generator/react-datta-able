import React, {useState} from 'react';
import { Row, Col, Card, Breadcrumb, Form, Button } from 'react-bootstrap';
import { postContact } from '../../api/services/contacts';

const CreateContact = () => {
    const [supportedName, setSupportedName] = useState('');
    const [selectRol, setSelectRol] = useState('');
    const [supportedPriority, setSupportedPriority] = useState(0);
    const [supportedContact, setSupportedContact] = useState('');
    const [supportedKey, setSupportedKey] = useState('');
    const [selectType, setSelectType] = useState('');
    const [error, setError] = useState(null);

    const editContact = () => {
        postContact (supportedName, supportedContact, supportedKey, selectType, selectRol, `http://localhost:8000/api/administration/priority/${supportedPriority}/`)
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
            sessionStorage.setItem('Alerta', JSON.stringify({name:`El contacto ${supportedName} NO ha sido creado`, type:0}));
        });    
    };

    return (
        <React.Fragment>          
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
                                                isInvalid={supportedPriority == 0}
                                                isValid={supportedPriority !== 0}
                                                onChange={(event) =>  setSupportedPriority(event.target.value)}>
                                                    <option value='0'>Seleccione</option>
                                                    <option value='1'>Critica</option>
                                                    <option value='3'>Alta</option>
                                                    <option value='2'>Media</option>
                                                    <option value='6'>Baja</option>
                                                    <option value='5'>Muy Baja</option>
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
                                    <Button variant="primary" href="/entity/tables">Cancelar</Button>
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