import React from 'react'
import { Button, Row, Form, Spinner, Col} from 'react-bootstrap';
import { validateSpaces} from '../../../utils/validators';
import { validateUserName, validateName, validateSelect, validateUserMail } from '../../../utils/validators/user';

const FormUser= ({body, setBody, priorities, createUser, loading}) =>{

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
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
                    <Form.Label>Nombre de usuario <b style={{color:"red"}}>*</b></Form.Label>
                    <Form.Control 
                        placeholder="Ingrese el nombre del usuario" 
                        maxlength="150" 
                        value ={body.username} 
                        name="username" 
                        isInvalid={!validateUserName(body.username)}
                        isValid={validateUserName(body.username)} 
                        onChange={(e)=>FieldUsername(e)}/>
                    {validateUserName(body.username)  ? "" : <div className="invalid-feedback"> Solo se permiten letras, numeros y los cateacteres especiales '@', '.' , '+', '-', '_' </div>}
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formGridAddress1">
                <Form.Label>Nombre/s</Form.Label>
                <Form.Control 
                    placeholder="Ingrese el nombre/s" 
                    maxlength="150" 
                    name="first_name"
                    value ={body.first_name} 
                    onChange={(e)=>completeField(e)} 
                    isInvalid={(body.first_name != '') ? !validateName(body.first_name) : false}
                    isValid={(body.first_name != '') ? validateName(body.first_name) : false}/>
                    {validateName(body.first_name) ? "" : <div className="invalid-feedback"> Ingrese un nombre que contenga hasta 150 caracteres, solo letras y que no sea vacio </div>}
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
                    isInvalid={(body.last_name != '')?!validateName(body.last_name):false}
                    isValid={(body.last_name != '')?validateName(body.last_name):false}/>
                    {validateName(body.last_name) ? ""  : <div className="invalid-feedback"> Ingrese un nombre que contenga hasta 150 caracteres, solo letras y que no sea vacio </div>}
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Prioridad <b style={{color:"red"}}>*</b></Form.Label>
                    <Form.Control  
                        type="choice"
                        as="select" 
                        name="priority" 
                        value ={body.priority} 
                        onChange={(e)=>completeField(e)} 
                        isInvalid={!validateSelect(body.priority)}
                        isValid={validateSelect(body.priority)}>
                        <option value=''>Seleccione una prioridad</option>
                        {priorities.map((priority, index) => {
                            return(<option value={priority.url}> {priority.name} </option>)
                        })}
                        
                    </Form.Control>
                    {(validateSelect(body.priority)) ? '' : <div className="invalid-feedback">Seleccione una prioridad</div>}
                </Form.Group>
                
            </Col>
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
                <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control  
                        placeholder="Ingrese el Email" 
                        maxlength="100"  
                        value ={body.email}
                        name="email" 
                        onChange={(e)=>completeField(e)} 
                        isInvalid={(body.email != '')?!validateUserMail(body.email):false}
                        isValid={(body.email != '')?validateUserMail(body.email):false}/>
                    {validateUserMail(body.email) ? ""  : <div className="invalid-feedback"> Ingrese un email valido </div>}
                </Form.Group>

            </Col>
        </Row>
        
        
        {(validateUserName(body.username) && validateSelect(body.priority))  ?
            <><Button variant="primary" onClick={createUser} >Guardar</Button></>
            : 
            <><Button variant="primary" disabled>Guardar</Button></> }
        <Button variant="primary" href="/users">Cancelar</Button>
        
    </Form>
  )
}
export default FormUser
