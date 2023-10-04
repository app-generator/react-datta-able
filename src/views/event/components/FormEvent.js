import React,{useState, useEffect} from 'react'
import { Row, Card, Form, Button,Col, Modal, CloseButton } from 'react-bootstrap'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CrudButton from '../../../components/Button/CrudButton';
import FormArtifact from '../../artifact/components/FormArtifact'
import FileUpload  from '../../../components/UploadFiles/FileUpload/FileUpload'
import FileList from '../../../components/UploadFiles/FileList/FileList'
import { postArtifact } from "../../../api/services/artifact";
import { postStringIdentifier } from "../../../api/services/stringIdentifier";
import Alert from '../../../components/Alert/Alert';

const animatedComponents = makeAnimated();
//{createEvent, setBody, body, feeds, taxonomy, tlp, priorities, users, listArtifact, setContactsCreated}
const FormEvent = (props) => {
    const [artifactsValueLabel, setArtifactsValueLabel] = useState([])
    const [modalCreate, setModalCreate] = useState(false)
    const [error,setError]=useState()
    const [typeArtifact, setTypeArtifact] = useState('0')
    const [value, setValue] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const resetShowAlert = () => {
        setShowAlert(false);
    } 

    useEffect(()=> {

        let listDefaultArtifact = props.listArtifact.filter(elemento => props.body.artifacts.includes(elemento.value))
        .map(elemento => ({value: elemento.value, label:elemento.label}))

        setArtifactsValueLabel(listDefaultArtifact)
    
    },[props.body.artifacts, props.listArtifact])

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

    const completeField=(event)=>{ 
        props.setBody({...props.body,
            [event.target.name] : event.target.value}
        )       
    };

    const selectArtefact=(event)=>{ 
        props.setBody({...props.body,
            ["artifacts"] : event.map((e)=>{
                return e.value
            })}
        )
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const filesToUpload = event.dataTransfer.files
        props.setEvidence([...props.evidence, ...filesToUpload]);
    };

    const removeFile = (position) => {
        if (props.evidence.length>0){
            props.setEvidence(props.evidence.filter((file, index) => index !== position));
        }
    };
    
    const createArtifact = () => {
        console.log(value)
        //postArtifact(typeArtifact, Math.floor(value)) por que use un Math.floor(value) no me acuerdo
        postArtifact(typeArtifact, value)
        .then((response) => { 
            props.setContactsCreated(response) //
            setModalCreate(false) //
            setTypeArtifact("-1")
            setValue("")
        })
        .catch((error) => {
            setError(error)
        }).finally(() => {
            setModalCreate(false)
        })  
    };

  return (
    <div>
        <Card>
            <Card.Header>
                <Card.Title as="h5">Principal</Card.Title>
            </Card.Header>
            <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>
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
                            onChange={(e)=>completeField(e)} 
                            isInvalid={props.body.tlp === "-1"}>
                            <option value="-1">Seleccione un tlp</option>
                            {props.tlp.map((tlp) => {
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
                            onChange={(e)=>completeField(e)} 
                            isInvalid={props.body.taxonomy === "-1"}>
                            <option value="-1">Seleccione una taxonomia</option>
                            {props.taxonomy.map((taxonomy) => {
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
                        onChange={(e)=>completeField(e)} 
                        isInvalid={props.body.feed === "-1"}>
                        <option value="-1">Seleccione una Fuente de Informacion</option>
                        {props.feeds.map((feed) => {
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
                        onChange={(e)=>completeField(e)} 
                        isInvalid={props.body.priority === "-1"}>
                        <option value="-1">Seleccione una Prioridad</option>
                        {props.priorities.map((priority) => {
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
                        onChange={(e)=>completeField(e)}>
                        <option value="">Seleccione al usuario que reporta</option>
                        {props.users.map((user) => {
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
                                    options={props.listArtifact}/>
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
            <Form.Label>CIDR, Domino o Email</Form.Label>
                <Row>
                <Col sm={12} lg={6}>
                    <Form.Group controlId="formGridAddress1">
                    <Form.Control 
                        placeholder="Ingrese IPv4,IPv6, Nombre de domino o Email" 
                        maxlength="150" 
                        value ={props.body.address_value} 
                        onChange={(e)=>completeFieldStringIdentifier(e)}
                        isInvalid={showErrorMessage || props.body.address_value === ""}
                        name="address_value"/>
                        {showErrorMessage  || props.body.address_value === ""  ?  <div className="invalid-feedback"> Debe ingresar IPv4,IPv6, Nombre de domino o Email</div>  : "" }
                    </Form.Group> 
                </Col>
            </Row>
                </Card.Body>
                </Card>
        <Card>
            <Card.Header>
                <Card.Title as="h5">Evidencias</Card.Title>
            </Card.Header>
        <Card.Body>
            <Form>   
                <Form.Group controlId="formGridAddress1">
                    <div
                        className="dropzone"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}>
                        <FileUpload files={props.evidence} setFiles={props.setEvidence} removeFile={removeFile} />
                        <FileList files={props.evidence} removeFile={removeFile} />
                    </div>
                </Form.Group>    
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
                                     value={value} setValue={setValue}
                                     type={typeArtifact} setType={setTypeArtifact}
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
        <Button variant="primary" href="/events">Cancelar</Button>      
    </div>
  )
}
export default FormEvent