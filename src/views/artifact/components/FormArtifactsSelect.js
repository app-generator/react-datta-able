import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { validateSpace, validateEmail, validateURL, validateIP, validateAutonomousSystem, 
    validateUserAgent,validateFQDN, validateDomain, validateHexadecimal32, 
    validateHexadecimal40, validateHexadecimal64, validateHexadecimal128 } from '../../../utils/validators'; 

const FormArtifactsSelect = (props) => {
   // props: selectedType,.value, setContact, setValidContact
   useEffect( ()=> {
        if(username){
            props.setValidArtifact(!props.contact || username.condition)
        }
    },[props.value, props.type]);    
        const typeValue = [
            {
                name : 'mail',
                placeholder : 'Ingrese email', 
                isInvalid : JSON.parse(!validateSpace(props.value) || !validateEmail(props.value)),
                condition : JSON.parse(validateEmail(props.value)),
                messageDanger : 'Ingrese un email valido'
                
            },
            {
                name : 'domain',
                placeholder : 'Ingrese dominio', 
                isInvalid : JSON.parse(!validateSpace(props.value) || !validateDomain(props.value)),
                condition :"",
                messageDanger : 'Ingrese un dominio valido'
            },//cual es la diferencia entre estos 2 dominio y url
            {
                name : 'url',
                placeholder : 'Ingrese URI', 
                isInvalid : JSON.parse(!validateSpace(props.value) ),
                condition :"",
                messageDanger : 'Ingrese un URL valido'
            }
            ,
            {
                name : 'ip',
                placeholder : 'Ingrese IP', 
                isInvalid : JSON.parse(!validateSpace(props.value) || !validateIP(props.value)),
                condition : JSON.parse(validateIP(props.value)),
                messageDanger : 'Ingrese una ip valida'
            },
            {
                name : 'autonomous-system',
                placeholder : 'Ingrese Número de Sistema Autónomo', 
                isInvalid : JSON.parse(!validateSpace(props.value) || !validateAutonomousSystem(props.value)),
                condition : JSON.parse(validateAutonomousSystem(props.value)),
                messageDanger : 'Ingrese un número de Sistema Autónomo valido'
            },// preguntar si este validador esta bien
            {
                name : 'user-agent',
                placeholder : 'Ingrese user-agent', 
                isInvalid : JSON.parse(!validateSpace(props.value) || !validateUserAgent(props.value)),
                condition : JSON.parse(validateUserAgent(props.value)),
                messageDanger : 'Ingrese un user-agent valido'
            }
            ,
            {
                name : 'fqdn',
                placeholder : 'Ingrese fqdn', 
                isInvalid : JSON.parse(!validateSpace(props.value) || !validateDomain(props.value)),
                condition : JSON.parse(validateDomain(props.value)),
                messageDanger : 'Ingrese un fqdn valido'
            }
            ,
            {
                name : 'other',
                placeholder : 'Ingrese Otro tipo de dato', 
                isInvalid : JSON.parse(!validateSpace(props.value)),
                condition : "",
                messageDanger : 'Ingrese un URI valido'
            },
            {
                name : 'hash',
                placeholder : 'Ingrese un valor hexadecimal de 32 caracteres', 
                isInvalid : JSON.parse(!validateSpace(props.value) || (!validateHexadecimal32(props.value)&& !validateHexadecimal40(props.value) 
                                        && !validateHexadecimal64(props.value) && !validateHexadecimal128(props.value))),
                condition : JSON.parse(validateHexadecimal32(props.value) || validateHexadecimal40(props.value) 
                                        || validateHexadecimal64(props.value) || validateHexadecimal128(props.value)),
                messageDanger : 'Ingrese un hash de 32 valido'
            }
        ]
        
        const username = typeValue.find(t => t.name === props.type)
        
        
        if(username) {
            return (
                <React.Fragment>
    
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control 
                            
                            placeholder = {username.placeholder}
                            value = {props.value}
                            maxlength="255"
                            onChange = {(e) =>  {props.setValue(e.target.value)}} 
                            isInvalid = {username.isInvalid}
                            />
                        
                        {!props.value || username.condition ? "" : <div className="invalid-feedback"> {username.messageDanger} </div>}
                    </Form.Group>
                   
    
                            
                </React.Fragment>
            );
        }
        else {
            return (
                <React.Fragment>
                    <Form.Group controlId="Form.Contact.Username.readOnly">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control readOnly 
                            placeholder = 'Aun no ha seleccionado el tipo de contacto'
                            name = "username" />
                    </Form.Group>
                </React.Fragment>
            );
        }
    };

export default FormArtifactsSelect