import React, { useState, useEffect} from 'react';
import { Card, Form} from 'react-bootstrap';
import { putUser} from "../../api/services/users";
import { useLocation } from "react-router-dom";
import Alert from '../../components/Alert/Alert';
import { getPriorities } from "../../api/services/priorities";
import FormUser from './components/FormUser'
import Navigation from '../../components/Navigation/Navigation'



const EditUser = () => {
    const location = useLocation();
    const fromState = location.state;
    const [user, setUser] = useState(fromState);

    const[error,setError]=useState()
    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)
    const[body,setBody]=useState(user)
    const [loading, setLoading] = useState(true)
    const [priorities, setPriorities] = useState()
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
    
        
    },[]);
    
    const editUser=(e)=>{
        
            putUser(body.url,body.username,body.first_name,body.last_name,body.email,body.priority)
            .then((response) => { 
                sessionStorage.setItem('Alerta', JSON.stringify({name:`El usuario ${body.username} ha sido modificado`, type:1}));
                window.location.href = "/list-user"
            })
            .catch((error) => {
                setError(error)
                setAlert({name:`El usuario ${body.username} NO puede ser creado verifica que no exista`, type:0})
                setTimeout(() => {
                    setAlert(null)
                    setStateAlert(null)
                }, 5000);
            });  
    }
    return (
        <> 
            <Alert alert={alert} stateAlert={stateAlert} />
            <Navigation actualPosition="Editar Usuario" path="/list-user" index ="Usuarios"/> 
            <Card>
            
                <Card.Header>
                    <Card.Title as="h5">Editar Usuario</Card.Title>
                </Card.Header>
                <Card.Body>
                <Form>
                <FormUser body={body} setBody={setBody} priorities={priorities} createUser={editUser} loading={loading}/>
                        
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
export default EditUser
