import React, {useState} from 'react'
import {Card, Form, Button,Row, Col} from 'react-bootstrap'
import { validateCidr, validateURL, validateSpaces} from '../../../utils/validators';

const FormTemplate = (props) => {

  const lifeCicle= ["manual","auto","auto_open","auto_close"]

  const completeField=(event)=>{ 
    props.setBody({...props.body,
        [event.target.name] : event.target.value}
    )    
  }
  
  const invalidDomain =()=>{
    if(props.body.cidr !== ""){
        return false
    }  
    return props.body.domain === '' || !validateURL(props.body.domain)
  }

  const invalidCidr =() =>{
    if (props.body.domain !== ""){
        return false
    }  
    return !validateCidr(props.body.cidr)  || props.body.cidr === '' 
  }
  return (
    <React.Fragment>
        <Card>
            <Card.Header>
                <Card.Title as="h5">Ante un evento</Card.Title>
            </Card.Header>
      <Card.Body>
        <Form>
        <Row>
        
              <Col sm={12} lg={4}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Taxonomia</Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="event_taxonomy" 
                    value ={props.body.event_taxonomy} 
                    onChange={(e)=>completeField(e)} 
                    isInvalid={props.body.event_taxonomy === "-1"}>
                    <option value="-1">Seleccione una taxonomia</option>
                    {props.taxonomy.map((taxonomy, index) => {
                        return(<option value={taxonomy.url}> {taxonomy.name} </option>)
                    })}
                 
                </Form.Control>
                {(props.body.event_taxonomy !== "-1") ? '' : <div className="invalid-feedback">Seleccione una taxonomia</div>}
                
                </Form.Group>
              </Col>            
              <Col sm={12} lg={4}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Fuente de Informacion</Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="event_feed" 
                    value ={props.body.event_feed} 
                    onChange={(e)=>completeField(e)} 
                    isInvalid={props.body.event_feed === "-1"}>
                    <option value="-1">Seleccione una Fuente de Informacion</option>
                    {props.feeds.map((feed, index) => {
                        return(<option value={feed.url}> {feed.name} </option>)
                    })}
                 
                </Form.Control>
                {(props.body.event_feed !== "-1") ? '' : <div className="invalid-feedback">Seleccione una Fuente de Informacion</div>}
                </Form.Group>
              </Col>
            <Col sm={12} lg={4}>
            <Form.Group controlId="formGridAddress1">
                <Form.Label>CIDR afectado</Form.Label>
                <Form.Control 
                    placeholder="Ingrese " 
                    maxlength="150" 
                    disabled={ props.body.domain !== "" }
                    value ={props.body.cidr} 
                    onChange={(e)=>completeField(e)}
                    
                    isInvalid={invalidCidr() }
                    name="cidr"/>
                </Form.Group>  
                </Col>
            
                <Col sm={12} lg={4}>
                <Form.Group controlId="formGridAddress1">
                <Form.Label>Dominio afectado</Form.Label>
                <Form.Control 
                    placeholder="Ingrese" 
                    maxlength="150"
                    disabled={props.body.cidr !== "" }
                    value ={props.body.domain} 
                    onChange={(e)=>completeField(e)} 
                    isInvalid={ invalidDomain()}
                    name="domain"/>
                </Form.Group> 
                </Col>
            </Row>
            </Form>
            </Card.Body>
        </Card>
        <Card>
            <Card.Header>
                <Card.Title as="h5">Crear un caso</Card.Title>
            </Card.Header>
            <Card.Body>  
<Form>
    <Row>
    <Col sm={12} lg={4}>
            
            <Form.Group controlId="exampleForm.ControlSelect1">
                   <Form.Label>TLP</Form.Label>
                   <Form.Control  
                       type="choice"
                       as="select" 
                       name="case_tlp" 
                       value ={props.body.case_tlp} 
                       onChange={(e)=>completeField(e)} 
                       isInvalid={props.body.case_tlp === "-1"}>
                       <option value="-1">Seleccione un tlp</option>
                       {props.tlp.map((tlp, index) => {
                           return(<option value={tlp.url}> {tlp.name} </option>)
                       })}
                   
                   </Form.Control>
                   {(props.body.case_tlp !== "-1") ? '' : <div className="invalid-feedback">Seleccione un tlp</div>}
               </Form.Group>
               </Col>
              
              <Col sm={12} lg={4}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Prioridades</Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="priority" 
                    value ={props.body.priority} 
                    onChange={(e)=>completeField(e)} 
                    isInvalid={props.body.priority === "-1"}>
                    <option value="-1">Seleccione una Prioridad</option>
                    {props.priorities.map((priority, index) => {
                        return(<option value={priority.url}> {priority.name} </option>)
                    })}
                 
                </Form.Control>
                {(props.body.priority !== "-1") ? '' : <div className="invalid-feedback">Seleccione una Prioridad</div>}
                </Form.Group>
              </Col>
              <Col sm={12} lg={4}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Estado</Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="case_state" 
                    value ={props.body.case_state} 
                    onChange={(e)=>completeField(e)} 
                    isInvalid={props.body.case_state === "-1"}>
                    <option value="-1">Seleccione un Estado</option>
                    {props.states.map((state, index) => {
                        return(<option value={state.url}> {state.name} </option>)
                    })}
                </Form.Control>
                {(props.body.case_state !== "-1") ? '' : <div className="invalid-feedback">Seleccione un Estado</div>}
                </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col sm={12} lg={4}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Ciclo de vida</Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="case_lifecycle" 
                    value ={props.body.case_lifecycle} 
                    onChange={(e)=>completeField(e)} >
                    {lifeCicle.map((type) => {
                        return(<option value={type}> {type} </option>)
                    })}
                 
                </Form.Control>
                </Form.Group>
              </Col>
              </Row>
        </Form>                  
      </Card.Body>
      </Card>
    <Button variant="primary" onClick={props.createTemplate} >Guardar</Button> 
    <Button variant="primary" href="/templates">Cancelar</Button>       
         
    </React.Fragment>
  )
}

export default FormTemplate