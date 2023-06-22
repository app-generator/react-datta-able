import React, { useEffect, useState } from 'react';
import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import { getPriorities } from '../../../api/services/priorities';
import { getTLP } from '../../../api/services/tlp';
import { getUsers } from '../../../api/services/users';
import ViewFiles from '../../../components/Button/ViewFiles';
import FileUpload  from '../../../components/UploadFiles/FileUpload/FileUpload'
import FileList from '../../../components/UploadFiles/FileList/FileList'

const FormCase = (props) => { 
// props: ifConfirm, save, date, setDate, lifecycle, setLifecycle, priority, setPriority, tlp, setTlp, state, setState
// put: commentarios, 
// evidencia, solve_date, attend_date

//select
const [allPriorities, setAllPriorities ] = useState([])
const [allTlp, setAllTlp] = useState([])
const [allUsers, setAllUsers] = useState([])


    useEffect(()=> {
        
        getPriorities()
        .then((response) => {
            setAllPriorities (Object.values(response.data.results))
            console.log(response.data.results)
        })
        .catch((error)=>{
            console.log(error)
        })

        getTLP()
        .then((response) => {
            setAllTlp(response.data.results)
            console.log(response.data.results)
        })
        .catch((error)=>{
            console.log(error)
        })

        getUsers()
        .then((response) => {
            setAllUsers(response.data.results)
            console.log(response.data.results)
        })
        .catch((error)=>{
            console.log(error)
        })


    },[props.allStates])
     

    const allLifecycles = [
        {
            value: "manual",
            display_name: "Manual"
        },
        {
            value: "auto",
            display_name: "Auto"
        },
        {
            value: "auto_open",
            display_name: "Auto open"
        },
        {
            value: "auto_close",
            display_name: "Auto close"
        }
    ]
    
    //
    const selectEvidences = (event) => {
        const filesEvidence = event.target.files;
        console.log(filesEvidence)
        const evidences = [];
        for (let i = 0; i < filesEvidence.length; i++) {
          evidences.push(filesEvidence[i]);
        }
        props.setEvidences(evidences);
      }

    /***************************************/
    const handleDragOver = (event) => {
        event.preventDefault();
      }
    const handleDrop = (event) => {
        event.preventDefault();
        const filesToUpload = event.dataTransfer.files
        props.setEvidences([...props.evidences, ...filesToUpload]);
    };
    const removeFile = (position) => {
        if (props.evidences.length>0){
            props.setEvidences(props.evidences.filter((file, index) => index !== position));
        }
      }

    return (
        <React.Fragment>    
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Fechas</Card.Title>
                </Card.Header>
                <Card.Body> 
                    <Row>
                        <Col lg={4} sm={12}>
                            <Form.Group controlId="Form.Case.Date">
                                <Form.Label>Fecha de ocurrencia</Form.Label>
                                <Form.Control type="datetime-local" //2023-03-24T01:40:14.181622Z 
                                    value={props.date} //yyyy-mm-ddThh:mm
                                    min="2000-01-01T00:00" max="2030-01-01T00:00" 
                                    isInvalid={props.date == null}
                                    isValid={props.date !== null}
                                    onChange={(e) =>  props.setDate(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col lg={4} sm={12}>
                            <Form.Group controlId="Form.Case.Attend_date">
                                <Form.Label>Fecha de atencion</Form.Label>
                                <Form.Control type="datetime-local"
                                    value={props.attend_date} //yyyy-mm-ddThh:mm
                                    min="2000-01-01T00:00" max="2030-01-01T00:00" 
                                    onChange={(e) =>  props.setAttend_date(e.target.value)}/>
                            </Form.Group> 
                        </Col>
                        <Col sm={12} lg={4}>
                            <Form.Group controlId="Form.Case.Solve_date">
                                <Form.Label>Fecha de resolucion</Form.Label>
                                <Form.Control type="datetime-local"
                                    value={props.solve_date} //yyyy-mm-ddThh:mm
                                    min="2000-01-01T00:00" max="2030-01-01T00:00" 
                                    onChange={(e) =>  props.setSolve_date(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>


            <Card>
                <Card.Header>
                    <Card.Title as="h5">Principal</Card.Title>
                </Card.Header>
                <Card.Body> 
                    <Row>
                        <Col lg={3} sm={12}>                        
                            <Form.Group controlId="Form.Case.Priority">
                                <Form.Label>Prioridad</Form.Label>
                                <Form.Control
                                    name="priority"
                                    type="choice"                                            
                                    as="select"
                                    value={props.priority}
                                    isInvalid={props.priority == '0'}
                                    isValid={props.priority !== '0'}
                                    onChange={(e) =>  props.setPriority(e.target.value)}>
                                    <option value='0'>Seleccione</option>
                                    {allPriorities.map((priorityItem, index) => {                
                                        return (
                                            <option key={index} value={priorityItem.url}>{priorityItem.name}</option>
                                        );
                                    })}
                                </Form.Control>
                                {props.priority ? '' : <div className="invalid-feedback">Seleccione la prioridad</div>}
                            </Form.Group>
                        </Col>
                        
                        
                        
                        <Col lg={3} sm={12}>
                            <Form.Group controlId="Form.Case.Lifecycle">
                                <Form.Label>Ciclo de vida</Form.Label>
                                <Form.Control
                                    name="lifecycle"
                                    type="choice"                                            
                                    as="select"
                                    value={props.lifecycle}
                                    isInvalid={props.lifecycle == '0'}
                                    isValid={props.lifecycle !== '0'}
                                    onChange={(e) =>  props.setLifecycle(e.target.value)}>
                                    <option value='0'>Seleccione</option>
                                    {allLifecycles.map((lifecycleItem, index) => {                
                                        return (
                                            <option key={index} value={lifecycleItem.value}>{lifecycleItem.display_name}</option>
                                        );
                                    })}
                                </Form.Control>
                                {props.lifecycle ? '' : <div className="invalid-feedback">Seleccione el ciclo de vida</div>}
                            </Form.Group>
                        </Col>




                        <Col lg={3} sm={12}>
                            <Form.Group controlId="Form.Case.Tlp">
                                <Form.Label>TLP</Form.Label>
                                <Form.Control
                                    name="tlp"
                                    type="choice"                                            
                                    as="select"
                                    value={props.tlp}
                                    isInvalid={props.tlp == '0'}
                                    isValid={props.tlp !== '0'}
                                    onChange={(e) =>  props.setTlp(e.target.value)}>
                                    <option value='0'>Seleccione</option>
                                    {allTlp.map((tlpItem, index) => {                
                                        return (
                                            <option key={index} value={tlpItem.url}>{tlpItem.name}</option>
                                        );
                                    })}
                                </Form.Control>
                                {props.tlp ? '' : <div className="invalid-feedback">Seleccione</div>}
                            </Form.Group>
                        </Col>



                        <Col lg={3} sm={12}>
                            <Form.Group controlId="Form.Case.State">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control
                                    name="state"
                                    type="choice"                                            
                                    as="select"
                                    value={props.state}
                                    isInvalid={props.state == '0'}
                                    isValid={props.state !== '0'}
                                    onChange={(e) =>  props.setState(e.target.value)}>
                                    <option value='0'>Seleccione</option>
                                    {props.allStates.map((stateItem, index) => {                
                                    return (
                                        <option key={index} value={stateItem.value}>{stateItem.label}</option>
                                    );
                                })}
                                </Form.Control>
                                {props.state ? '' : <div className="invalid-feedback">Seleccione el estado</div>}
                            </Form.Group>
                        </Col>




                        <Col lg={3} sm={12}>
                            <Form.Group controlId="Form.Case.Assigned">
                                <Form.Label>Asignado</Form.Label>
                                <Form.Control
                                    name="assigned"
                                    type="choice"
                                    as="select"
                                    value={props.assigned}
                                    onChange={(e) =>  props.setAssigned(e.target.value)}>
                                    <option value={null}>Sin designar</option>
                                    {allUsers.map((userItem, index) => {                
                                        return (
                                            <option key={index} value={userItem.url}>{userItem.username}</option>
                                        );
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        {props.edit ? 
                        <Col lg={3} sm={12}>
                            <Form.Group controlId="Form.Case.Comments">
                                <Form.Label>Comentarios ???</Form.Label>
                                <Form.Control placeholder="Comentarios" />
                            </Form.Group>
                            </Col>                        
                        : <></>}

                    </Row>
                </Card.Body>
            </Card>
            

            {props.edit ?
            <Card>
                <Card.Header>    
                    <Card.Title as="h5">Evidencias</Card.Title>              
                </Card.Header>
                <Card.Body>
                    <Row>
                    {props.evidences.map((url, index) => {
                        console.log(url)
                        return  (
                        <Col>
                            <ViewFiles url={url} index={index+1}  />
                        </Col> )
                    })}
                        <Col>
                            <Form.Group controlId="Form.Case.Evidences.Drag&Drop">                       
                                <Form.Control 
                                type="file"
                                placeholder="Ingrese " 
                                maxlength="150" 
                                multiple
                                onChange={(e)=>selectEvidences(e)}
                                name="evidence"/>
                            </Form.Group> 
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            : 

            <Card>
                <Card.Header>    
                    <Card.Title as="h5">Evidencias</Card.Title>              
                </Card.Header>
                <Card.Body>
                    <Form.Group controlId="Form.Case.Evidences.Drag&Drop">                       
                        <Form.Control 
                            type="file"
                            placeholder="Ingrese " 
                            maxlength="150" 
                            multiple
                            onChange={(e)=>selectEvidences(e)}
                            name="evidence"/>
                    </Form.Group> 
                </Card.Body>
            </Card>

            }


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
                            <FileUpload files={props.evidences} setFiles={props.setEvidences} removeFile={removeFile} />
                            <FileList files={props.evidences} removeFile={removeFile} />
                        </div>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>


                 
            {!props.date || !props.lifecycle || !props.priority || !props.tlp || !props.state || props.ifClick  ? 
                <><Button variant="primary" disabled>{props.save}</Button></> 
                : 
                <><Button variant="primary" onClick={props.ifConfirm}>{props.save}</Button></>
            }
            <Button variant="primary" href="/cases">Cancelar</Button>
        </React.Fragment>
    );
};
            
export default FormCase;
