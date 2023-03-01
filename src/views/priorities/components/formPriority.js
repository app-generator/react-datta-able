import React from 'react'
import { Row, Card, Form, Button,Col } from 'react-bootstrap'
import { validateFieldText, validateNumber} from '../../../components/Validator/validators';

const FormPriority = ({body, setBody, createPriority}) => {

    const completeField=(event)=>{ 
        setBody({...body,
            [event.target.name] : event.target.value}
        )     
        console.log(event.target.value)  
    }
    const activateBooton = (body)=>{
        if (!validateFieldText(body.name)){
                return false
        }
        if(!validateNumber(body.severity)){
                return false
        }
        if(body.color === "" ){
                return false

        }
        return true
    }
    return (
    <Card.Body>
  <Form>
  <th></th>
          

      <Form.Group controlId="formGridAddress1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
               placeholder="Ingrese un nombre" 
               maxlength="150" 
               value ={body.name} 
               name="name"
               isInvalid={!validateFieldText(body.name)}
               isValid={body.name !== ""}
               onChange={(e)=>completeField(e)}/>
               {body.name !== "" ? ""  : <div className="invalid-feedback">   Ingrese un nombre </div>}
      </Form.Group>

      <Form.Group controlId="formGridAddress1">
              <Form.Label>Severidad</Form.Label>
              <Form.Control 
               placeholder="Ingrese el valor de gravedad" 
               maxlength="150" 
               value ={body.severity} 
               name="severity"
               isInvalid={!validateNumber(body.severity)}
               isValid={body.severity != ""}
               onChange={(e)=>completeField(e)}/>
               {body.severity !== "" ? ""  : <div className="invalid-feedback">   Ingrese el numero de gravedad </div>}
      </Form.Group>

      <Form.Group controlId="formGridAddress1">
              <Form.Label>Color</Form.Label>
              <Form.Control 
              placeholder="Ingrese un color" 
              maxlength="150" 
              value ={body.color} 
              name="color" 
              isInvalid={body.color === ""}
              isValid={body.color !== ""}
              onChange={(e)=>completeField(e)}/>
               {body.color !== "" ? ""  : <div className="invalid-feedback">Ingrese un color </div>}
      </Form.Group>
        {/*<Form.Group controlId="formGridAddress1">
              <Form.Label>Tiempo de respuesta</Form.Label>
              <Form.Control 
               placeholder="Ingrese la cantidad de horas " 
               maxlength="150" 
               value ={body.attend_deadline} 
               name="attend_deadline"
               isInvalid={!validateNumber(body.attend_deadline)}
               isValid={body.attend_deadline == ""}
               onChange={(e)=>completeField(e)}/>
               {body.attend_deadline == "" ? ""  : <div className="invalid-feedback">   Ingrese el numero de gravedad </div>}
    </Form.Group>*/}
      <Form.Label>Fecha limite de respuesta</Form.Label>
      <Row>
      <Col>
      <Form.Group controlId="formGridAddress1">
              Dia/s : <Form.Control 
              placeholder="Ingrese la cantidad de dia/s" 
              maxlength="150"
              step="1"
              value ={body.dayAttendDeadline} 
              name="dayAttendDeadline"
              onChange={(e)=>completeField(e)} />
              
      </Form.Group>
      </Col>
      <Col>
      <Form.Group controlId="formGridAddress1">
              Hora:
              <Form.Control 
              type="time"
              placeholder="Ingrese la hora" 
              maxlength="150" 
              step="1"
              value ={body.hourAttendDeadline} 
              name="hourAttendDeadline"
              onChange={(e)=>completeField(e)}/>
              
      </Form.Group>
      </Col>
      </Row>

      <Form.Label>Fecha limite de resolucion </Form.Label>
      <Row>
      <Col>
      <Form.Group controlId="formGridAddress1">
              
              Dia/s : <Form.Control 
              placeholder="Ingrese la cantidad de dia/s" 
              maxlength="150" 
              value ={body.daySolveDeadline} 
              name="daySolveDeadline"
              onChange={(e)=>completeField(e)} />
              
      </Form.Group>
      </Col>
      <Col>
      <Form.Group controlId="formGridAddress1">
              Hora:
              <Form.Control 
              type="time"
              placeholder="Ingrese la hora" 
              maxlength="150" 
              step="1"
              value ={body.hourSolveDeadline} 
              name="hourSolveDeadline"
              onChange={(e)=>completeField(e)}/>
              
      </Form.Group>
      </Col>
      </Row>
      {activateBooton(body) ?  
      <><Button variant="primary" onClick={createPriority} >Guardar</Button></>
        :<><Button variant="primary" disabled>Guardar</Button></> }
          
        <Button variant="primary" href="/list-user">Cancelar</Button>
  </Form>
</Card.Body>)
  
}

export default FormPriority