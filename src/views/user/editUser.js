import React, { useState, useEffect} from 'react';
import { Card, Form, Breadcrumb } from 'react-bootstrap';
import { putUser} from "../../api/services/users";
import { useLocation } from "react-router-dom";
import Alert from '../../components/Alert/Alert';
import {formUser} from './formUser'



const EditUser = () => {    
    const location = useLocation();
    const user = location.state.post;
    const[error,setError]=useState()
    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)
    const[body,setBody]=useState(user)
    const [listPriorities, setListPriorities] = useState({})
    const [priorities, setPriorities] = useState([
        {
            "url": "http://localhost:8000/api/administration/priority/1/",
            "color": "#FFFFFF",
            "created": "2019-03-22T16:24:33Z",
            "modified": "2022-05-27T20:03:30.447000Z",
            "name": "Critical",
            "severity": 1,
            "attend_time": "00:00:00",
            "solve_time": "01:00:00",
            "attend_deadline": "00:01:00",
            "solve_deadline": "2 00:00:00",
            "notification_amount": 3
        },
        {
            "url": "http://localhost:8000/api/administration/priority/3/",
            "color": "#FFFFFF",
            "created": "2019-03-22T16:24:33Z",
            "modified": "2022-04-09T00:26:44.802000Z",
            "name": "High",
            "severity": 2,
            "attend_time": "00:10:00",
            "solve_time": "04:00:00",
            "attend_deadline": "03:00:00",
            "solve_deadline": "2 00:00:00",
            "notification_amount": 3
        },
        {
            "url": "http://localhost:8000/api/administration/priority/2/",
            "color": "#FFFFFF",
            "created": "2019-03-22T16:24:33Z",
            "modified": "2022-04-09T00:26:25.310000Z",
            "name": "Medium",
            "severity": 3,
            "attend_time": "01:00:00",
            "solve_time": "08:00:00",
            "attend_deadline": "07:00:00",
            "solve_deadline": "2 00:00:00",
            "notification_amount": 3
        },
        {
            "url": "http://localhost:8000/api/administration/priority/6/",
            "color": "#FFFFFF",
            "created": "2019-03-22T16:24:33Z",
            "modified": "2022-04-09T00:33:40.089000Z",
            "name": "Low",
            "severity": 4,
            "attend_time": "04:00:00",
            "solve_time": "2 00:00:00",
            "attend_deadline": "1 00:00:00",
            "solve_deadline": "2 00:00:00",
            "notification_amount": 3
        },
        {
            "url": "http://localhost:8000/api/administration/priority/5/",
            "color": "#FFFFFF",
            "created": "2019-03-22T16:24:33Z",
            "modified": "2022-04-09T00:19:17.743000Z",
            "name": "Very Low",
            "severity": 5,
            "attend_time": "1 00:00:00",
            "solve_time": "7 00:00:00",
            "attend_deadline": "1 00:00:00",
            "solve_deadline": "2 00:00:00",
            "notification_amount": 3
        }
    ])
    useEffect( ()=> {
        
        var dic = new Object()

        priorities.forEach(priority => {
            
            dic[priority.name]=priority.url
        });
        priorities.forEach(priority => {
            if (priority.url == body.priority)
                setBody({...body,
                    ["priority"] : priority.name})
        });
        
        setListPriorities(dic)
    },[]);
    
    const editUser=(e)=>{
        
            putUser(body.url,body.username,body.first_name,body.last_name,body.email,listPriorities[body.priority])
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
                                {formUser(body, setBody, listPriorities, editUser)}
                                
                            </Form>
                        </Card.Body>
                    </Card>
            
        </>
    )
}
export default EditUser
