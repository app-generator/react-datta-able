import React, { useState, useEffect} from 'react'
import { Card, Form, Breadcrumb } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import Alert from '../../components/Alert/Alert';
import FormState from './components/formState'
import Navigation from '../../components/Navigation/Navigation'
import { putState} from "../../api/services/states";


const EditState = () => {
    const location = useLocation();
    const state = location.state.state;
    const[body,setBody]=useState(state);
    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)
    const [error,setError]=useState()

    const editState= ()=>{
        putState(body.url, body.slug, body.name, body.attended, body.solved, 1, "descripcion", body.children)
        .then((response) => { 
            console.log(response)
            sessionStorage.setItem('Alerta', JSON.stringify({name:`El usuario ${body.name} ha sido creada`, type:1}));
            window.location.href = "/list-states"
        }).catch((error) => {
            setError(error)
            console.log(error)
            setAlert({name:`El usuario ${body.name} NO ha sido creada`, type:0})
            setTimeout(() => {
                setAlert(null)
                setStateAlert(null)
            }, 3000);
        }); 

    }
  return (
    <div>
        <Navigation actualPosition="Editar Estado" path="/list-states" index ="Estados"/> 
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Editar Estado</Card.Title>
                </Card.Header>
                <Card.Body>
                <Form>
                    <FormState body={body} setBody={setBody} createState={editState} />        
                </Form>
                </Card.Body>
            </Card>
    </div>
  )
}
export default EditState
