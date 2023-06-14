import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { validateContactMail, validateContactTelegram, validateContactPhone, validateContactURI } from '../../../utils/validators/contact'; 

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
            isInvalid : JSON.parse(!validateContactMail(props.contact)),
            isValid : JSON.parse(validateContactMail(props.contact)),
            condition : JSON.parse(validateContactMail(props.contact)),
            messageDanger : 'Ingrese un email valido'
            
        },
        {
            name : 'telegram',
            placeholder : 'Ingrese contacto de telegram', 
            isInvalid : JSON.parse(!validateContactTelegram(props.contact)),
            isValid : JSON.parse(validateContactTelegram(props.contact)),
            condition : JSON.parse(validateContactTelegram(props.contact)),
            messageDanger : 'Ingrese un contacto de telegram valido'
        },
        {
            name : 'phone',
            placeholder : 'Ingrese telefono', 
            isInvalid : JSON.parse(!validateContactPhone(props.contact)),
            isValid : JSON.parse(validateContactPhone(props.contact)),
            condition : JSON.parse(validateContactPhone(props.contact)),
            messageDanger : 'Ingrese un telefono valido'
        },
        {
            name : 'uri',
            placeholder : 'Ingrese URI', 
            isInvalid : JSON.parse(!validateContactURI(props.contact)),
            isValid : JSON.parse(validateContactURI(props.contact)),
            condition : JSON.parse(validateContactURI(props.contact)),
            messageDanger : 'Ingrese un URI valido'
        }
    ]
    
    const username = typeValue.find(contact => contact.name === props.selectedType)
    
    
    if(username) {
        return (
            <React.Fragment>

                <Form.Group controlId="Form.Contact.Username">
                    <Form.Label>Contacto <b style={{color:"red"}}>*</b></Form.Label>
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
                    <Form.Label>Contacto <b style={{color:"red"}}>*</b></Form.Label>
                    <Form.Control readOnly 
                        placeholder = 'Aun no ha seleccionado el tipo de contacto'
                        name = "username" />
                </Form.Group>
            </React.Fragment>
        );
    }
};
            
export default FormContactSelectUsername;
 