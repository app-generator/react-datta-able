import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { postCase } from '../../api/services/cases';
import FormCase from './components/FormCase';
import Navigation from '../../components/Navigation/Navigation';
import { getStates } from '../../api/services/states';
import { error } from 'jquery';

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
    
    const [evidences, setEvidences] = useState([]) 

    const [attend_date, setAttend_date] = useState(null) //imprime la hora actual +3horas
    const [solve_date, setSolve_date] = useState(null)

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


            const f = new FormData();
    
            f.append("comments", null)
            f.append("parent", null)
            
            f.append("date", "2023-05-04T23:25:00Z")
            f.append("lifecycle","manual")
            f.append("priority", "http://localhost:8000/api/administration/priority/5/")
            f.append("tlp", "http://localhost:8000/api/administration/tlp/4/")
            f.append("assigned", "http://localhost:8000/api/user/1/")
            f.append("state", "http://localhost:8000/api/state/8/")
            f.append("attend_date", "2023-05-04T23:25:00Z")
            f.append("solve_date", "2023-05-04T23:25:00Z")
            //f.append("evidence", evidences)
    /*        if (evidences !== null){
                for (let index=0; index< evidences.length  ; index++){
                f.append("evidence", evidences[index])
                console.log(evidences[index])
                }
            }else{
                f.append("evidence", evidences)
            }
            */

        },[])
        
    //Create
    const addCase = () => {
        postCase(f)
        .then((response) => { 
            console.log("POSTCASE")
    
            console.log(response)
        }).catch(error => console.log(error)); 
    }

    return (
        <React.Fragment>
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

                                        ifConfirm={addCase} edit={false} save='Crear'
                                        f={f}/>
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
