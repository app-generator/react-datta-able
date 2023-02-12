import React, { useState, useEffect} from 'react';
import { Card, Form, Breadcrumb } from 'react-bootstrap';
import { putUser} from "../../api/services/users";
import { useLocation } from "react-router-dom";
import Alert from '../../components/Alert/Alert';
import { getPriorities } from "../../api/services/priorities";
import FormUser from './formUser'



const EditUser = () => {    
    const location = useLocation();
    const user = location.state.post;
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
    console.log(body)
    
    const editUser=(e)=>{
        
            putUser(body.url,body.username,body.first_name,body.last_name,body.email,body.priority)
            .then((response) => { 
                console.log(response)
                sessionStorage.setItem('Alerta', JSON.stringify({name:`El usuario ${body.username} ha sido modificado`, type:1}));
                window.location.href = "/list-user"
            })
            .catch((error) => {
                setError(error)
                console.log(error)
                setAlert({name:`El usuario ${body.username} NO puede ser creado verifica que no exista`, type:0})
                setTimeout(() => {
                    setAlert(null)
                    setStateAlert(null)
                }, 5000);
            });  
    }
    return (
        <>
          <Card>
         
          <Alert alert={alert} stateAlert={stateAlert} />
          <Breadcrumb>
                    <Breadcrumb.Item href="./app/dashboard/default">
                        <i className="feather icon-home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/list-user">
                        <i className="fas fa-network-wired" /> Usuarios
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <b>Editar usuario</b>
                    </Breadcrumb.Item>
                </Breadcrumb>  
          
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
