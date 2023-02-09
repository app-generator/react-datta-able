import React, { useState, useEffect } from 'react';
import { Card, Form } from 'react-bootstrap';
import { postUser } from "../../api/services/users";
import { getPriorities } from "../../api/services/priorities";
import Alert from '../../components/Alert/Alert';
import {formUser} from './formUser'
import Navigation from './commonComponents/navigation'


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
    const [listPriorities, setListPriorities] = useState({})
    const [priorities, setPriorities] = useState()

    useEffect( ()=> {
       
          
        const fetchPosts = async () => {
            getPriorities().then((response) => { 
                setPriorities(response.data.results)
                
                
                
            })
            .catch((error) => {
                setError(error)
                
            });
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
        const listPrioritiesAux=[]
        /*priorities.forEach(priority => {
            listPrioritiesAux.push(priority["name"])
            
        });
        var dic = new Object()

        priorities.forEach(priority => {
            
            dic[priority.name]=priority.url
        });
        
        setListPriorities(dic)*/
    },[]);
    console.log("prioridades------------")
    console.log(priorities)

    const createUser=(e)=>{
       
        postUser(body.username,body.first_name,body.last_name,body.email, listPriorities[body.priority])
        .then((response) => { 
            console.log(response)
            sessionStorage.setItem('Alerta', JSON.stringify({name:`El usuario ${body.username} ha sido creada`, type:1}));
            window.location.href = "/list-user"
        })
        .catch((error) => {
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
          <Card>
         <Navigation actualPosition="Agregar Usuario" path="/list-user" index ="Usuarios"/>
          
                        <Card.Header>
                            <Card.Title as="h5">Agregar Usuario</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form >
                                {formUser(body, setBody, listPriorities, createUser)}
                            </Form>
                        </Card.Body>
                    </Card>
        </>
    )
}

export default AddUser
