import React, { useState, useEffect} from 'react';
import { Card, Form} from 'react-bootstrap';
import { putUser, getUser} from "../../api/services/users";
import { useLocation } from "react-router-dom";
import Alert from '../../components/Alert/Alert';
import { getAllPriorities } from "../../api/services/priorities";
import FormUser from './components/FormUser'
import Navigation from '../../components/Navigation/Navigation'



const EditUser = () => {
    const location = useLocation();
    const fromState = location.state;
    const [user, setUser] = useState(fromState);
    const[error,setError]=useState()
    const[body,setBody]=useState({})
    const [loading, setLoading] = useState(true)
    const [priorities, setPriorities] = useState()
    const [showAlert, setShowAlert] = useState(false)

    useEffect( ()=> {

        getUser(user.url).then((response)=> {
            setUser(response.data)
            console.log(response.data)
        })
        
        const fetchPosts = async () => {
            setLoading(true)
            getAllPriorities().then((response) => { 
                setPriorities(response)
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
                <FormUser body={user} setBody={setUser} priorities={priorities} createUser={editUser} loading={loading}/>
                        
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
export default EditUser
