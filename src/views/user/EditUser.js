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
    
        
    },[]);
    const resetShowAlert = () => {
        setShowAlert(false);
    }
    
    const editUser=(e)=>{
        
        putUser(body.url,body.username,body.first_name,body.last_name,body.email,body.priority)
        .then(() => {
            window.location.href = '/users';
        })
        .catch((error) => {
            setShowAlert(true) 
            setError(error);           
        })
              
    }
    return (
        <> 
            <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>
            <Navigation actualPosition="Editar Usuario" path="/users" index ="Usuarios"/> 
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
