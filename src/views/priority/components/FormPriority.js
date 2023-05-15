import React from 'react'
import { Row, Card, Form, Button,Col } from 'react-bootstrap'
import { validateFieldText,validateNumber,validateHours,validateMinutes } from '../../../utils/validators';

const FormPriority = ({body, setBody, createPriority}) => {

       
    const completeField=(event)=>{ 
        setBody({...body,
            [event.target.name] : event.target.value}
        )     
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
        if(body.attend_time_days !== ""){
                if(!validateNumber(body.attend_time_days)){
                        return false
                }
        }
        if(body.attend_time_hours !== ""){
                if(!validateHours(body.attend_time_hours)){
                        return false
                }
        }
        if(body.attend_time_minutes !== ""){
                if(!validateMinutes(body.attend_time_minutes)){
                        return false
                }
        }
        if(body.solve_time_days !== ""){
                if(!validateNumber(body.solve_time_days)){
                        return false
                }
        }
        if(body.solve_time_hours !== ""){
                if(!validateHours(body.solve_time_hours)){
                        return false
                }
        }
        if(body.solve_time_minutes !== ""){
                if(!validateMinutes(body.solve_time_minutes)){
                        return false
                }
        }
        return true
    }

    return (
    <Card.Body>
  <Form>
  <th></th>
          
        <Row>
        <Col sm={12} lg={4}>
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
      </Col>
        <Col sm={12} lg={4}>
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
      </Col>
        <Col sm={12} lg={4}>
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
      </Col>
      </Row>

      <Form.Label>Tiempo para atender</Form.Label>
      <Row>  
        <Col>
                <Form.Group controlId="formGridAddress1">
                        Dia/s  <Form.Control 
                        placeholder="Ingrese la cantidad de dia/s" 
                        maxlength="150"
                        value ={body.attend_time_days} 
                        name="attend_time_days"
                        isInvalid={body.attend_time_days!=="" && !validateNumber(body.attend_time_days)}
                        isValid={body.attend_time_days=="" || validateNumber(body.attend_time_days)}
                        onChange={(e)=>completeField(e)} />
                </Form.Group>
        </Col>
        <Col>
                <Form.Group controlId="formGridAddress1">
                        Horas  <Form.Control 
                        placeholder="Ingrese la cantidad de horas" 
                        maxlength="2"
                        value ={body.attend_time_hours} 
                        name="attend_time_hours"
                        isInvalid={body.attend_time_hours!=="" && !validateHours(body.attend_time_hours)}
                        isValid={body.attend_time_hours=="" || validateHours(body.attend_time_hours)}
                        onChange={(e)=>completeField(e)} />
                </Form.Group>
        </Col>
        <Col>
                <Form.Group controlId="formGridAddress1">
                        Minutos  <Form.Control 
                        placeholder="Ingrese la cantidad de minutos" 
                        maxlength="2"
                        value ={body.attend_time_minutes} 
                        name="attend_time_minutes"
                        isInvalid={body.attend_time_minutes!=="" && !validateMinutes(body.attend_time_minutes)}
                        isValid={body.attend_time_minutes=="" || validateMinutes(body.attend_time_minutes)}
                        onChange={(e)=>completeField(e)} />
                </Form.Group>
        </Col> 
      </Row>
      <Form.Label>Tiempo de resolucion </Form.Label>
      <Row>
        <Col>
        <Form.Group controlId="formGridAddress1">
                Dia/s  <Form.Control 
                placeholder="Ingrese la cantidad de dia/s" 
                maxlength="150"
                value ={body.solve_time_days} 
                name="solve_time_days"
                isInvalid={body.solve_time_days!=="" && !validateNumber(body.solve_time_days)}
                isValid={body.solve_time_days=="" || validateNumber(body.solve_time_days)}
                onChange={(e)=>completeField(e)} />
                
        </Form.Group>
        </Col>
        <Col>
                <Form.Group controlId="formGridAddress1">
                        Horas  <Form.Control 
                        placeholder="Ingrese la cantidad de horas" 
                        maxlength="2" 
                        value ={body.solve_time_hours} 
                        isInvalid={body.solve_time_hours!=="" && !validateHours(body.solve_time_hours)}
                        isValid={body.solve_time_hours=="" || validateHours(body.solve_time_hours)}
                        name="solve_time_hours"
                        onChange={(e)=>completeField(e)} />
                        
                </Form.Group>
        </Col> 
        <Col>
                <Form.Group controlId="formGridAddress1">
                        Minutos  <Form.Control 
                        placeholder="Ingrese la cantidad de minutos" 
                        maxlength="2" 
                        value ={body.solve_time_minutes} 
                        isInvalid={body.solve_time_minutes!=="" && !validateMinutes(body.solve_time_minutes)}
                        isValid={body.solve_time_minutes=="" || validateMinutes(body.solve_time_minutes)}
                        name="solve_time_minutes"
                        onChange={(e)=>completeField(e)} /> 
                </Form.Group>
        </Col>     
      </Row>
      {activateBooton(body) ?  
      <><Button variant="primary" onClick={createPriority} >Guardar</Button></>
        :<><Button variant="primary" disabled>Guardar</Button></> }
          
        <Button variant="primary" href="/priorities">Cancelar</Button>
  </Form>
</Card.Body>)
  
}

export default FormPriority