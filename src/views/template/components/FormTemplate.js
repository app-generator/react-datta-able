import React,{useState} from 'react'
import {Card, Form, Button,Row, Col} from 'react-bootstrap'
import { postStringIdentifier } from "../../../api/services/stringIdentifier";
import Select from 'react-select';

const FormTemplate = (props) => {

  const lifeCicle= ["manual","auto","auto_open","auto_close"]
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [error,setError]=useState()

  const completeField=(event)=>{ 
    props.setBody({...props.body,
        [event.target.name] : event.target.value}
    )    
  }

  const completeFieldStringIdentifier=(event)=>{ 
       
    if (event.target.value !==""){ 
        postStringIdentifier(event.target.value).then((response) => { 
            console.log(response.data.artifact_type)
            console.log(event.target.value)
            setShowErrorMessage(response.data.artifact_type === "OTHER" )        
        })
        .catch((error) => {
            setError(error)
        }).finally(() => {
            console.log("finalizo")
        })   
    }

    if (event.target.value === "" ){
        setShowErrorMessage(false)//para que no aparesca en rojo si esta esta el input vacio en el formulario
    }   
    props.setBody({...props.body,[event.target.name] : event.target.value}) 
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
                <Form.Label>Taxonomia  <b style={{color:"red"}}>*</b></Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="event_taxonomy" 
                    value ={props.body.event_taxonomy} 
                    onChange={(e)=>completeField(e)} >
                    <option value="-1">Seleccione una taxonomia</option>
                    {props.taxonomy.map((taxonomy) => {
                        return(<option value={taxonomy.url}> {taxonomy.name} </option>)
                    })}
                 
                </Form.Control>
                
                </Form.Group>
              </Col>            
              <Col sm={12} lg={4}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Fuente de Informacion  <b style={{color:"red"}}>*</b> </Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="event_feed" 
                    value ={props.body.event_feed} 
                    onChange={(e)=>completeField(e)} 
                    >
                    <option value="-1">Seleccione una Fuente de Informacion</option>
                    {props.feeds.map((feed) => {
                        return(<option value={feed.url}> {feed.name} </option>)
                    })}
                 
                </Form.Control>
                </Form.Group>
              </Col>
           
            </Row>
            </Form>
            </Card.Body>
        </Card>
        <Card>
            <Card.Header>
                <Card.Title as="h5">Recursos afectados</Card.Title>
            </Card.Header>
           <Card.Body>
            <Form.Label>CIDR, Domino o Email<b style={{color:"red"}}>*</b></Form.Label>
                <Row>
                <Col sm={12} lg={6}>
                    <Form.Group controlId="formGridAddress1">
                    <Form.Control 
                        placeholder="Ingrese IPv4,IPv6, Nombre de domino o Email" 
                        maxlength="150" 
                        value ={props.body.address_value} 
                        onChange={(e)=>completeFieldStringIdentifier(e)}
                        isInvalid={showErrorMessage }
                        name="address_value"/>
                        {showErrorMessage    ?  <div className="invalid-feedback"> Debe ingresar IPv4,IPv6, Nombre de domino o Email</div>  : "" }
                    </Form.Group> 
                </Col>
            </Row>
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
                   <Form.Label>TLP  <b style={{color:"red"}}>*</b></Form.Label>
                   <Form.Control  
                       type="choice"
                       as="select" 
                       name="case_tlp" 
                       value ={props.body.case_tlp} 
                       onChange={(e)=>completeField(e)} >
                       <option value="-1">Seleccione un tlp</option>
                       {props.tlp.map((tlp) => {
                           return(<option value={tlp.url}> {tlp.name} </option>)
                       })}
                   
                   </Form.Control>
               </Form.Group>
               </Col>
              
              <Col sm={12} lg={4}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Prioridades  <b style={{color:"red"}}>*</b></Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="priority" 
                    value ={props.body.priority} 
                    onChange={(e)=>completeField(e)} >
                    <option value="-1">Seleccione una Prioridad</option>
                    {props.priorities.map((priority) => {
                        return(<option value={priority.url}> {priority.name} </option>)
                    })}
                 
                </Form.Control>
                </Form.Group>
              </Col>
              <Col sm={12} lg={4}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Estado  <b style={{color:"red"}}>*</b></Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="case_state" 
                    value ={props.body.case_state} 
                    onChange={(e)=>completeField(e)}>
                    <option value="-1">Seleccione un Estado</option>
                    {props.states.map((state) => {
                        return(<option value={state.url}> {state.name} </option>)
                    })}
                </Form.Control>
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
      { props.body.event_taxonomy !== '-1' && props.body.event_feed !== '-1' && props.body.case_tlp !== "-1"
      && props.body.priority !== "-1" && props.body.case_state !== "-1" && props.body.address_value !== "" && !showErrorMessage ?
            <Button variant="primary" onClick={props.createTemplate} >Guardar</Button> 
            : 
            <Button variant="primary" disabled>Guardar</Button>                                    
    }
    
    <Button variant="primary" href="/templates">Cancelar</Button>       
         
    </React.Fragment>
  )
}

export default FormTemplate