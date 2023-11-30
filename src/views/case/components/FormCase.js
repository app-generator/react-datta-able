import React, { useEffect, useState } from 'react';
import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import { getAllPriorities } from '../../../api/services/priorities';
import { getTLP } from '../../../api/services/tlp';
import { getUsers } from '../../../api/services/users';
import ViewFiles from '../../../components/Button/ViewFiles';
import FileUpload  from '../../../components/UploadFiles/FileUpload/FileUpload'
import FileList from '../../../components/UploadFiles/FileList/FileList'
import Alert from '../../../components/Alert/Alert';
import { putCase, postCase } from '../../../api/services/cases';


const FormCase = (props) => {  // props: edit, caseitem, allStates 

    const [url, setUrl] = useState(props.edit ? props.caseItem.url : null) 
    const [date, setDate] = useState(props.caseItem.date  !== null ? props.caseItem.date.substr(0,16) : '') 
    const [lifecycle, setLifecycle] = useState(props.caseItem.lifecycle) 
    const [parent, setParent] = useState(props.caseItem.parent) 
    const [priority, setPriority] = useState(props.caseItem.priority) 
    const [tlp, setTlp] = useState(props.caseItem.tlp) 
    const [assigned, setAssigned] = useState(props.caseItem.assigned)
    const [state, setState] = useState(props.caseItem.state) 
    const [comments, setComments] = useState([]) 
    const [evidences, setEvidences] = useState(props.caseItem.evidence)
    const [attend_date, setAttend_date] = useState(props.caseItem.attend_date !== null ? props.caseItem.attend_date.substr(0,16) : '') 
    const [solve_date, setSolve_date] = useState(props.caseItem.solve_date!== null ? props.caseItem.solve_date.substr(0,16) : '')

    //select
    const [allPriorities, setAllPriorities ] = useState([])
    const [allTlp, setAllTlp] = useState([])
    const [allUsers, setAllUsers] = useState([])

    //Alert
    const [showAlert, setShowAlert] = useState(false);

    //desactivar button al hacer post
    const [ifClick, setIfClick] = useState(false);

    //commet
    const [ comm, setComm ] = useState();

    useEffect(()=> {
        
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
        const evidence = [];
        for (let i = 0; i < filesEvidence.length; i++) {
          evidence.push(filesEvidence[i]);
        }
        setEvidences(evidence);
      }

    /***************************************/
    const handleDragOver = (event) => {
        event.preventDefault();
        console.log('1-------------------------')
      }
    const handleDrop = (event) => {
        console.log('2-------------------------')
        event.preventDefault();
        const filesToUpload = event.dataTransfer.files
        setEvidences([...evidences, ...filesToUpload]);
        console.log('3-------------------------')
    };
    const removeFile = (position) => {
        if (evidences.length>0){
            setEvidences(evidences.filter((file, index) => index !== position));
        }
      }
/********************************************** */

    //Edit
    const editCase = () => {
        console.log(comments)
        console.log(evidences)
        setIfClick(true);
        const form = new FormData();
        form.append("date", date)
        form.append("lifecycle",lifecycle)
        if(parent !== null) {
            form.append("parent", parent)
        }
        form.append("priority", priority)
        form.append("tlp", tlp)
        if(assigned !== null) {
            form.append("assigned", assigned)
        }
        form.append("state", state)
        form.append("attend_date", attend_date)
        form.append("solve_date", solve_date)
        //form.append("evidence", evidences)
        if (evidences !== null){
            for (let index=0; index< evidences.length  ; index++){
                form.append("evidence", evidences[index])
                console.log(evidences[index])
            }
        }/*else{
            form.append("evidence", evidences)
        }
        */
        if (comm !== null){
            let array = comments;
            array.push(comm)
            setComments((e) => [...e, comm])
            console.log(comm);
            console.log(array);
            console.log(comments);
            form.append("comments", comm)   
        }
        console.log(form)

        putCase(url, form)
        .then((response) => { 
            console.log(response)
            window.location.href = "/cases"
            
        })
        .catch((error) => {
            setShowAlert(true)
            setIfClick(false)
        });    
    };

    //Create
    const addCase = () => {
        setIfClick(true);
        const form = new FormData();
        form.append("date", date)
        form.append("lifecycle",lifecycle)
        if(parent !== null) {
            form.append("parent", parent)
        }
        form.append("priority", priority)
        form.append("tlp", tlp)
        if(assigned !== null) {
            form.append("assigned", assigned)
        }
        form.append("state", state)
        form.append("attend_date", attend_date)
        form.append("solve_date", solve_date)
        //form.append("evidence", evidences)
        if (evidences !== null){
            for (let index=0; index< evidences.length  ; index++){
            form.append("evidence", evidences[index])
            console.log(evidences[index])
            }
        }/*else{
            form.append("evidence", evidences)
        }
        */
        if (comm !== null){
            let array = comments;
            array.push(comm)
            setComments((e) => [...e, comm])
            console.log(comm);
            console.log(array);
            console.log(comments);
            form.append("comments", array)   
        }

        console.log(form)

        postCase(form)
        .then((response) => { 
            console.log(response)
            window.location.href = "/cases"

        })
        .catch((error) => {
            console.log(error.data)
            setShowAlert(true)
            setIfClick(false)
        });    
    };

    return (
        <React.Fragment>  
            <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)} component="case"/>
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Fechas</Card.Title>
                </Card.Header>
                <Card.Body> 
                    <Row>
                        <Col lg={4} sm={12}>
                            <Form.Group controlId="Form.Case.Date">
                                <Form.Label>Fecha de ocurrencia <b style={{color:"red"}}>*</b></Form.Label>
                                <Form.Control type="datetime-local" //2023-03-24T01:40:14.181622Z 
                                    value={date} //yyyy-mm-ddThh:mm
                                    min="2000-01-01T00:00" max="2030-01-01T00:00" 
                                    onChange={(e) => setDate(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col lg={4} sm={12}>
                            <Form.Group controlId="Form.Case.Attend_date">
                                <Form.Label>Fecha de atencion</Form.Label>
                                <Form.Control type="datetime-local"
                                    value={attend_date} //yyyy-mm-ddThh:mm
                                    min="2000-01-01T00:00" max="2030-01-01T00:00" 
                                    onChange={(e) => setAttend_date(e.target.value)}/>
                            </Form.Group> 
                        </Col>
                        <Col sm={12} lg={4}>
                            <Form.Group controlId="Form.Case.Solve_date">
                                <Form.Label>Fecha de resolucion</Form.Label>
                                <Form.Control type="datetime-local"
                                    value={solve_date} //yyyy-mm-ddThh:mm
                                    min="2000-01-01T00:00" max="2030-01-01T00:00" 
                                    onChange={(e) => setSolve_date(e.target.value)}/>
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
                                <Form.Label>Prioridad <b style={{color:"red"}}>*</b></Form.Label>
                                <Form.Control
                                    name="priority"
                                    type="choice"                                            
                                    as="select"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}>
                                    <option value='0'>Seleccione</option>
                                    {allPriorities.map((priorityItem, index) => {                
                                        return (
                                            <option key={index} value={priorityItem.url}>{priorityItem.name}</option>
                                        );
                                    })}
                                </Form.Control>
                                {priority ? '' : <div className="invalid-feedback">Seleccione la prioridad</div>}
                            </Form.Group>
                        </Col>
                        
                        
                        
                        <Col lg={3} sm={12}>
                            <Form.Group controlId="Form.Case.Lifecycle">
                                <Form.Label>Ciclo de vida <b style={{color:"red"}}>*</b></Form.Label>
                                <Form.Control
                                    name="lifecycle"
                                    type="choice"                                            
                                    as="select"
                                    value={lifecycle}
                                    onChange={(e) => setLifecycle(e.target.value)}>
                                    <option value='0'>Seleccione</option>
                                    {allLifecycles.map((lifecycleItem, index) => {                
                                        return (
                                            <option key={index} value={lifecycleItem.value}>{lifecycleItem.display_name}</option>
                                        );
                                    })}
                                </Form.Control>
                                {lifecycle ? '' : <div className="invalid-feedback">Seleccione el ciclo de vida</div>}
                            </Form.Group>
                        </Col>




                        <Col lg={3} sm={12}>
                            <Form.Group controlId="Form.Case.Tlp">
                                <Form.Label>TLP <b style={{color:"red"}}>*</b></Form.Label>
                                <Form.Control
                                    name="tlp"
                                    type="choice"                                            
                                    as="select"
                                    value={tlp}
                                    onChange={(e) => setTlp(e.target.value)}>
                                    <option value='0'>Seleccione</option>
                                    {allTlp.map((tlpItem, index) => {                
                                        return (
                                            <option key={index} value={tlpItem.url}>{tlpItem.name}</option>
                                        );
                                    })}
                                </Form.Control>
                                {tlp ? '' : <div className="invalid-feedback">Seleccione</div>}
                            </Form.Group>
                        </Col>



                        <Col lg={3} sm={12}>
                            <Form.Group controlId="Form.Case.State">
                                <Form.Label>Estado <b style={{color:"red"}}>*</b></Form.Label>
                                <Form.Control
                                    name="state"
                                    type="choice"                                            
                                    as="select"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}>
                                    <option value='0'>Seleccione</option>
                                    {props.allStates.map((stateItem, index) => {                
                                    return (
                                        <option key={index} value={stateItem.value}>{stateItem.label}</option>
                                    );
                                })}
                                </Form.Control>
                                {state ? '' : <div className="invalid-feedback">Seleccione el estado</div>}
                            </Form.Group>
                        </Col>




                        <Col lg={3} sm={12}>
                            <Form.Group controlId="Form.Case.Assigned">
                                <Form.Label>Asignado</Form.Label>
                                <Form.Control
                                    name="assigned"
                                    type="choice"
                                    as="select"
                                    value={assigned}
                                    onChange={(e) => setAssigned(e.target.value)}>
                                    <option value={null}>Sin designar</option>
                                    {allUsers.map((userItem, index) => {                
                                        return (
                                            <option key={index} value={userItem.url}>{userItem.username}</option>
                                        );
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col lg={3} sm={12}>
                            <Form.Group controlId="Form.Case.Comments">
                                <Form.Label>Comentarios</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="comment" 
                                    placeholder="Comentarios" 
                                    maxlength="100"
                                    value={comm} 
                                    onChange={(e) => setComm(e.target.value)} 
                                />
                            </Form.Group>
                        </Col>
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
                        {evidences.map((url, index) => {
                            console.log(url)
                            return  (
                                <Col>
                                    <ViewFiles url={url} index={index+1} /> {/*setIfDelete={setIfDelete} */}
                                </Col> )
                        })}
                    </Row>
                </Card.Body>
                <Card.Body>
                    <Form>   
                        <Form.Group controlId="Form.Case.Evidences.Drag&Drop">
                            <div
                                className="dropzone"
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}>
                                <FileUpload files={evidences} setFiles={setEvidences} removeFile={removeFile} />
                                <FileList files={evidences} removeFile={removeFile} />
                            </div>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>

            : 

            <Card>
                <Card.Header>    
                    <Card.Title as="h5">Evidencias</Card.Title>              
                </Card.Header>
                <Card.Body>
                    <Form>   
                        <Form.Group controlId="Form.Case.Evidences.Drag&Drop">
                            <div
                                className="dropzone"
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}>
                                <FileUpload files={evidences} setFiles={setEvidences} removeFile={removeFile} />
                                <FileList files={evidences} removeFile={removeFile} />
                            </div>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>

            }
                 
            {!date || !lifecycle || !priority || !tlp || !state || ifClick  ? 
                <><Button variant="primary" disabled>{props.save}</Button></> 
                : 
                <><Button variant="primary" onClick={props.edit ? editCase : addCase}>{props.save}</Button></>
            }
            <Button variant="primary" href="/cases">Cancelar</Button>
        </React.Fragment>
    );
};
            
export default FormCase;
