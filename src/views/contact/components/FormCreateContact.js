import React, { useEffect, useState } from 'react';
import {Button, Col, Row, Form} from 'react-bootstrap';
import { validateName, validateContact, validateSelect } from '../../../utils/validators/contact'; 
import FormContactSelectUsername from './FormContactSelectUSername';
import { getAllPriorities } from '../../../api/services/priorities';

const FormCreateContact = (props) => { 
    // props: name, setName, role, setRole, priority, setPriority, type, setType, contact, setContact, keypgp, setKey, ifConfirm, ifCancel
    const [validContact, setValidContact] = useState(false) 
    const [prioritiesOption, setPrioritiesOption] = useState([])
    const [error, setError] = useState(false)

    useEffect(()=> {

        getAllPriorities()
            .then((response) => {
                setPrioritiesOption(Object.values(response))
                console.log(response.data.results)
            })
            .catch((error)=>{
                setError(error)
            })

        },[])
    
    const roleOptions = [
        {
            value : '',
            name : 'Seleccione'
        },
        {
            value : 'technical',
            name : 'Tecnico'
        },
        {
            value : 'administrative',
            name : 'Administrativo'
        },
        {
            value : 'abuse',
            name : 'Abuso'
        },
        {
            value : 'notifications',
            name : 'Notificaciones'
        },
        {
            value : 'noc',
            name : 'NOC'
        },
    ]

    const typeOptions = [
        {
            value : '',
            name : 'Seleccione'
        },
        {
            value : 'email',
            name : 'Correo Electronico'
        },
        {
            value : 'telegram',
            name : 'Telegram'
        },
        {
            value : 'phone',
            name : 'Telefono'
        },
        {
            value : 'uri',
            name : 'URI'
        },
    ]

    return (
        <React.Fragment>
            <Form>
                <Row>
                    <Col sm={12} lg={4}>
                        <Form.Group controlId="Form.Contact.Name">
                            <Form.Label>Nombre <b style={{color:"red"}}>*</b></Form.Label>
                            <Form.Control 
                                type="nombre" 
                                placeholder="Nombre" 
                                maxlength="100"
                                value={props.name} 
                                onChange={(e) => props.setName(e.target.value)} 
                                isInvalid={!validateName(props.name)}                                
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={12} lg={4}>
                        <Form.Group controlId="Form.Contact.Rol">
                            <Form.Label>Rol <b style={{color:"red"}}>*</b></Form.Label>
                            <Form.Control
                                name="role"
                                type="choice"
                                as="select"
                                value={props.role}                            
                                onChange={(e) => props.setRole(e.target.value)}>
                                {roleOptions.map((roleItem, index) => {                
                                    return (
                                        <option key={index} value={roleItem.value}>{roleItem.name}</option>
                                    );
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={12} lg={4}>
                        <Form.Group controlId="Form.Contact.Priority" >
                            <Form.Label>Prioridad <b style={{color:"red"}}>*</b></Form.Label>
                            <Form.Control
                                name="priority"
                                type="choice"                                            
                                as="select"
                                value={props.priority}                             
                                onChange={(e) =>  props.setPriority(e.target.value)}>
                                <option value=''>Seleccione</option>
                                {prioritiesOption.map((priorityItem, index) => {                
                                    return (
                                        <option key={index} value={priorityItem.url}>{priorityItem.name}</option>
                                    );
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <Form.Group controlId="Form.Contact.Type">
                            <Form.Label>Tipo <b style={{color:"red"}}>*</b></Form.Label>
                            <Form.Control
                                name="type"
                                type="choice"
                                as="select"
                                value={props.type}                               
                                onChange={(e) =>  props.setType(e.target.value)}>
                                {typeOptions.map((typeItem, index) => {                
                                    return (
                                        <option key={index} value={typeItem.value}>{typeItem.name}</option>
                                    );
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col lg={8}>
                        <FormContactSelectUsername selectedType={props.type} 
                            contact={props.contact} setContact={props.setContact}
                            setValidContact={setValidContact} />
                    </Col>
                </Row>
                <Form.Group controlId="Form.Contact.Key">
                    <Form.Label>Clave publica</Form.Label>
                    <Form.Control 
                        type="string"
                        placeholder="Llave pública PGP"
                        value={props.keypgp}
                        maxlength="100"
                        onChange = {(e) =>  {props.setKey(e.target.value)}} />
                </Form.Group>
                <Form.Group>
                    {props.name !== ""&& (validateName(props.name) && validateSelect(props.role) && validateSelect(props.priority) && validateSelect(props.type) && validateContact(props.contact) && (validContact)) ? 
                        <><Button variant="primary" onClick={props.ifConfirm} >Guardar</Button></>
                        : 
                        <><Button variant="primary" disabled>Guardar</Button></>                         
                    }
                        <Button variant="primary" onClick={props.ifCancel}>Cancelar</Button>
                </Form.Group>
            </Form>
        </React.Fragment>
    );
};
            
export default FormCreateContact;
