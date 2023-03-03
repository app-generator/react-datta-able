import React, { useState, useEffect } from 'react';
import {Button, Col, Row, Form} from 'react-bootstrap';
import { getAllContacts } from '../../../../api/services/contacts';
import { getAllEntities } from '../../../../api/services/entities';
import { getAllNetworks } from '../../../../api/services/networks';
import { validateSpace, validateAlphanumeric  } from '../../../../components/Validator/validators'; 

const FormNetwork = (props) => { 
    // props: ifConfirm children setChildren cidr setCidr domain setDomain active setActive 
    // type setType parent setParent network_entity setNetwork_entity contacts setContacts 
    
    const [contactsOption, setContactsOption] = useState([])
    const [entitiesOption, setEntitiesOption] = useState([])
    const [networks, setNetworks] = useState([])
    const [parentOption, setParentOption] = useState([])
    const [error, setError] = useState(null)

    useEffect(()=> {

        getAllContacts()
            .then((response) => {
                setContactsOption(response.data.results)
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
        
        },[])

/*        const createListCidr = () => {
            if(networks){
                networks.map((net) => {
                    parentOption.push(net.cidr)
                })
            }
        }
*/ 

    const parentOptions = [
        {
            value : '0',
            name : 'Seleccione'
        },
        {
            value : 'internal',
            name : 'www.unaj.com'
        },
        {
            value : 'external',
            name : 'www.unlp.com'
        },
    ]

    return (
        <React.Fragment>
            <Form>
                <Row>
                    <Col sm={12} lg={6}>
                        <Form.Group controlId="Form.Network.Cidr">
                            <Form.Label>Cidr</Form.Label>
                            <Form.Control 
                                type="cidr" 
                                placeholder="Nombre" 
                                maxlength="100"
                                value={props.cidr} 
                                onChange={(e) => props.setCidr(e.target.value)} 
                                />
                        </Form.Group>
                    </Col>
                    <Col sm={12} lg={6}>
                        <Form.Group controlId="Form.Network.Domain">
                            <Form.Label>Domain</Form.Label>
                            <Form.Control 
                                type="domain" 
                                placeholder="Nombre" 
                                maxlength="100"
                                value={props.domain} 
                                onChange={(e) => props.setDomain(e.target.value)} 
                                />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <Form.Group controlId="Form.Network.Type">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control
                                name="type"
                                type="choice"
                                as="select"
                                value={props.type}
                                onChange={(e) =>  props.setType(e.target.value)}>
                                    <option key={1} value='internal'>Interna</option>
                                    <option key={1} value='external'>Externa</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={12} lg={8}>
                        <Form.Group controlId="Form.Network.Children">
                            <Form.Label>Children</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="Form.Network.Parent">
                            <Form.Label>Parent</Form.Label>
                            <Form.Control
                                name="parent"
                                type="choice"
                                as="select"
                                value={props.parent}
                                onChange={(e) => props.setDomain(e.target.value)}>
                                {parentOptions.map((parentItem, index) => {                
                                    return (
                                        <option key={index} value={parentItem.value}>{parentItem.name}</option>
                                    );
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="Form.Network.Entity">
                            <Form.Label>Entity</Form.Label>
                            <Form.Control
                                name="entity"
                                type="choice"
                                as="select"
                                value={props.entity}
                                onChange={(e) => props.setDomain(e.target.value)}>
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
                    <Col>
                        <Form.Group controlId="Form.Network.Contacts">
                            <Form.Label>Contactos Relacionados</Form.Label>
                            <Form.Control
                                name="contacts"
                                type="choice"
                                as="select"
                                value={props.contacts}
                                onChange={(e) => props.setDomain(e.target.value)}>
                                {contactsOption.map((contactsItem, index) => {                
                                    return (
                                        <option key={index} value={contactsItem.value}>{contactsItem.name}</option>
                                    );
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Form.Group>
                        {false
                        
                        ? 
                            <><Button variant="primary" disabled>Guardar</Button></> 
                            : 
                            <><Button variant="primary" onClick={props.ifConfirm} >Guardar</Button></>
                        }
                            <Button variant="primary" href="/network/tables">Cancelar</Button>
                    </Form.Group>
                </Row>
            </Form>
        </React.Fragment>
    );
};
            
export default FormNetwork;
