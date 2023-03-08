import React, { useState, useEffect } from 'react';
import {Button, Card, CloseButton, Col, Row, Form, Modal} from 'react-bootstrap';
import { getAllContacts } from '../../../../api/services/contacts';
import { getAllEntities } from '../../../../api/services/entities';
import { getAllNetworks } from '../../../../api/services/networks';
import CrudButton from '../../../../components/Button/CrudButton';
import FormContact from '../../../contact/components/Form/FormContact';
import { postContact } from '../../../../api/services/contacts';
import { validateSpace, validateAlphanumeric, validateCidr, validateURL, validateSpaces  } from '../../../../components/Validator/validators'; 
import Alert from '../../../../components/Alert/Alert';

const FormCreateNetwork = (props) => { 
    // props: ifConfirm children setChildren cidr setCidr domain setDomain active setActive 
    // type setType parent setParent network_entity setNetwork_entity contacts setContactss 
    
    const [contactsOption, setContactssOption] = useState([])
    const [entitiesOption, setEntitiesOption] = useState([])
    const [networks, setNetworks] = useState([])
    const [parentOption, setParentOption] = useState(new Set())
    const [error, setError] = useState(null)

    //Create Contact
    const [modalCreate, setModalCreate] = useState(false)
    const [supportedName, setSupportedName] = useState('');
    const [selectRol, setSelectRol] = useState('0');
    const [supportedPriority, setSupportedPriority] = useState('0');
    const [supportedContact, setSupportedContact] = useState('');
    const [supportedKey, setSupportedKey] = useState(null);
    const [selectType, setSelectType] = useState('0');
    const [contactCreated, setContactsCreated ] = useState(null); // si creo se renderiza

    useEffect(()=> {

        getAllContacts()
            .then((response) => {
                setContactssOption(response.data.results)
                console.log(response.data.results)
            })
            .catch((error)=>{
                setError(error)
            })
        
        getAllEntities()
            .then((response) => {
                setEntitiesOption(response.data.results)
                console.log(response.data.results)
            })
            .catch((error)=>{
                setError(error)
            })
    
        getAllNetworks()
            .then((response) => {
                setNetworks(response.data.results)
                console.log(response.data.results)
            })
            .catch((error)=>{
                setError(error)
            })
        
        },[contactCreated])

    const labelRole = {
        technical : 'Tecnico',
        administrative : 'Administrativo',
        abuse : 'Abuso',
        notifications : 'Notificaciones',
        noc : 'NOC',
    };

        console.log(props.cidr)
        console.log(props.domain)
        console.log(props.type)
        console.log(props.parent)
        console.log(props.network_entity)
        console.log(props.contacts)
    

    const editContactList = (event) => {
        if(!props.contacts.includes(event.target.value)){
            props.contacts.push(event.target.value)
        }
        else {
            //props.contacts.filter(contact => contact != event.target.value)
            props.contacts.pop(event.target.value)
        }
        console.log(props.contacts)
    }

    //Create Contact
    const createContact = () => { //refactorizar al FormContact

        postContact (supportedName, supportedContact, supportedKey, selectType, selectRol, supportedPriority)
        .then((response) => { 
            console.log(response)
            //window.location.href = "/contact/tables"
            setContactsCreated(response) //
            setModalCreate(false) //
        })
        .catch((error) => {
            setError(error)
            console.log(error)
        });    
    };

    return (
        <React.Fragment>
            <Alert/>
            <Form>
                <Row>
                    <Col sm={12} lg={12}>
                        <Form.Group controlId="Form.Network.Cidr">
                            <Form.Label>Cidr</Form.Label>
                            <Form.Control 
                                type="cidr" 
                                placeholder="CIDR" 
                                maxlength="18"
                                value={props.cidr} 
                                isValid={ validateCidr(props.cidr) && validateSpace(props.cidr) }
                                isInvalid={ !validateSpace(props.cidr) || !validateCidr(props.cidr) }
                                onChange={(e) => props.setCidr(e.target.value)}
                                />
                            {!props.cidr || validateCidr(props.cidr) ? "" : <div className="invalid-feedback">Ingrese un cidr valido</div>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={12}>
                        <Form.Group controlId="Form.Network.Type">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control
                                name="type"
                                type="choice"
                                as="select"
                                value={props.type}
                                onChange={(e) =>  props.setType(e.target.value)}
                                isInvalid={props.type === '0'}
                                isValid={props.type !== '0'}
                                >
                                    <option key={0} value='0'>Seleccione</option>
                                    <option key={1} value='internal'>Interna</option>
                                    <option key={2} value='external'>Externa</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={12}>
                        <Form.Group controlId="Form.Network.Domain">
                            <Form.Label>Dominio</Form.Label>
                            <Form.Control 
                                type="domain" 
                                placeholder="Dominio" 
                                maxlength="100"
                                value={ props.domain || null} ////////////////////////////
                                onChange={ (e) => props.setDomain(e.target.value) } 
                                isValid={ validateURL(props.domain) || validateSpaces(props.domain) }
                                isInvalid={ !validateSpaces(props.domain) && !validateURL(props.domain) }
                            />
                            { false ? "" : <div className="invalid-feedback">Ingrese un dominio valido</div>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={12}>
                        <Form.Group controlId="Form.Network.Parent">
                            <Form.Label>Red Padre - duplicados</Form.Label>
                            <Form.Control
                                name="parent"
                                type="choice"
                                as="select"
                                value={props.parent}
                                onChange={(e) => props.setParent(e.target.value)}>
                                    <option key={0} value={null}> </option>
                                    {networks.map((net, index) => {   
                                        parentOption.add(net.cidr);
                                        return (
                                            <option key={index} value={net.cidr}>{net.cidr}</option>
                                        )})}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={12}>
                        <Form.Group controlId="Form.Network.Entity">
                            <Form.Label>Entidad Relacionada</Form.Label>
                            <Form.Control
                                name="entity"
                                type="choice"
                                as="select"
                                value={props.entity}
                                onChange={(e) => props.setNetwork_entity(e.target.value)}>
                                    <option key={0} value={null}> </option>
                                    {entitiesOption.map((entityItem, index) => {                
                                        return (
                                            <option key={index} value={entityItem.value}>{entityItem.name}</option>
                                        );
                                    })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={9}>
                        <Form.Group controlId="Form.Network.Contacts">
                            <Form.Label>Contactos Relacionados</Form.Label>
                            <Form.Control
                                multiple 
                                name="contacts"
                                type="choice"
                                as="select"
                                value={props.contacts}
                                onChange={(e) => editContactList(e)}>
                                {contactsOption.map((contactsItem, index) => {                
                                    return (
                                        <option key={index} value={contactsItem.url}>{contactsItem.name + ' (' + labelRole[contactsItem.role] + ') ' + contactsItem.username}</option>
                                    );
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                    <br/>
                    <br/>
                        <CrudButton type='create' name='Contacto' onClick={() => setModalCreate(true)}/>
                        <Button onClick={() => props.setContacts([])}>LImpiar</Button>
                    </Col>
                </Row>
                <Row>
                <Form.Group>
                    { validateCidr(props.cidr) && (validateURL(props.domain) || props.domain === null|| validateSpaces(props.domain)) && 
                    (props.type != '0') && (props.contacts.length > 0) ? // 
                        <><Button variant="primary" onClick={props.ifConfirm } >Guardar</Button></>
                        : 
                        <><Button variant="primary" disabled>Guardar</Button></> 
                    }
                    <Button variant="primary" href="/network/tables">Cancelar</Button>
                    </Form.Group>
                </Row>
            </Form>

            <Modal size='lg' show={modalCreate} onHide={() => setModalCreate(false)} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
                    <Row>    
                        <Col>                 
                            <Card>
                            <Card.Header> 
                                    <Row>
                                        <Col>
                                            <Card.Title as="h5">Contactos</Card.Title>
                                            <span className="d-block m-t-5">Crear contacto</span>
                                        </Col>
                                        <Col sm={12} lg={2}>                       
                                            <CloseButton aria-label='Cerrar' onClick={() => setModalCreate(false)} />
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                <FormContact 
                                    name={supportedName} setName= {setSupportedName} 
                                    role={selectRol} setRole={setSelectRol} 
                                    priority={supportedPriority} setPriority={setSupportedPriority} 
                                    type={selectType} setType={setSelectType} 
                                    contact={supportedContact} setContact={setSupportedContact} 
                                    keypgp={supportedKey} setKey={setSupportedKey} 
                                    ifConfirm={createContact} ifCancel={() => setModalCreate(false)} />
                                </Card.Body>
                            </Card>
                        </Col> 
                    </Row>
                </Modal.Body>
            </Modal>

                                        
        </React.Fragment>
    );
};
            
export default FormCreateNetwork;
