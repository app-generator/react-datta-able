import React, {useState} from 'react';
import { Row, Col, Card, Breadcrumb, Form, Button, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CreateContact = () => {
    const [supportedSelect, setSupportedSelect] = useState(0);
    const [supportedName, setSupportedName] = useState('');
    const [selectRol, setSelectRol] = useState('');
    const [supportedContact, setSupportedContact] = useState('');
    const [selectType, setSelectType] = useState(0);
  
    const [accordionKey, setAccordionKey] = useState(1);

    return (
        <React.Fragment>          
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href="./app/dashboard/default">
                        <i className="feather icon-home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="./tables">
                        <i className="feather icon-sidebar" /> Contactos
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <b>Crear Contacto</b>
                    </Breadcrumb.Item>
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
                                                type="string"
                                                placeholder="Nombre"
                                                required
                                                value={supportedName}
                                                isInvalid={supportedName === ''}
                                                isValid={supportedName !== ''}
                                                onChange={(event) => setSupportedName(event.target.value)}>
                                            </Form.Control>
                                            {supportedName ? '' : <div className="invalid-feedback">Ingrese nombre</div>}
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="Form.Contact.Rol">
                                            <Form.Label>Rol</Form.Label>
                                            <Form.Control
                                            type="choice"
                                            as="select"
                                            required
                                            value={selectRol}
                                            onChange={(event) => setSelectRol(event.target.value)}>
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
                                                type="field"                                            
                                                as="select"
                                                required
                                                value={supportedSelect}
                                                isInvalid={supportedSelect === 0}
                                                isValid={supportedSelect !== 0}
                                                onChange={(event) => setSupportedSelect(parseInt(event.target.value))}>
                                                    <option value={0}>Seleccione</option>
                                                    <option value={1}>Critica</option>
                                                    <option value={3}>Alta</option>
                                                    <option value={2}>Media</option>
                                                    <option value={6}>Baja</option>
                                                    <option value={5}>Muy Baja</option>
                                            </Form.Control>
                                                {supportedSelect ? '' : <div className="invalid-feedback">Seleccione</div>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={3}>
                                        <Form.Group controlId="Form.Contact.Type">
                                            <Form.Label>Tipo</Form.Label>
                                            <Form.Control
                                                type="choice"
                                                as="select"
                                                value={selectType}
                                                onChange={(event) => setSelectType(event.target.value)}>
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
                                                type="string"
                                                placeholder="Contacto"
                                                required
                                                value={supportedContact}
                                                isInvalid={supportedContact === ''}
                                                isValid={supportedContact !== ''}
                                                onChange={(event) => setSupportedContact(event.target.value)}>
                                            </Form.Control>
                                            {supportedContact ? '' : <div className="invalid-feedback">Ingrese informacion de contacto</div>}                                    
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group>
                                    <Form.Control type="string" placeholder="Llave pública GPG" />
                                </Form.Group>                              

                                <Card className="mt-2">
                                    <Card.Header>
                                        <Card.Title as="h5">
                                            <Link
                                                to="#"
                                                onClick={() => setAccordionKey(accordionKey !== 1 ? 1 : 0)}
                                                aria-controls="accordion1"
                                                aria-expanded={accordionKey === 1}>
                                                Contacto
                                            </Link>
                                        </Card.Title>
                                    </Card.Header>
                                    <Collapse in={accordionKey === 1}>
                                        <div id="accordion1">
                                            <Card.Body>
                                                <Card.Text>
                                                    Algo
                                                </Card.Text>
                                            </Card.Body>
                                        </div>
                                    </Collapse>
                                </Card>

                                <Button variant="primary">Guardar</Button>
                                <Button variant="primary" href="/contact/tables">Cancelar</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CreateContact;