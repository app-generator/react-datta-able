import React, { useEffect, useState } from 'react';
import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import { getAllPriorities } from '../../../api/services/priorities';
import { getTLP } from '../../../api/services/tlp';
import { getAllUsers } from '../../../api/services/users';
import ViewFiles from '../../../components/Button/ViewFiles';
import FileUpload  from '../../../components/UploadFiles/FileUpload/FileUpload'
import FileList from '../../../components/UploadFiles/FileList/FileList'
import Alert from '../../../components/Alert/Alert';
import { getAllStates } from '../../../api/services/states';


const ModalFormCase = (props) => {
    
    

    //select
    const [allPriorities, setAllPriorities ] = useState([])
    const [allTlp, setAllTlp] = useState([])
    const [allUsers, setAllUsers] = useState([])
    //commet
    const [ comm, setComm ] = useState();

    const [showAlert, setShowAlert] = useState(false);
    const [allStates, setAllStates] = useState([]) //multiselect


    useEffect(()=> {

        getAllStates()
        .then((response) => {
            console.log(response);
            let listStates = []
            response.map((stateItem)=>{
                listStates.push({value:stateItem.url, label:stateItem.name, childrenUrl:stateItem.children})
            })
            setAllStates(listStates)

          
        })
        .catch((error)=>{
            console.log(error)
        })
      
        getAllPriorities()
        .then((response) => {
            setAllPriorities (Object.values(response))
            console.log(response)
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

        getAllUsers()
        .then((response) => {
            setAllUsers(response)
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
        })


    },[])

    const completeField=(event)=>{ 
        props.setBody({...props.body,
            [event.target.name] : event.target.value}
        )       
    };

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


    /***************************************/
    const handleDragOver = (event) => {
        event.preventDefault();
        console.log('1-------------------------')
      }
    const handleDrop = (event) => {
        console.log('2-------------------------')
        event.preventDefault();
        const filesToUpload = event.dataTransfer.files
        props.setEvidences([...props.evidences, ...filesToUpload]);
        console.log('3-------------------------')
    };
    const removeFile = (position) => {
        if (props.evidences.length>0){
            props.setEvidences(props.evidences.filter((file, index) => index !== position));
        }
      }
/********************************************** */
  return (
    <React.Fragment>  
    <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)} component="case"/>

    <Card>
        <Card.Header>
            <Card.Title as="h5">Propiedades del nuevo caso</Card.Title>
        </Card.Header>
        <Card.Body> 
            <Row>
                <Col lg={6} sm={12}>                        
                    <Form.Group controlId="Form.Case.Priority">
                        <Form.Label>Prioridad <b style={{color:"red"}}>*</b></Form.Label>
                        <Form.Control
                            name="priority"
                            type="choice"                                            
                            as="select"
                            value={props.body.priority}
                            onChange={(e) => completeField(e)}>
                            <option value='0'>Seleccione</option>
                            {allPriorities.map((priorityItem, index) => {                
                                return (
                                    <option key={index} value={priorityItem.url}>{priorityItem.name}</option>
                                );
                            })}
                        </Form.Control>
                        {props.body.priority ? '' : <div className="invalid-feedback">Seleccione la prioridad</div>}
                    </Form.Group>
                </Col>
                
                
                
                <Col lg={6} sm={12}>
                    <Form.Group controlId="Form.Case.Lifecycle">
                        <Form.Label>Ciclo de vida <b style={{color:"red"}}>*</b></Form.Label>
                        <Form.Control
                            name="lifecycle"
                            type="choice"                                            
                            as="select"
                            value={props.body.lifecycle}
                            onChange={(e) => completeField(e)}>
                            <option value='0'>Seleccione</option>
                            {allLifecycles.map((lifecycleItem, index) => {                
                                return (
                                    <option key={index} value={lifecycleItem.value}>{lifecycleItem.display_name}</option>
                                );
                            })}
                        </Form.Control>
                        {props.body.lifecycle ? '' : <div className="invalid-feedback">Seleccione el ciclo de vida</div>}
                    </Form.Group>
                </Col>

            </Row>
            <Row>

                <Col lg={6} sm={12}>
                    <Form.Group controlId="Form.Case.Tlp">
                        <Form.Label>TLP <b style={{color:"red"}}>*</b></Form.Label>
                        <Form.Control
                            name="tlp"
                            type="choice"                                            
                            as="select"
                            value={props.body.tlp}
                            onChange={(e) => completeField(e)}>
                            <option value='0'>Seleccione</option>
                            {allTlp.map((tlpItem, index) => {                
                                return (
                                    <option key={index} value={tlpItem.url}>{tlpItem.name}</option>
                                );
                            })}
                        </Form.Control>
                        {props.body.tlp ? '' : <div className="invalid-feedback">Seleccione</div>}
                    </Form.Group>
                </Col>



                <Col lg={6} sm={12}>
                    <Form.Group controlId="Form.Case.State">
                        <Form.Label>Estado <b style={{color:"red"}}>*</b></Form.Label>
                        <Form.Control
                            name="state"
                            type="choice"                                            
                            as="select"
                            value={props.body.state}
                            onChange={(e) => completeField(e)}>
                            <option value='0'>Seleccione</option>
                            {allStates.map((stateItem, index) => {                
                            return (
                                <option key={index} value={stateItem.value}>{stateItem.label}</option>
                            );
                        })}
                        </Form.Control>
                        {props.body.state ? '' : <div className="invalid-feedback">Seleccione el estado</div>}
                    </Form.Group>
                </Col>
            </Row>

            <Row>

                <Col lg={6} sm={12}>
                    <Form.Group controlId="Form.Case.Assigned">
                        <Form.Label>Asignado</Form.Label>
                        <Form.Control
                            name="assigned"
                            type="choice"
                            as="select"
                            value={props.body.assigned}
                            onChange={(e) => completeField(e)}>
                            <option value={null}>Sin designar</option>
                            {allUsers.map((userItem, index) => {                
                                return (
                                    <option key={index} value={userItem.url}>{userItem.username}</option>
                                );
                            })}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                 <Col lg={12} sm={12}>
                    <Form.Group controlId="Form.Case.Comments">
                        <Form.Label>Comentarios</Form.Label>
                        <Form.Control 
                            type="text"
                            name="comment" 
                            placeholder="Comentarios" 
                            maxlength="100"
                            value={props.comm} 
                            onChange={(e) => props.setComm(e)} 
                        />
                    </Form.Group>
                </Col>
            </Row>                            
                
            
        </Card.Body>
    </Card>
</React.Fragment>
  )
}

export default ModalFormCase