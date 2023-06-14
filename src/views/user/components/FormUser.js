import React from 'react'
import { validateEmail,validateFieldText,validateUsername,validateSpaces} from '../../../utils/validators';
import { Button, Row, Form, Spinner, Col} from 'react-bootstrap';

const FormUser= ({body, setBody, priorities, createUser, loading}) =>{

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    }
    const activateBooton = (body)=>{
        if(!validateUsername(body.username)){
            return false
        }
        if(body.priority === "-1"){
            return false
        }
        if(body.first_name !== ""){
            if(!validateFieldText(body.first_name)){
                return false
            }
        }
        if (body.last_name !== ""){
            if(!validateFieldText(body.last_name)){
                return false
            }
        }
        if (body.email !== ""){
            if(!validateEmail(body.email)){
                return false
            }
        }
        return true
    }

    const FieldUsername=(event)=>{    
        if(validateSpaces(event.target.value)){
            setBody({...body,
                [event.target.name] : event.target.value}
            )
        }        
    }
    
    const completeField=(event)=>{ 
        setBody({...body,
            [event.target.name] : event.target.value}
        )       
    }

    const fieldPassword=(event)=>{
        setBody({...body,
            [event.target.name] : event.target.value}
        )
    }
  return (
      <Form>
        <Row>
            <Col>
                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control 
                        placeholder="Ingrese el nombre del usuario" 
                        maxlength="150" 
                        value ={body.username} 
                        name="username" 
                        isInvalid={body.username === ''|| !validateUsername(body.username)}
                        isValid={body.username !== ''} 
                        onChange={(e)=>FieldUsername(e)}/>
                    {validateUsername(body.username)  ? "" : <div className="invalid-feedback"> Solo se permiten letras, numeros y los cateacteres especiales '@', '.' , '+', '-', '_' </div>}
                </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Prioridad</Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="priority" 
                    value ={body.priority} 
                    onChange={(e)=>completeField(e)} isInvalid={body.priority === "-1"}
                    isValid={body.priority !== "-1"}>
                    <option value="-1">Seleccione una prioridad</option>
                    {priorities.map((priority, index) => {
                        return(<option value={priority.url}> {priority.name} </option>)
                    })}
                </Form.Control>
                {(body.priority !== "-1") ? '' : <div className="invalid-feedback">Seleccione una prioridad</div>}
                </Form.Group>
            
            </Col>
            <Col>
                <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control  
                        placeholder="Ingrese el Email" 
                        maxlength="254"  
                        value ={body.email}
                        name="email" 
                        onChange={(e)=>completeField(e)} 
                        isInvalid={body.email !== "" && !validateEmail(body.email)}
                        isValid={body.email === "" || validateEmail(body.email)}/>
                    {validateEmail(body.email) ? ""  : <div className="invalid-feedback">   Ingrese un email valido</div>}
                </Form.Group>
            </Col>
        </Row>
        <Row>
        <Col>
                <Form.Group controlId="formGridAddress1">
                <Form.Label>Nombre/s</Form.Label>
                <Form.Control 
                    placeholder="Ingrese el nombre/s" 
                    maxlength="150" 
                    name="first_name"
                    value ={body.first_name} 
                    onChange={(e)=>completeField(e)} 
                    isInvalid={body.first_name !== "" && !validateFieldText(body.first_name)}
                    isValid={body.first_name === "" || validateFieldText(body.first_name)}/>
                    {validateFieldText(body.first_name) ? "" : <div className="invalid-feedback">   Ingrese caracteres validos</div>}
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formGridAddress1">
                <Form.Label>Apellido</Form.Label>
                <Form.Control 
                    placeholder="Ingrese el apellido" 
                    maxlength="150" 
                    value ={body.last_name}
                    name="last_name" 
                    onChange={(e)=>completeField(e)} 
                    isInvalid={body.last_name !== "" && !validateFieldText(body.last_name)}
                    isValid={body.last_name === "" || validateFieldText(body.last_name)}/>
                    {validateFieldText(body.last_name) ? ""  : <div className="invalid-feedback">   Ingrese caracteres validos</div>}
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="ingrese una Contraseña"
                        name="password"
                        onChange={(e)=>fieldPassword(e)}  />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña confirmar</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="ingrese una Contraseña"
                        name="passwordConfirmation"
                        isInvalid={body.passwordConfirmation == "" || body.passwordConfirmation !== body.password}
                        isValid={body.passwordConfirmation !== "" && body.passwordConfirmation == body.password}
                        
                        onChange={(e)=>fieldPassword(e)}  />
                        {!(body.passwordConfirmation !== body.password) ? ""  : <div className="invalid-feedback">   las contraseñas no coinciden</div>}
                </Form.Group>
            </Col>
        </Row>
        {(activateBooton(body)) ? 
                                    <><Button variant="primary" onClick={createUser} >Guardar</Button></>
                                    : 
                                    <><Button variant="primary" disabled>Guardar</Button></> }
                                    <Button variant="primary" href="/users">Cancelar</Button>
        
    </Form>
  )
}
export default FormUser
