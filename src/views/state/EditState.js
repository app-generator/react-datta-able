import React, { useState, useEffect} from 'react'
import { Card, Form, Breadcrumb,Row } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import Alert from '../../components/Alert/Alert';
import FormState from './components/FormState'
import Navigation from '../../components/Navigation/Navigation'
import { putState} from "../../api/services/states";
import { getStates} from "../../api/services/states";


const EditState = () => {
    const location = useLocation();
    const fromState = location.state;
    const[body,setBody]=useState(fromState);

    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)
    const [error,setError]=useState()
    const [states, setStates] = useState([])
    const [loading, setLoading] = useState(true)
    const [showAlert, setShowAlert] = useState(false)

    console.log(body)


    useEffect( ()=> {
        const fetchPosts = async () => {
            getStates().then((response) => { 
                var list= []
                console.log(response.data.results)
                response.data.results.map((state)=>{
                    list.push({value:state.url, label:state.name})
                })
                setStates(list)

            }).catch((error)=>{
                setError(error)
            })
        }  
        fetchPosts()
        
    },[]);
    const resetShowAlert = () => {
        setShowAlert(false);
    }

    const editState= ()=>{
        putState(body.url, body.slug, body.name, body.attended, body.solved, 1, body.description, body.children)
        .then(() => {
            window.location.href = '/app/states';
        })
        .catch((error) => {
            setShowAlert(true) 
            setError(error);           
        })
        .finally(() => {
            setShowAlert(true) 
        }) 
    }
  return (
    <div>
        <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>
        <Row>
            <Navigation actualPosition="Editar Estado" path="/app/states" index ="Estados"/> 
        </Row>
    
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Editar Estado</Card.Title>
                </Card.Header>
                <Card.Body>
                <Form>
                    <FormState body={body} setBody={setBody} createState={editState} childernes={states} />        
                </Form>
                </Card.Body>
            </Card>
        
    </div>
  )
}
export default EditState
