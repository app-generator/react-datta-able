import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import { putCase } from '../../api/services/cases';
import FormCase from './components/FormCase';
import Navigation from '../../components/Navigation/Navigation';
import { getState } from '../../api/services/states';
import Alert from '../../components/Alert/Alert';

const EditCase = () => {
    const location = useLocation();
    const fromState = location.state;
    const [caseItem, setCaseItem] = useState(fromState);

    const [url, setUrl] = useState(caseItem.url) //required
    const [date, setDate] = useState(caseItem.date  != null ? caseItem.date.substr(0,16) : '') //required
    const [lifecycle, setLifecycle] = useState(caseItem.lifecycle) //required
    const [parent, setParent] = useState(caseItem.parent) 
    const [priority, setPriority] = useState(caseItem.priority) //required
    const [tlp, setTlp] = useState(caseItem.tlp) //required
    const [assigned, setAssigned] = useState(caseItem.assigned)

    const [state, setState] = useState(caseItem.state) //required
    const [allStates, setSupportedStates] = useState([]) //multiselect

    const [comments, setComments] = useState(caseItem.comments) // ??
    
    const [evidences, setEvidences] = useState(caseItem.evidence)

    const [attend_date, setAttend_date] = useState(caseItem.attend_date != null ? caseItem.attend_date.substr(0,16) : '') //imprime la hora actual +3horas
    const [solve_date, setSolve_date] = useState(caseItem.solve_date!= null ? caseItem.solve_date.substr(0,16) : '')

    //Alert
    const [showAlert, setShowAlert] = useState(false);

    //desactivar button al hacer post
    const [ifClick, setIfClick] = useState(false);

    useEffect(()=> {

        let listStates =[]
        getState(caseItem.state)
        
            .then((response) => {
            console.log(response)
            
            listStates.push({value:response.data.url, label:response.data.name})
            let children = response.data.children;
            children.forEach((child)=>{
                getState(child)
                .then((responseChild)=>{
                    console.log(responseChild)
                    listStates.push({value:responseChild.data.url, label:responseChild.data.name})
                })
                .catch((error)=>{
                    console.log(error)
                })
            })
            console.log(listStates);
            setSupportedStates(listStates);
        })
        .catch((error)=>{
            console.log(error)
        })

        },[])

    //Edit
    const editCase = () => {
        console.log(comments)
        console.log(evidences)
        setIfClick(true);
        const form = new FormData();
        form.append("date", date)
        form.append("lifecycle",lifecycle)
        if(parent != null) {
            form.append("parent", parent)
        }
        form.append("priority", priority)
        form.append("tlp", tlp)
        if(assigned != null) {
            form.append("assigned", assigned)
        }
        form.append("state", state)
        form.append("comments", null)
        form.append("attend_date", attend_date)
        form.append("solve_date", solve_date)
        //form.append("evidence", evidences)
        if (evidences !== null){
            for (let index=0; index< evidences.length  ; index++){
            form.append("evidence", evidences[index])
            console.log(evidences[index])
            }
        }else{
            form.append("evidence", evidences)
        }
        console.log(form)

        putCase(url, form)
        //putCase(url, date, lifecycle, parent, priority, tlp, assigned, state, comments, evidences, attend_date, solve_date)
        .then((response) => { 
            console.log(response)
            window.location.href = "/cases"
        })
        .catch((error) => {
            setShowAlert(true)
            setIfClick(false)
        });    
    };

    return (
        <React.Fragment>
            <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)}/>
            <Row>
                <Navigation actualPosition="Editar Caso" path="/cases" index ="Casos"/>
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Casos</Card.Title>
                            <span className="d-block m-t-5">Editar Caso</span>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={12} lg={12}>
                                    <FormCase 
                                        date={date} setDate={setDate}
                                        lifecycle={lifecycle} setLifecycle={setLifecycle}
                                        priority={priority} setPriority={setPriority}
                                        tlp={tlp} setTlp={setTlp}
                                        assigned={assigned} setAssigned={setAssigned}
                                        state={state} setState={setState} allStates={allStates} 
                                        
                                        evidences={evidences} setEvidences={setEvidences}
                                        attend_date={attend_date} setAttend_date={setAttend_date}
                                        solve_date={solve_date} setSolve_date={setSolve_date}

                                        ifConfirm={editCase} edit={true} save='Guardar Cambios' ifClick={ifClick}/>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default EditCase;
