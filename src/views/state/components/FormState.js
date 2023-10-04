import React, {useState,useEffect} from 'react'
import {Card, Form, Button, Row, Col} from 'react-bootstrap'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { validateName, validateDescription, validateSelect, validateUnrequiredInput } from '../../../utils/validators/state';


const animatedComponents = makeAnimated();


const FormState = ({body, setBody, createState, childernes}) => {
    const [childernesValueLabel, setChildernesValueLabel] = useState([])
    const messageToPlaceholder = "Seleccione una opción"
    const messageWithoutOptions = "No hay opciones"

    useEffect(()=> {

        let listDefaultArtifact = childernes.filter(elemento => body.children.includes(elemento.value))
        .map(elemento => ({value: elemento.value, label:elemento.label}))

        setChildernesValueLabel(listDefaultArtifact)
    
    },[body.children, childernes])
    

    const completeField=(event)=>{ 
        setBody({...body,
            [event.target.name] : event.target.value}
        )     
    } 
    const completeChildernes=(event)=>{ 
        
        setBody({...body,
            ["children"] : event.map((e)=>{
                return e.value
            })}
        )
        console.log(body.children)
    }

  return (
    <Card.Body>
        <Form>
            <Row>
                <Col>
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Nombre <b style={{color:"red"}}>*</b></Form.Label>
                        <Form.Control 
                            placeholder="Ingrese un nombre" 
                            maxlength="100" 
                            value ={body.name} 
                            name="name"
                            isInvalid={validateName(body.name)}                        
                            onChange={(e)=>completeField(e)}
                        />
                        {validateName(body.name) ? '' : <div className="invalid-feedback">Ingrese un nombre que contenga hasta 100 caracteres, solo letras y que no sea vacio</div>}
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Atendido</Form.Label>
                        <Form.Control  
                            type="choice"
                            as="select" 
                            name="attended" 
                            value ={body.attended}                          
                            onChange={(e)=>completeField(e)}>
                            <option value={true}>Verdadero</option>
                            <option value={false}>Falso</option>       
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Resuelto</Form.Label>
                        <Form.Control  
                            type="choice"
                            as="select" 
                            name="solved" 
                            value ={body.solved} 
                            onChange={(e)=>completeField(e)}>
                            <option value={true}>Verdadero</option>
                            <option value={false}>Falso</option>       
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group controlId="formGridAddress1">
                <Form.Label>Descripción</Form.Label>
                <Form.Control 
                    placeholder="Ingrese una descripcion" 
                    maxlength="150" 
                    value ={body.description} 
                    name="description"
                    isInvalid={(validateUnrequiredInput(body.description)) ? !validateDescription(body.description) : false}                
                    onChange={(e)=>completeField(e)}
                />
                {validateDescription(body.description) ? '' : <div className="invalid-feedback">Ingrese una descripcion que contenga hasta 250 caracteres y que no sea vacía</div>}
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
                <Form.Label>Hijos</Form.Label>
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    placeholder={messageToPlaceholder}
                    noOptionsMessage={()=>messageWithoutOptions}
                    isMulti
                    value={childernesValueLabel}
                    onChange={completeChildernes}
                    options={childernes}
                />
            </Form.Group>

            <Button variant="primary" onClick={createState} >Guardar</Button> 
            <Button variant="primary" href="/states">Cancelar</Button>  

        </Form>
    </Card.Body>
  )
}

export default FormState