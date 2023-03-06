import React, {useState} from 'react'
import {Card, Form, Button, ButtonGroup, Badge} from 'react-bootstrap'

const states = ["hijo1", "hijo2", "hijo3"]
const statesSave = []
const FormState = ({body, setBody, createState}) => {

    const completeField=(event)=>{ 
        setBody({...body,
            [event.target.name] : event.target.value}
        )     
    } 
    const completeChildren=(event)=>{ 
        statesSave.push(event.target.value)
        console.log(statesSave)     
    } 
    const deleteChildren=(event)=>{
        statesSave.pop(event.target.name)
    }

  return (
    <Card.Body>
        <Form>

            <Form.Group controlId="formGridAddress1">
                <Form.Label>nombre</Form.Label>
                <Form.Control 
                placeholder="Ingrese un nombre" 
                maxlength="100" 
                value ={body.name} 
                name="name"
                isInvalid={body.name === ""}
                isValid={body.name !== ""}
                onChange={(e)=>completeField(e)}/>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>atendido</Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="attended" 
                    value ={body.attended}
                    isInvalid={body.attended === null}
                    isValid={body.attended !== null} 
                    onChange={(e)=>completeField(e)}>
                    <option value="-1">Seleccione un opcion</option> 
                    <option value={true}>verdadero</option>
                    <option value={false}>falso</option>       
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>resuelto</Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="solved" 
                    value ={body.solved} 
                    isInvalid={body.solved === null}
                    isValid={body.solved !== null} 
                    onChange={(e)=>completeField(e)}>
                    <option value="-1">Seleccione un opcion</option> 
                    <option value={true}>verdadero</option>
                    <option value={false}>falso</option>       
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
                <Form.Label>descripción</Form.Label>
                <Form.Control 
                placeholder="Ingrese un color" 
                maxlength="150" 
                value ={body.description} 
                name="description"
                isInvalid={body.description === ""}
                isValid={body.description !== ""}
                onChange={(e)=>completeField(e)}/>
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
                <Form.Label>hijos</Form.Label>
                <Form.Control 
                placeholder="Ingrese un color" 
                maxlength="150" 
                value ={body.children} 
                name="children"
                onChange={(e)=>completeField(e)}/>
            </Form.Group>
            <Form.Label>Hijos</Form.Label>
            <tr/>
            este estado tiene como hijos a :
            {statesSave.length === 0 ? "": statesSave.map((state,index)=>{
                return(
                
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary">{state}</Button>
                    <Button variant="danger"  onClick={(e)=>deleteChildren(e)}>x</Button>
                
                </ButtonGroup> 
                )
            }
            )}
               
            <Form.Group controlId="exampleForm.ControlSelect1">
                
                
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="childern" 
                    value ={body.priority} 
                    onChange={(e)=>completeChildren(e)} 
                    isInvalid={body.priority === "-1"}
                    isValid={body.priority !== "-1"}>
                    <option value="-1">Seleccione una prioridad</option>
                    {states.map((state, index) => {
                        return(<option value={state}> {state} </option>)
                    })}
                    
                </Form.Control>
                {(body.priority !== "-1") ? '' : <div className="invalid-feedback">Seleccione una prioridad</div>}
                </Form.Group>

            <Button variant="primary" onClick={createState} >Guardar</Button> 
            <Button variant="primary" href="./list-states">Cancelar</Button>  

        </Form>
    </Card.Body>
  )
}

export default FormState