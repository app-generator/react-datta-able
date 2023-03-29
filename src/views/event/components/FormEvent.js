import React,{useState, useEffect} from 'react'
import { Row, Card, Form, Button,Col, Modal, CloseButton } from 'react-bootstrap'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CrudButton from '../../../components/Button/CrudButton';
import FormArtifact from '../../artifact/components/FormArtifact'
import { postArtifact } from "../../../api/services/artifact";


//import TableArtifact from './artifact/tableArtifact';

const animatedComponents = makeAnimated();

const FormEvent = ({createEvent, setBody, body, feeds, taxonomy, tlp, priorities, users, listArtifact, setContactsCreated}) => {
    const [artifactsValueLabel, setArtifactsValueLabel] = useState([])
    const [modalCreate, setModalCreate] = useState(false)
    const [error,setError]=useState()
    const [bodyArtifact, setBodyArtifact] = useState({
        type:"-1",
        value:""
    })
    console.log(body.evidence)

    useEffect(()=> {

        let listDefaultArtifact = listArtifact.filter(elemento => body.artifacts.includes(elemento.value))
        .map(elemento => ({value: elemento.value, label:elemento.label}))

        setArtifactsValueLabel(listDefaultArtifact)
    
    },[body.artifacts, listArtifact])

    const completeField=(event)=>{ 
        console.log(event.target.value)
        setBody({...body,
            [event.target.name] : event.target.value}
        )       
    }
    const completeFieldFiles=(event)=>{ 
        setBody({...body,
            [event.target.name] : event.target.files}
        )       
    }

    const selectArtefact=(event)=>{ 
        setBody({...body,
            ["artifacts"] : event.map((e)=>{
                return e.value
            })}
        )
        console.log(body.artifacts)
    }
    
    
    const createArtifact = () => {
        console.log(body.value)
        postArtifact(bodyArtifact.type, Math.floor(bodyArtifact.value))
        .then((response) => { 
            setContactsCreated(response) //
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
                    <th></th>
                    <Form.Group controlId="formGridAddress1">
                    <Form.Label>Fecha </Form.Label>
                    <Form.Control 
                        type ="date"
                        placeholder="Ingrese" 
                        maxlength="150" 
                        value ={body.date.slice(0,10)} 
                        onChange={(e)=>completeField(e)}
                        name="date"/>
                    </Form.Group>

                   
                <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>TLP</Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="tlp" 
                    value ={body.tlp} 
                    onChange={(e)=>completeField(e)} isInvalid={body.tlp === "-1"}
                    isValid={body.tlp !== "-1"}>
                    <option value="-1">Seleccione un tlp</option>
                    {tlp.map((tlp, index) => {
                        return(<option value={tlp.url}> {tlp.name} </option>)
                    })}
                 
                </Form.Control>
                {(body.tlp !== "-1") ? '' : <div className="invalid-feedback">Seleccione un tlp</div>}
                </Form.Group>
                    

                <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Taxonomia</Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="taxonomy" 
                    value ={body.taxonomy} 
                    onChange={(e)=>completeField(e)} isInvalid={body.taxonomy === "-1"}
                    isValid={body.taxonomy !== "-1"}>
                    <option value="-1">Seleccione una taxonomia</option>
                    {taxonomy.map((taxonomy, index) => {
                        return(<option value={taxonomy.url}> {taxonomy.name} </option>)
                    })}
                 
                </Form.Control>
                {(body.taxonomy !== "-1") ? '' : <div className="invalid-feedback">Seleccione una taxonomia</div>}
                
                </Form.Group>

                  
                    <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Fuente de Informacion</Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="feed" 
                    value ={body.feed} 
                    onChange={(e)=>completeField(e)} isInvalid={body.feed === "-1"}
                    isValid={body.feed !== "-1"}>
                    <option value="-1">Seleccione una Fuente de Informacion</option>
                    {feeds.map((feed, index) => {
                        return(<option value={feed.url}> {feed.name} </option>)
                    })}
                 
                </Form.Control>
                {(body.feed !== "-1") ? '' : <div className="invalid-feedback">Seleccione una Fuente de Informacion</div>}
                </Form.Group>

                

                 <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Prioridades</Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="priority" 
                    value ={body.priority} 
                    onChange={(e)=>completeField(e)} isInvalid={body.priority === "-1"}
                    isValid={body.priority !== "-1"}>
                    <option value="-1">Seleccione una Prioridad</option>
                    {priorities.map((priority, index) => {
                        return(<option value={priority.url}> {priority.name} </option>)
                    })}
                 
                </Form.Control>
                {(body.priority !== "-1") ? '' : <div className="invalid-feedback">Seleccione una Prioridad</div>}
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Usuario que reporta</Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="reporter" 
                    value ={body.reporter} 
                    onChange={(e)=>completeField(e)} isInvalid={body.reporter === "-1"}
                    isValid={body.priority !== "-1"}>
                    <option value="-1">Seleccione al usuario que reporta</option>
                    {users.map((user, index) => {
                        return(<option value={user.url}> {user.username} </option>)
                    })}
                 
                </Form.Control>
                {(body.reporter !== "-1") ? '' : <div className="invalid-feedback">Seleccione una Fuente de Informacion</div>}
                </Form.Group>

                <Form.Group controlId="formGridAddress1">
                <Form.Label>Notas</Form.Label>
                <Form.Control 
                    placeholder="Ingrese " 
                    maxlength="150" 
                    value ={body.notes} 
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
                                    options={listArtifact}
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
                    value ={body.cidr} 
                    onChange={(e)=>completeField(e)}
                    name="cidr"/>
                </Form.Group>  

                <Form.Group controlId="formGridAddress1">
                <Form.Label>Dominio afectado</Form.Label>
                <Form.Control 
                    placeholder="Ingrese" 
                    maxlength="150"
                    value ={body.domain} 
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
            <Form>   
                <Form.Group controlId="formGridAddress1">
                <Form.Label>Evidencia</Form.Label>
                    
                    <Form.Control 
                    type="file"
                    placeholder="Ingrese " 
                    maxlength="150" 
                    multiple
                    onChange={(e)=>completeFieldFiles(e)}
                    name="evidence"/>
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
            <Card>
            
            <Card.Body>
            
                <Button variant="primary" onClick={createEvent} >Guardar</Button> 
                <Button variant="primary" href="./list-event">Cancelar</Button>  
                 
            
            </Card.Body>
            </Card>
    </div>
  )
}
export default FormEvent