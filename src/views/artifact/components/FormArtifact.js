import React from 'react'
import { Row, Card, Form, Button,Col } from 'react-bootstrap'
import { validateFieldText, validateNumber} from '../../../utils/validators';

const FormArtifact = ({body, setBody, ifConfirm, ifCancel}) => {
    const types = ["ip","domain","fqdn","url","mail","hash","file","other","user-agent","autonomous-system"]
    const completeField=(event)=>{ 
        setBody({...body,
            [event.target.name] : event.target.value}
        )     
    }
    const activateBooton = (body)=>{
        
        return false
    }
  return (
    <div>
        <Card.Body>
  <Form>
  <th></th>
          
      <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Tipo</Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="type" 
                    value ={body.type} 
                    onChange={(e)=>completeField(e)} isInvalid={body.type === "-1"}
                    isValid={body.type !== "-1"}>
                    <option value="-1">Seleccione un tipo</option>
                    {types.map((type, index) => {
                        return(<option value={type}> {type} </option>)
                    })}
                 
                </Form.Control>
        </Form.Group>

      <Form.Group controlId="formGridAddress1">
              <Form.Label>Valor</Form.Label>
              <Form.Control 
               placeholder="Ingrese valor " 
               maxlength="150" 
               value ={body.value} 
               name="value"
               onChange={(e)=>completeField(e)}/>
      </Form.Group>

      
      {activateBooton(body) ?  
      <><Button variant="primary" disabled>Guardar</Button></> 
      : 
      <><Button variant="primary" onClick={ifConfirm} >Guardar</Button></>
  }
      <Button variant="primary" onClick={ifCancel}>Cancelar</Button>
  </Form>
</Card.Body>

    </div>
  )
}

export default FormArtifact