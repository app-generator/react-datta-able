import React, { useState, useEffect } from 'react';
import { Card, Form } from 'react-bootstrap';
import { postUser } from "../../api/services/users";
import { getPriorities } from "../../api/services/priorities";
import Alert from '../../components/Alert/Alert';
import FormUser from './formUser'
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
    const [priorities, setPriorities] = useState()
    const [loading, setLoading] = useState(true)

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
    

    const createUser=(e)=>{
        
        postUser(body.username,body.first_name,body.last_name,body.email, body.priority)
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
                                <FormUser body={body} setBody={setBody} priorities={priorities} createUser={createUser} loading={loading}/>
                            </Form>
                        </Card.Body>
                    </Card>
        </>
    )
}

export default AddUser
