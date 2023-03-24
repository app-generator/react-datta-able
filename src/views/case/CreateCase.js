import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';

import Alert from '../../components/Alert/Alert';
import { postCase } from '../../api/services/cases';
import FormCase from './components/FormCase';
import Navigation from '../../components/navigation/navigation';
import { getEvents } from '../../api/services/events';
import { getStates } from '../../api/services/states';

const CreateCase = () => {
    const [date, setDate] = useState(null) //required
    const [lifecycle, setLifecycle] = useState('0') //required
    const parent = null; 
    const [priority, setPriority] = useState('0') //required
    const [tlp, setTlp] = useState('0') //required
    const [assigned, setAssigned] = useState(null)
    const [state, setState] = useState('0') //required
    
    const [comments, setComments] = useState([]) // lista de que ??
    const [evidence, setEvidence] = useState([]) // como se muestra

    const [events, setEvents] = useState([])
    const [allEvents, setAllEvents] = useState([]) //multiselect

    const [attend_date, setAttend_date] = useState(null) //imprime la hora actual +3horas
    const [solve_date, setSolve_date] = useState(null)

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

    //Create
    const addCase = () => {
        postCase(date, lifecycle, parent, priority, tlp, assigned, state, comments, evidence, events, attend_date, solve_date)
        .then((response) => { 
            console.log(response)
            window.location.href = "/case/tables"
        })
        .catch((error) => {
            setError(error)
            console.log(error)
        });    
    };

    console.log(date + ' \n ' + lifecycle + ' \n ' + parent + ' \n ' + priority + ' \n ' + tlp + ' \n ' + assigned + ' \n ' + state + ' \n ' + comments + ' \n ' + evidence + ' \n ' + events + ' \n ' + attend_date + ' \n ' + solve_date)
       
    return (
        <React.Fragment>
            <Row>
                <Navigation actualPosition="Crear Caso" path="/case/tables" index ="Casos"/>
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
                                        state={state} setState={setState} 

                                        events={events} setEvents={setEvents} allEvents={allEvents}
                                        attend_date={attend_date} setAttend_date={setAttend_date}
                                        solve_date={solve_date} setSolve_date={setSolve_date}


                                        ifConfirm={addCase} edit={false} save='POST'/>

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
