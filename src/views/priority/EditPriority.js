import React, { useState, useEffect } from 'react'
import { Row, Card, Col } from 'react-bootstrap';
import FormPriority from './components/FormPriority'

import Navigation from '../../components/Navigation/Navigation'
import { putPriority} from "../../api/services/priorities";
import { useLocation } from "react-router-dom";
import Alert from '../../components/Alert/Alert';

const EditPriority = () => {
    const location = useLocation();
    const fromState = location.state;
    const [priority, setPriority] = useState(fromState);

    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)
    const [error,setError]=useState()
    const [body,setBody]=useState(priority)
    const [showAlert, setShowAlert] = useState(false)

    useEffect( ()=> {
        let attend_time_days=""
        let attend_time_hours=""
        let attend_time_minutes=""
        let solve_time_days=""
        let solve_time_hours=""
        let solve_time_minutes=""
        if (priority.attend_time !== ""){
            attend_time_days = priority.attend_time.split(" ")[1] ? priority.attend_time.split(" ")[0] : ""
            attend_time_hours= priority.attend_time.split(" ")[1] ? priority.attend_time.split(":")[1] : priority.attend_time.split(":")[0]
            attend_time_minutes=priority.attend_time.split(" ")[1] ? priority.attend_time.split(":")[2] : priority.attend_time.split(":")[1]
        }
        if (priority.solve_time !== ""){
            solve_time_days=priority.solve_time.split(" ")[1] ? priority.solve_time.split(" ")[0] : ""
            solve_time_hours=priority.solve_time.split(" ")[1] ? priority.solve_time.split(":")[1] : priority.solve_time.split(":")[0]
            solve_time_minutes=priority.solve_time.split(" ")[1] ? priority.solve_time.split(":")[2] : priority.solve_time.split(":")[1]
            
        }
        const form={ 
            url:priority.url,
            name: priority.name, 
            color: priority.color, 
            severity:priority.severity,
            attend_time_days: attend_time_days,
            attend_time_hours: attend_time_hours,
            attend_time_minutes: attend_time_minutes,
            solve_time_days: solve_time_days,
            solve_time_hours: solve_time_hours,
            solve_time_minutes: solve_time_minutes,  
        }
        setBody(form)

        
    },[]);

    const editPriority=()=>{
        "severity es primary key"
        "nombre se puede repetir pero es requerido"
        "color es requerido , ¿se puede repetir?"
        body.attend_time_days= body.attend_time_days == "" ? "0": body.attend_time_days
        body.attend_time_hours = body.attend_time_hours=="" ? "00" : body.attend_time_hours.length == 1 ? "0"+body.attend_time_hours : body.attend_time_hours
        body.attend_time_minutes = body.attend_time_minutes == "" ? "00" : body.attend_time_minutes.length == 1 ? "0"+body.attend_time_minutes : body.attend_time_minutes

        body.solve_time_days= body.solve_time_days == "" ? "0" : body.solve_time_days
        body.solve_time_hours = body.solve_time_hours == "" ? "00":body.solve_time_hours.length == 1 ? "0"+body.solve_time_hours : body.solve_time_hours
        body.solve_time_minutes = body.solve_time_minutes ==""? "00" : body.solve_time_minutes.length == 1 ? "0"+body.solve_time_minutes : body.solve_time_minutes
        let attend_time=body.attend_time_days+" "+body.attend_time_hours+":"+body.attend_time_minutes+":00"
        let solve_time=body.solve_time_days+" "+body.solve_time_hours+":"+body.solve_time_minutes+":00"

        putPriority(body.url, body.name,body.color,body.severity, attend_time, solve_time)
        .then(() => {
            window.location.href = '/priorities';
        })
        .catch((error) => {
            setShowAlert(true) 
            setError(error);           
        })
        .finally(() => {
            setShowAlert(true) 
        }) 
    }
    const resetShowAlert = () => {
        setShowAlert(false);
    }
  return (
    <>
        <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>
        <Row>
            <Navigation actualPosition="Editar prioridad" path="/priorities" index ="Prioridades"/>
        </Row>     
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Editar Prioridad</Card.Title>
                    </Card.Header>
                    <FormPriority body={body} setBody={setBody} createPriority={editPriority} />
                </Card>
            </Col>
        </Row>
  </>
    
  )
}
export default EditPriority