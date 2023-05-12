import React, { useState, useEffect } from 'react';
import { Card, Form } from 'react-bootstrap';
import { postUser } from "../../api/services/users";
import { getPriorities } from "../../api/services/priorities";
import Alert from '../../components/Alert/Alert';
import setAlert from '../../utils/setAlert';
import FormUser from './components/FormUser'
import Navigation from '../../components/Navigation/Navigation'



const AddUser = () => {    
    const formEmpty={ 
        username: "", 
        first_name: "", 
        last_name: "", 
        email: "", 
        priority: '-1',
        password: ""}

    const [error,setError]=useState()
    const [body,setBody]=useState(formEmpty)
    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)
    const [priorities, setPriorities] = useState()
    const [loading, setLoading] = useState(true)
    const [showAlert, setShowAlert] = useState(false)

    useEffect( ()=> {
        const fetchPosts = async () => {
            setLoading(true)
            getPriorities().then((response) => { 
                setPriorities(response.data.results)
            })
            .catch((error) => {
                setError(error)
                
            }).finally(() => {
                setLoading(false)
            })
        }  
        fetchPosts()
        if(sessionStorage.getItem('Alerta')) {
            const storage = JSON.parse(sessionStorage.getItem('Alerta'));
            setAlert(storage)
                setTimeout(() => {
                    setAlert(null)
                    setStateAlert(null)
                    sessionStorage.removeItem('Alerta')
                }, 5000);
        }
    },[]);

    const resetShowAlert = () => {
        setShowAlert(false);
    }

    const createUser=(e)=>{
        
        postUser(body.username,body.first_name,body.last_name,body.email, body.priority)
        .then(() => {
            window.location.href = '/users';
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
        <>
            <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>
            <Navigation actualPosition="Agregar Usuario" path="/users" index ="Usuarios"/>
            <Card>
                <Card.Header>
                
                    <Card.Title as="h5">Agregar Usuario</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form >
                        <FormUser body={body} setBody={setBody} priorities={priorities} createUser={createUser} loading={loading} />
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default AddUser
