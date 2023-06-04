import React, { useEffect, useState } from 'react';
import {Button, Col, Row, Form} from 'react-bootstrap';
import { validateName, validateContact, validateSelect } from './ValidatorContact'; 
import FormContactSelectUsername from './FormContactSelectUSername';
import { getPriorities } from '../../../api/services/priorities';

const FormCreateContact = (props) => { 
    // props: name, setName, role, setRole, priority, setPriority, type, setType, contact, setContact, keypgp, setKey, ifConfirm, ifCancel
    const [validContact, setValidContact] = useState(false) 
    const [prioritiesOption, setPrioritiesOption] = useState([])
    const [error, setError] = useState(false)

    useEffect(()=> {

        getPriorities()
            .then((response) => {
                setPrioritiesOption(Object.values(response.data.results))
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
                                isValid={validateName(props.name)}
                            />
                            {validateName(props.name) ? '' : <div className="invalid-feedback">Ingrese un nombre que contenga hasta 100 caracteres, letras y/o numeros y que no sea vacio</div>}
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
                                isInvalid={!validateSelect(props.role)}
                                isValid={validateSelect(props.role)}
                                onChange={(e) => props.setRole(e.target.value)}>
                                {roleOptions.map((roleItem, index) => {                
                                    return (
                                        <option key={index} value={roleItem.value}>{roleItem.name}</option>
                                    );
                                })}
                            </Form.Control>
                            {validateSelect(props.role) ? '' : <div className="invalid-feedback">Seleccione el rol</div>}
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
                                isInvalid={!validateSelect(props.priority)}
                                isValid={validateSelect(props.priority)}
                                onChange={(e) =>  props.setPriority(e.target.value)}>
                                <option value=''>Seleccione</option>
                                {prioritiesOption.map((priorityItem, index) => {                
                                    return (
                                        <option key={index} value={priorityItem.url}>{priorityItem.name}</option>
                                    );
                                })}
                            </Form.Control>
                            {validateSelect(props.priority) ? '' : <div className="invalid-feedback">Seleccione la prioridad</div>}
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
                                isInvalid={!validateSelect(props.type)}
                                isValid={validateSelect(props.type)}
                                onChange={(e) =>  props.setType(e.target.value)}>
                                {typeOptions.map((typeItem, index) => {                
                                    return (
                                        <option key={index} value={typeItem.value}>{typeItem.name}</option>
                                    );
                                })}
                            </Form.Control>
                            {validateSelect(props.type) ? '' : <div className="invalid-feedback">Seleccione el tipo de contacto</div>}
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
                    {(validateName(props.name) && validateSelect(props.role) && validateSelect(props.priority) && validateSelect(props.type) && validateContact(props.contact) && (validContact)) ? 
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
