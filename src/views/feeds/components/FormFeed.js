import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap';
import { validateName, validateDescription, validateUnrequiredInput } from '../../../utils/validators/feed';
import DropdownState from '../../../components/Dropdown/DropdownState'

const FormFeed = (props) => {
     
  return (
    <Form> 
    <Row>
        <Col sm={12} lg={6}>
            <Form.Group>
                <Form.Label>Nombre <b style={{color:"red"}}>*</b></Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Nombre" 
                    value ={props.name} 
                    onChange={(e) => props.setName(e.target.value)}                                                
                    isInvalid={!validateName(props.name)}
                />
                {validateName(props.name) ? '' : <div className="invalid-feedback">Ingrese un nombre que contenga hasta 100 caracteres, solo letras y que no sea vacio</div>}
            </Form.Group>
        </Col>                                                                   
    </Row>  
    <Row>
        <Col sm={12} lg={6}>
            <Form.Group>
                <Form.Label>Descripcion </Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Descripcion" 
                    value ={props.description} 
                    onChange={(e) => props.setDescription(e.target.value)}   
                    isInvalid={(validateUnrequiredInput(props.description)) ? !validateDescription(props.description) : false} 
                />
                {validateDescription(props.description) ? '' : <div className="invalid-feedback">Ingrese una descripcion que contenga hasta 250 caracteres y que no sea vacía</div>}
            </Form.Group>
        </Col>     
    </Row>              
    <Row>
        <Col sm={12} lg={1}>
            <Form.Group>
                <Form.Label>Estado </Form.Label>
                <DropdownState state={props.active} setActive={props.setActive}/>
            </Form.Group>   
        </Col>  
    </Row>     
    <Row>
        <Form.Group as={Col}>
         {props.name !== "" && validateName(props.name) ?
            <Button variant="primary" onClick={props.createFeed}>Guardar</Button>                                    
            : 
            <Button variant="primary" disabled>Guardar</Button>                                    
        }
        <Button variant="info" href='/feeds'>Cancelar</Button>
     </Form.Group>
        
    </Row>           
    </Form>
  )
}

export default FormFeed