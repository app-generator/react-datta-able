import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getEvents } from '../../api/services/events';
import { getState } from '../../api/services/states';
import { putCase } from '../../api/services/cases';
import { Row, Col, Card } from 'react-bootstrap';
import FormCase from './components/FormCase';
import Navigation from '../../components/Navigation/Navigation';
import Alert from '../../components/Alert/Alert';

const CreateCase = () => {

    const caseItem = useLocation().state;

    const [url, setUrl] = useState(caseItem.url) //required
    const [date, setDate] = useState(caseItem.date) //required
    const [lifecycle, setLifecycle] = useState(caseItem.lifecycle) //required
    const [parent, setParent] = useState(caseItem.parent) 
    const [priority, setPriority] = useState(caseItem.priority) //required
    const [tlp, setTlp] = useState(caseItem.tlp) //required
    const [assigned, setAssigned] = useState(caseItem.assigned)
    const [state, setState] = useState(caseItem.state) //required

    const [comments, setComments] = useState(caseItem.comments) // lista de que ??
    const [evidence, setEvidence] = useState(caseItem.evidence) // como se muestra

    const [events, setEvents] = useState(caseItem.events)
    const [allEvents, setAllEvents] = useState([]) //multiselect

    const [attend_date, setAttend_date] = useState(caseItem.attend_date) //imprime la hora actual +3horas
    const [solve_date, setSolve_date] = useState(caseItem.solve_date)

    const [error, setError] = useState(null)

    useEffect(()=> {

        getEvents()
            .then((response) => {
                let listEvents = []
                response.data.results.map((eventItem)=>{
                    listEvents.push({value:eventItem.url, label:eventItem.name})
                })
                setAllEvents(listEvents)
                console.log(response.data.results)
            })
            .catch((error)=>{
                setError(error)
            })

        },[])



    //Edit
    const editCase = () => {
        putCase(url, date, lifecycle, parent, priority, tlp, assigned, state, comments, evidence, events, attend_date, solve_date)
        .then((response) => { 
            console.log(response)
            //window.location.href = "/case/tables"
        })
        .catch((error) => {
            setError(error)
            console.log(error)
        });    
    };
       
    return (
        <React.Fragment>
            <Row>
                <Navigation actualPosition="Editar Caso" path="/case/tables" index ="Casos"/>
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
                                        state={state} setState={setState} 
                                        events={events} setEvents={setEvents} allEvents={allEvents}
                                        attend_date={attend_date} setAttend_date={setAttend_date}
                                        solve_date={solve_date} setSolve_date={setSolve_date}


                                        ifConfirm={editCase} edit={true} save='PUT'/>

                                </Col>

                            </Row>
                        </Card.Body>
                    </Card>
                {/*<Alert/>*/}
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CreateCase;
