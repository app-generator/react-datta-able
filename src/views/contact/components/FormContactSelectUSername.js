import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { validateSpace, validateEmail, validateAlphanumeric, validateNumbers, validateURL } from '../../../utils/validators'; 

const FormContactSelectUsername = (props) => { 
    // props: selectedType, contact, setContact, setValidContact
    useEffect( ()=> {
        if(username){
            props.setValidContact(!props.contact || username.condition)
        }
    },[props.contact, props.selectedType]);    
    
    const typeValue = [
        {
            name : 'email',
            placeholder : 'Ingrese email', 
            isInvalid : JSON.parse(!validateSpace(props.contact) || !validateEmail(props.contact)),
            isValid : JSON.parse(validateSpace(props.contact) && validateEmail(props.contact)),
            condition : JSON.parse(validateEmail(props.contact)),
            messageDanger : 'Ingrese un email valido'
            
        },
        {
            name : 'telegram',
            placeholder : 'Ingrese contacto de telegram', 
            isInvalid : JSON.parse(!validateSpace(props.contact) || !validateAlphanumeric(props.contact)),
            isValid : JSON.parse(validateSpace(props.contact) && validateAlphanumeric(props.contact)),
            condition : JSON.parse(validateAlphanumeric(props.contact)),
            messageDanger : 'Ingrese un contacto de telegram valido'
        },
        {
            name : 'phone',
            placeholder : 'Ingrese telefono', 
            isInvalid : JSON.parse(!validateSpace(props.contact) || !validateNumbers(props.contact)),
            isValid : JSON.parse(validateSpace(props.contact) && validateNumbers(props.contact)),
            condition : JSON.parse(validateNumbers(props.contact)),
            messageDanger : 'Ingrese un telefono valido'
        },
        {
            name : 'uri',
            placeholder : 'Ingrese URI', 
            isInvalid : JSON.parse(!validateSpace(props.contact) || !validateURL(props.contact)),
            isValid : JSON.parse(validateSpace(props.contact) && validateURL(props.contact)),
            condition : JSON.parse(validateURL(props.contact)),
            messageDanger : 'Ingrese un URI valido'
        }
    ]
    
    const username = typeValue.find(contact => contact.name === props.selectedType)
    
    
    if(username) {
        return (
            <React.Fragment>

                <Form.Group controlId="Form.Contact.Username">
                    <Form.Label>Contacto</Form.Label>
                    <Form.Control 
                        name = "Form.Contact.Username__username"
                        placeholder = {username.placeholder}
                        value = {props.contact}
                        maxlength="255"
                        onChange = {(e) =>  {props.setContact(e.target.value)}} 
                        isInvalid = {username.isInvalid}
                        isValid = {username.isValid}
                        />
                    {!props.contact || username.condition ? "" : <div className="invalid-feedback"> {username.messageDanger} </div>}
                </Form.Group>
                        
            </React.Fragment>
        );
    }
    else {
        return (
            <React.Fragment>
                <Form.Group controlId="Form.Contact.Username.readOnly">
                    <Form.Label>Contacto</Form.Label>
                    <Form.Control readOnly 
                        placeholder = 'Aun no ha seleccionado el tipo de contacto'
                        name = "username" />
                </Form.Group>
            </React.Fragment>
        );
    }
};
            
export default FormContactSelectUsername;
 