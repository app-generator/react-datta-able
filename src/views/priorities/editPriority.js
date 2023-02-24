import React, { useState, useEffect } from 'react'
import { Row, Card } from 'react-bootstrap';
import FormPriority from './components/formPriority'

import Navigation from '../../components/navigation/navigation'
import { putPriority} from "../../api/services/priorities";
import { useLocation } from "react-router-dom";
import Alert from '../../components/Alert/Alert';

const EditPriority = () => {
    
    const location = useLocation();
    const priority = location.state.priority;
    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)
    const [error,setError]=useState()
    const [body,setBody]=useState(priority)
    useEffect( ()=> {
        var hourSolveDeadline=""
        var daySolveDeadline=""
        var dayAttendDeadline=""
        var hourAttendDeadline=""
        if (priority.attend_deadline !== ""){
            dayAttendDeadline = priority.attend_deadline.split(" ")[1] ? priority.attend_deadline.split(" ")[0] : ""
            hourAttendDeadline = priority.attend_deadline.split(" ")[1] ? priority.attend_deadline.split(" ")[1] : priority.attend_deadline.split(" ")[0]
        }
        if (priority.solve_deadline !== ""){
            daySolveDeadline = priority.solve_deadline.split(" ")[1] ? priority.solve_deadline.split(" ")[0] : ""
            hourSolveDeadline = priority.solve_deadline.split(" ")[0] ? priority.solve_deadline.split(" ")[1] : priority.solve_deadline.split(" ")[0]
        }
        const form={ 
            url:priority.url,
            name: priority.name, 
            color: priority.color, 
            severity:priority.severity,
            dayAttendDeadline: dayAttendDeadline,
            hourAttendDeadline:hourAttendDeadline,
            daySolveDeadline: daySolveDeadline,
            hourSolveDeadline: hourSolveDeadline
        }
        setBody(form)

        
    },[]);

    const editPriority=()=>{
        "severity es primary key"
        "nombre se puede repetir pero es requerido"
        "color es requerido , ¿se puede repetir?"

        const attendDeadline = (body.daySolveDeadline ? body.daySolveDeadline+" ":"")+ body.hourAttendDeadline 
        const solveDeadline= (body.dayAttendDeadline ? body.dayAttendDeadline+" ":"")+ body.hourSolveDeadline 

        putPriority(body.url, body.name,body.color,body.severity, attendDeadline, solveDeadline)
        .then((response) => { 
            console.log(response)
            window.location.href = "/list-Priorities"
        }).catch((error) => {
            setError(error)
            console.log(error)
            setAlert({name:`El usuario ${body.username} NO ha sido creada`, type:0})
            setTimeout(() => {
                setAlert(null)
                setStateAlert(null)
            }, 3000);
        }); 

    }
  return (
    <>
        <Card>
            <Alert alert={alert} stateAlert={stateAlert} />
            <Row>
                <Navigation actualPosition="Editar prioridad" path="./list-Priorities" index ="Prioridades"/>
            </Row>
            <Card.Header>
                <Card.Title as="h5">Editar Prioridad</Card.Title>
            </Card.Header>
            <FormPriority body={body} setBody={setBody} createPriority={editPriority} />
        </Card>
  </>
    
  )
}

export default EditPriority