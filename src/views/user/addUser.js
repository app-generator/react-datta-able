import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Breadcrumb } from 'react-bootstrap';
import { postUser } from "../../api/services/users";

import Alert from '../../components/Alert/Alert';
import {activateBooton} from './fieldsForm'
import {formUser} from './formUser'


const AddUser = () => {
        
    const formEmpty={ 
        username: "", 
        first_name: "", 
        last_name: "", 
        email: "", 
        priority: '-1' }

    const[error,setError]=useState()
    const[body,setBody]=useState(formEmpty)
    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)

    useEffect( ()=> {
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

    
    
    const createUser=(e)=>{
 
        postUser(body.username,body.first_name,body.last_name,body.email,body.priority)
        .then((response) => { 
            console.log(response)
            sessionStorage.setItem('Alerta', JSON.stringify({name:`El usuario ${body.username} ha sido creada`, type:1}));
            window.location.href = "/list-user"
        })
        .catch((error) => {
            setError(error)
            console.log(error)
            setAlert({name:`El usuario ${body.username} NO ha sido creada`, type:0})
        });  
   
    }

    return (
        <>
        <Alert alert={alert} stateAlert={stateAlert} />
          <Card>
          <Breadcrumb>
                    <Breadcrumb.Item href="./app/dashboard/default">
                        <i className="feather icon-home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/list-user">
                        <i className="fas fa-network-wired" /> Usuarios
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <b>Agregar Usuario</b>
                    </Breadcrumb.Item>
                </Breadcrumb>  
          
                        <Card.Header>
                            <Card.Title as="h5">Agregar Usuario</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form >
                                {formUser(body, setBody)}
                                
                                {(activateBooton(body)) ? 
                                    <><Button variant="primary" onClick={createUser} >Guardar</Button></>
                                    : 
                                    <><Button variant="primary" disabled>Guardar</Button></> }
                                    <Button variant="primary" href="/list-user">Cancelar</Button>
                    

                            </Form>
                        </Card.Body>
                    </Card>
            
        </>
    )
}

export default AddUser
