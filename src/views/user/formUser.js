import React from 'react'
import { validateEmail,validateFieldText,validateUsername} from './validators';
import { Form, Button } from 'react-bootstrap';

const formUser= (body, setBody, priorities, callApi) =>{
    const translateWord = {"Critical":"Critoco", "High":"Alto", "Medium": "Medio", "Low": "Bajo", "Very Low": "Muy bajo"}

    const activateBooton = (body)=>{
        const formErrors = []
        if(body.username === ""){
            formErrors.push("username: Por favor Ingresar ingresar un nombre")
        }
        if(!validateUsername(body.username)){
            formErrors.push("username: ingrese un nombre de usuario valido")
        }
        if(body.priority == "-1"){
            formErrors.push("priority: Por favor elija una prioridad")
        }
        if(body.first_name !== ""){
            if(!validateFieldText(body.first_name)){
                formErrors.push("first_name: solo se permiten letras para el nombre")
            }
        }
        if (body.last_name !== ""){
            if(!validateFieldText(body.last_name)){
                formErrors.push("last_name: solo se permiten letras para el apellido")
            }
        }
        if (body.email !== ""){
            if(!validateEmail(body.email)){
                formErrors.push("email: El email no es valido")
            }
        }
        console.log(formErrors)  
        return (formErrors.length == 0)
    }

    const FieldUsername=(event)=>{
        
        if(!(/ /).test(event.target.value)){
            setBody({...body,
            [event.target.name] : event.target.value}
            )  
        }        
    }
    
    const fieldFullName=(event)=>{
        
            setBody({...body,
                [event.target.name] : event.target.value}
                )      
    }
    
    
    const fieldEmail=(event)=>{
        
        setBody({...body,
        [event.target.name] : event.target.value}
        )     
    }
    
    
    const fieldPriority=(event)=>{
    
        setBody({...body,
                [event.target.name] : event.target.value}//hay que pegarle a la api de prioridad
                )
    }
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
                isValid={body.username !== ''} onChange={(e)=>FieldUsername(e)}/>
                {body.username  ? '' : <div className="invalid-feedback">   Ingrese un nombre de usuario</div>}
            {validateUsername(body.username)  ? "" : <div className="invalid-feedback"> Solo se permiten letras, numeros y los cateacteres especiales '@', '.' , '+', '-', '_' </div>}
        </Form.Group>

        <Form.Group controlId="formGridAddress1">
            <Form.Label>Nombre/s</Form.Label>
            <Form.Control 
                placeholder="Ingrese el nombre/s" 
                maxlength="150" 
                name="first_name"
                value ={body.first_name} 
                onChange={(e)=>fieldFullName(e)} 
                isInvalid={body.first_name !== "" && !validateFieldText(body.first_name)}/>
            {validateFieldText(body.first_name) ? "" : <div className="invalid-feedback">   Ingrese caracteres validos</div>}
        </Form.Group>

        <Form.Group controlId="formGridAddress1">
            <Form.Label>Apellido</Form.Label>
            <Form.Control 
                placeholder="Ingrese el apellido" 
                maxlength="150" 
                value ={body.last_name}
                name="last_name" 
                onChange={(e)=>fieldFullName(e)} 
                isInvalid={body.last_name !== "" && !validateFieldText(body.last_name)}/>
            {validateFieldText(body.last_name) ? ""  : <div className="invalid-feedback">   Ingrese caracteres validos</div>}
        </Form.Group>
        

        <Form.Group controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control  
                placeholder="Ingrese el Email" 
                maxlength="254"  
                value ={body.email}
                name="email" 
                onChange={(e)=>fieldEmail(e)} 
                isInvalid={body.email !== "" && !validateEmail(body.email)}/>
            {validateEmail(body.email) ? ""  : <div className="invalid-feedback">   Ingrese un email valido</div>}
        </Form.Group>
        
        <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Prioridad</Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="priority" 
                    value ={body.priority} 
                    onChange={(e)=>fieldPriority(e)} isInvalid={body.priority === "-1"}
                    isValid={body.priority !== "-1"}>
                    <option value="-1">Seleccione una prioridad</option>
                    {Object.keys(priorities).map((priority, index) => {
                        return(<option value={priority}> {translateWord[priority]} </option>)
                    })}
                    
                </Form.Control>
                {(body.priority !== "-1") ? '' : <div className="invalid-feedback">Seleccione una prioridad</div>}
        </Form.Group>
        {(activateBooton(body)) ? 
                                    <><Button variant="primary" onClick={callApi} >Guardar</Button></>
                                    : 
                                    <><Button variant="primary" disabled>Guardar</Button></> }
                                    <Button variant="primary" href="/list-user">Cancelar</Button>
        
    </Form>
  )
}
export {formUser}
