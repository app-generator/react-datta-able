import React, { useState } from 'react';
import { Row, Card } from 'react-bootstrap';
import FormPriority from './components/formPriority'
import Navigation from '../../components/navigation/navigation'
import { postPriority} from "../../api/services/priorities";
import Alert from '../../components/Alert/Alert';



const AddPriority = () => {
    const formEmpty={ 
        name: "", 
        color: "", 
        severity:"",
        dayAttendDeadline:"",
        hourAttendDeadline:"",
        daySolveDeadline: "",
        hourSolveDeadline: ""
        }
    const [body,setBody]=useState(formEmpty)
    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)
    const [error,setError]=useState()


    const createPriority=()=>{
        "severity es primary key"
        "nombre se puede repetir pero es requerido"
        "color es requerido , ¿se puede repetir?"
        const attendDeadline = (body.dayAttendDeadline ? body.dayAttendDeadline+" ":"")+body.hourAttendDeadline
        console.log(attendDeadline)

        const solveDeadline = (body.daySolveDeadline ? body.daySolveDeadline+" ":"")+body.hourSolveDeadline
        console.log(solveDeadline)

        postPriority(body.name,body.color,body.severity,attendDeadline, solveDeadline)
        .then((response) => { 
            console.log(response)
            sessionStorage.setItem('Alerta', JSON.stringify({name:`El usuario ${body.username} ha sido creada`, type:1}));
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
            <Alert alert={alert} stateAlert={stateAlert} />
            <Navigation actualPosition="Agregar Prioridad" path="./list-Priorities" index ="Prioridades"/>
        
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Agregar Prioridad</Card.Title>
                </Card.Header>
                <FormPriority body={body} setBody={setBody} createPriority={createPriority} />
          </Card>  
        </>
    )
}

export default AddPriority