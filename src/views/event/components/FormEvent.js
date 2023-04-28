import React,{useState, useEffect} from 'react'
import { Row, Card, Form, Button,Col, Modal, CloseButton } from 'react-bootstrap'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CrudButton from '../../../components/Button/CrudButton';
import FormArtifact from '../../artifact/components/FormArtifact'
import { postArtifact } from "../../../api/services/artifact";
import { validateCidr, validateURL, validateSpaces} from '../../../components/Validator/Validator';
import FileUpload from './FileUpload'



//import TableArtifact from './artifact/tableArtifact';

const animatedComponents = makeAnimated();
//{createEvent, setBody, body, feeds, taxonomy, tlp, priorities, users, listArtifact, setContactsCreated}
const FormEvent = (props) => {
    const [artifactsValueLabel, setArtifactsValueLabel] = useState([])
    const [modalCreate, setModalCreate] = useState(false)
    const [error,setError]=useState()
    const [bodyArtifact, setBodyArtifact] = useState({
        type:"-1",
        value:""
    })

    useEffect(()=> {

        let listDefaultArtifact = props.listArtifact.filter(elemento => props.body.artifacts.includes(elemento.value))
        .map(elemento => ({value: elemento.value, label:elemento.label}))

        setArtifactsValueLabel(listDefaultArtifact)
    
    },[props.body.artifacts, props.listArtifact])

    const completeField=(event)=>{ 
        console.log(event.target.value)
        props.setBody({...props.body,
            [event.target.name] : event.target.value}
        )       
    }
    const completeFieldFiles=(event)=>{ 
        console.log(event.target.files)
        props.setBody({...props.body,
            [event.target.name] : event.target.files}
        ) 
       
        console.log(props.body.evidence)
        

    }

    const selectArtefact=(event)=>{ 
        props.setBody({...props.body,
            ["artifacts"] : event.map((e)=>{
                return e.value
            })}
        )
    }

    const deleteFiles=(event)=>{
    
        props.setBody({...props.body,
            ["evidence"] : Object.values(props.body.evidence).filter(file => file.name !== event)}
        ) 
    }
    
    
    const createArtifact = () => {
    
        postArtifact(bodyArtifact.type, Math.floor(bodyArtifact.value))
        .then((response) => { 
            props.setContactsCreated(response) //
            setModalCreate(false) //
        })
        .catch((error) => {
            setError(error)
        }); 
    }

    

  return (
    <div>
        <Card>
            <Card.Header>
                <Card.Title as="h5">Principal</Card.Title>
            </Card.Header>
        
        
            <Card.Body>
            <Form>
                <Row>

                    <Col sm={12} lg={4}>
                        
                            <th></th>
                            <Form.Group controlId="formGridAddress1">
                            <Form.Label>Fecha </Form.Label>
                            <Form.Control 
                                type ="datetime-local"

                                maxlength="150" 
                                value ={props.body.date} 
                                onChange={(e)=>completeField(e)}
                                isInvalid={props.body.date === ""}
                                isValid={props.body.date !== ""}
                                name="date"/>
                            </Form.Group>
                    </Col>
                    <Col sm={12} lg={4}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>TLP</Form.Label>
                        <Form.Control  
                            type="choice"
                            as="select" 
                            name="tlp" 
                            value ={props.body.tlp} 
                            onChange={(e)=>completeField(e)} isInvalid={props.body.tlp === "-1"}
                            isValid={props.body.tlp !== "-1"}>
                            <option value="-1">Seleccione un tlp</option>
                            {props.tlp.map((tlp, index) => {
                                return(<option value={tlp.url}> {tlp.name} </option>)
                            })}
                        
                        </Form.Control>
                        {(props.body.tlp !== "-1") ? '' : <div className="invalid-feedback">Seleccione un tlp</div>}
                        </Form.Group>
                    </Col>
                    <Col sm={12} lg={4}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Taxonomia</Form.Label>
                        <Form.Control  
                            type="choice"
                            as="select" 
                            name="taxonomy" 
                            value ={props.body.taxonomy} 
                            onChange={(e)=>completeField(e)} isInvalid={props.body.taxonomy === "-1"}
                            isValid={props.body.taxonomy !== "-1"}>
                            <option value="-1">Seleccione una taxonomia</option>
                            {props.taxonomy.map((taxonomy, index) => {
                                return(<option value={taxonomy.url}> {taxonomy.name} </option>)
                            })}
                        
                        </Form.Control>
                        {(props.body.taxonomy !== "-1") ? '' : <div className="invalid-feedback">Seleccione una taxonomia</div>}
                        
                        </Form.Group>
                    </Col>
                </Row>
                    
                <Row>
                <Col sm={12} lg={4}>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Fuente de Informacion</Form.Label>
                    <Form.Control  
                        type="choice"
                        as="select" 
                        name="feed" 
                        value ={props.body.feed} 
                        onChange={(e)=>completeField(e)} isInvalid={props.body.feed === "-1"}
                        isValid={props.body.feed !== "-1"}>
                        <option value="-1">Seleccione una Fuente de Informacion</option>
                        {props.feeds.map((feed, index) => {
                            return(<option value={feed.url}> {feed.name} </option>)
                        })}
                    
                    </Form.Control>
                    {(props.body.feed !== "-1") ? '' : <div className="invalid-feedback">Seleccione una Fuente de Informacion</div>}
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
                        onChange={(e)=>completeField(e)} isInvalid={props.body.priority === "-1"}
                        isValid={props.body.priority !== "-1"}>
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
                    <Form.Label>Usuario que reporta</Form.Label>
                    <Form.Control  
                        type="choice"
                        as="select" 
                        name="reporter" 
                        value ={props.body.reporter} 
                        onChange={(e)=>completeField(e)} 
                        isValid={props.body.reporter}>
                        <option value="-1">Seleccione al usuario que reporta</option>
                        {props.users.map((user, index) => {
                            return(<option value={user.url}> {user.username} </option>)
                        })}
                    
                    </Form.Control>
                    {(props.body.reporter !== "-1") ? '' : <div className="invalid-feedback">Seleccione una Fuente de Informacion</div>}
                    </Form.Group>
                    </Col>
                </Row>
                

                  
                    

                <Form.Group controlId="formGridAddress1">
                <Form.Label>Notas</Form.Label>
                <Form.Control 
                    placeholder="Ingrese " 
                    maxlength="150" 
                    value ={props.body.notes} 
                    isValid={props.body.notes}
                    onChange={(e)=>completeField(e)}
                    name="notes"/>
                </Form.Group>
                </Form>
            </Card.Body>
        </Card>
        <Card>
            <Card.Header>
                <Card.Title as="h5">Artefactos</Card.Title>
            </Card.Header>
            <Card.Body>
            <Form>
                <Form.Group controlId="formGridAddress1">
                <Form.Label>Artefactos</Form.Label>
                    <Row>
                        <Col sm={12} lg={9}>
                                <Select
                                    placeholder='Seleccione Contactos'
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    value={artifactsValueLabel}
                                    onChange={selectArtefact}
                                    options={props.listArtifact}
                                    />
                        </Col>
                        <Col sm={12} lg={3}>
                            <CrudButton type='create' name='Artefacto' onClick={() => setModalCreate(true)}/>
                        </Col>
                    </Row>
                </Form.Group>
                
            </Form>
            </Card.Body>
        </Card>
        <Card>
            <Card.Header>
                <Card.Title as="h5">Recursos afectados</Card.Title>
            </Card.Header>

            <Card.Body>
        

                <Form.Group controlId="formGridAddress1">
                <Form.Label>Cidr afectado</Form.Label>
                <Form.Control 
                    placeholder="Ingrese " 
                    maxlength="150" 
                    value ={props.body.cidr} 
                    onChange={(e)=>completeField(e)}
                    name="cidr"
                    isInvalid={!validateCidr(props.body.cidr)  && props.body.cidr !== null}
                    isValid={validateCidr(props.body.cidr) || props.body.cidr == null}/>
                </Form.Group>  

                <Form.Group controlId="formGridAddress1">
                <Form.Label>Dominio afectado</Form.Label>
                <Form.Control 
                    placeholder="Ingrese" 
                    maxlength="150"
                    value ={props.body.domain} 
                    isValid={ validateURL(props.body.domain) || validateSpaces(props.body.domain) }
                    isInvalid={ props.body.domain !=='' && !validateURL(props.body.domain) }
                    onChange={(e)=>completeField(e)} 
                    name="domain"/>
                </Form.Group> 
        
                {/* este campo se va ausar en el put<Form.Group controlId="formGridAddress1">
                <Form.Label>Comentarios</Form.Label>
                <Form.Control 
                    placeholder="Ingrese" 
                    maxlength="150" 
                    value ={body.comments} 
                    onChange={(e)=>completeField(e)}
                    name="comments"/>
                </Form.Group> */}
                </Card.Body>
                </Card>
        <Card>
            <Card.Header>
                <Card.Title as="h5">Evidencias</Card.Title>
            </Card.Header>
        <Card.Body>
        
            {/*props.users.map((user, index) => {
                            return(<option value={user.url}> {user.username} </option>)
                        })*/}
            <Form>   
                <Form.Group controlId="formGridAddress1">
                <Form.Label>Evidencia</Form.Label>
                    
                    <Form.Control 
                    type="file"
                    maxlength="150" 
                    multiple
                    onChange={(e)=>completeFieldFiles(e)}
                    name="evidence"/>
                    {
                Object.values(props.body.evidence) &&
                Object.values(props.body.evidence).map((f )=> {return (<Button name={f.name} onclick={deleteFiles(f.name)}>{f.name}</Button>)})
                    }
                    
                    
                </Form.Group>   
                

                {/*<Form.Group controlId="formGridAddress1">
                <Form.Label>Evidencia</Form.Label>
                <div className="custom-file">
                <Form.Control
                    type="file"
                    className="custom-file-input"
                     id="validatedCustomFile"
                    multiple
                    value ={body.evidence}
                    name="evidence"
                    onChange={(e) => completeField(e)}/>
                <Form.Label className="custom-file-label" htmlFor="validatedCustomFile">
                    Choose file...
                </Form.Label>
                </div>
            </Form.Group>*/}

                

                {/*<Form.Group controlId="formGridAddress1">
                <Form.Label>Padres ¿que deveria ingresar aca?</Form.Label>
                <Form.Control 
                    placeholder="Ingrese" 
                    maxlength="150" 
                    name="name"/>
                </Form.Group>*/}
                 
            </Form>
            <Modal size='lg' show={modalCreate} onHide={() => setModalCreate(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <Row>    
                        <Col>                 
                            <Card>
                            <Card.Header> 
                                    <Row>
                                        <Col>
                                            <Card.Title as="h5">Artefacto</Card.Title>
                                            <span className="d-block m-t-5">Crear Artefacto</span>
                                        </Col>
                                        <Col sm={12} lg={2}>                       
                                            <CloseButton aria-label='Cerrar' onClick={() => setModalCreate(false)} />
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                <FormArtifact 
                                     body={bodyArtifact} setBody={setBodyArtifact}
                                    ifConfirm={createArtifact} ifCancel={() => setModalCreate(false)} />
                                </Card.Body>
                            </Card>
                        </Col> 
                    </Row>
                </Modal.Body>
            </Modal>
        
            
                
                 
            
            
        </Card.Body>
        </Card>
        <Button variant="primary" onClick={props.createEvent} >Guardar</Button> 
        <Button variant="primary" href="./list-event">Cancelar</Button>  
            
    </div>
  )
}
export default FormEvent