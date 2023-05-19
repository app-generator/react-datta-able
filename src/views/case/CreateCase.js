import React, { useState, useEffect, lazy } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { postCase } from '../../api/services/cases';
import FormCase from './components/FormCase';
import Navigation from '../../components/Navigation/Navigation';
import { getStates } from '../../api/services/states';
import Alert from '../../components/Alert/Alert';

const CreateCase = () => {
    const [date, setDate] = useState(null) //required
    const [lifecycle, setLifecycle] = useState('0') //required
    const parent = null; 
    const [priority, setPriority] = useState('0') //required
    const [tlp, setTlp] = useState('0') //required
    const [assigned, setAssigned] = useState(null)
    
    const [state, setState] = useState('0') //required
    const [allStates, setAllStates] = useState([]) //multiselect

    const [comments, setComments] = useState([]) // ??
    
    const [evidences, setEvidences] = useState() 

    const [attend_date, setAttend_date] = useState(null) //imprime la hora actual +3horas
    const [solve_date, setSolve_date] = useState(null)

    //Alert
    const [showAlert, setShowAlert] = useState(false);

    useEffect(()=> {

        getStates()
            .then((response) => {
                console.log(response);
                let listStates = []
                response.data.results.map((stateItem)=>{
                    listStates.push({value:stateItem.url, label:stateItem.name, childrenUrl:stateItem.children})
                })
                setAllStates(listStates)

                console.log(response.data.results)
            })
            .catch((error)=>{
                console.log(error)
            })

        },[])

    //Create
    const addCase = () => {
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

        postCase(form)
        //postCase(date, lifecycle, parent, priority, tlp, assigned, state, comments, evidences, attend_date, solve_date)
        .then((response) => { 
            console.log(response)
            window.location.href = "/cases"
        })
        .catch((error) => {
            console.log(error.data)
            setShowAlert(true)
        });    
    };

    return (
        <React.Fragment>
            <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)}/> 
            <Row>
                <Navigation actualPosition="Crear Caso" path="/cases" index ="Casos"/>
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Casos</Card.Title>
                            <span className="d-block m-t-5">Agregar Caso</span>
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

                                        ifConfirm={addCase} edit={false} save='Crear'/>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CreateCase;
