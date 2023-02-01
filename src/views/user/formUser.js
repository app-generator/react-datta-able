import React from 'react'
import {fieldFullName, fieldPriority, fieldEmail, FieldUsername, activateBooton} from './fieldsForm'
import { validateEmail,validateFieldText,validateUsername} from './validators';
import { Form } from 'react-bootstrap';

const formUser= (body, setBody) =>{
  return (
      <Form>
        <Form.Group controlId="formGridAddress1">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control 
                placeholder="Ingrese el nombre del usuario" 
                maxlength="150" 
                value ={body.username} 
                name="username" 
                isInvalid={body.username === ''|| !validateUsername(body.username)}
                isValid={body.username !== ''} onChange={(e)=>FieldUsername(e, setBody, body)}/>
                {body.username  ? '' : <div className="invalid-feedback">   Ingrese un nombre de usuario</div>}
            {validateUsername(body.username)  ? "" : <div className="invalid-feedback"> Solo se permiten letras, numeros y los cateacteres especiales '@', '.' , '+', '-', '_' </div>}
        </Form.Group>

        <Form.Group controlId="formGridAddress1">
            <Form.Label>Nombre/s</Form.Label>
            <Form.Control 
                placeholder="Ingrese el nombre/s" 
                maxlength="150" 
                name="first_name"
                onChange={(e)=>fieldFullName(e, setBody, body)} 
                isInvalid={body.first_name !== "" && !validateFieldText(body.first_name)}/>
            {validateFieldText(body.first_name) ? "" : <div className="invalid-feedback">   Ingrese caracteres validos</div>}
        </Form.Group>

        <Form.Group controlId="formGridAddress1">
            <Form.Label>Apellido</Form.Label>
            <Form.Control 
                placeholder="Ingrese el apellido" 
                maxlength="150" 
                name="last_name" 
                onChange={(e)=>fieldFullName(e, setBody, body)} 
                isInvalid={body.last_name !== "" && !validateFieldText(body.last_name)}/>
            {validateFieldText(body.last_name) ? ""  : <div className="invalid-feedback">   Ingrese caracteres validos</div>}
        </Form.Group>
        

        <Form.Group controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control  
                placeholder="Ingrese el Email" 
                maxlength="254"  name="email" 
                onChange={(e)=>fieldEmail(e, setBody, body)} 
                isInvalid={body.email !== "" && !validateEmail(body.email)}/>
            {validateEmail(body.email) ? ""  : <div className="invalid-feedback">   Ingrese un email valido</div>}
        </Form.Group>
        
        <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Prioridad</Form.Label>
                <Form.Control as="select" name="priority" onChange={(e)=>fieldPriority(e, setBody, body)} isInvalid={body.priority === "-1"}
                        isValid={body.priority !== "-1"}>
                    
                    <option value="-1">Seleccione una prioridad</option>
                    <option value="1"> Critico </option>
                    <option value="2"> Alta </option>
                    <option value="3"> Media </option>
                    <option value="4"> Baja </option>
                    <option value="5"> Muy Baja </option>
                </Form.Control>
                {(body.priority !== "-1") ? '' : <div className="invalid-feedback">Seleccione una prioridad</div>}
        </Form.Group>
    </Form>
  )
}
export {formUser}
