import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Breadcrumb } from 'react-bootstrap';
import { putUser} from "../../api/services/users";

import { useLocation } from "react-router-dom";



const EditUser = () => {    
    const location = useLocation();
    const user = location.state.post;
    
      
    const[username,setUsername]=useState(false)
    const[priority,setPriority]=useState(false)
    const[error,setError]=useState()
    const[body,setBody]=useState({ 
        url:user.url,
        username: user.username, 
    first_name: user.first_name, 
    last_name: user.last_name, 
    email: user.email, 
    priority: user.priority})
    

    const validateUsername=(event)=>{
        
        setBody({...body,
        [event.target.name] : event.target.value}
        )  
        
    }
    const validatePriority=(event)=>{

        if (event.target.value !== "-1"){

            console.log(event.target.value)
            setBody({...body,
                    [event.target.name] : "http://localhost:8000/api/administration/priority/"+event.target.value+"/"}//hay que pegarle a la api de prioridad
                    ).then((response) => {
                        console.log(response) 
                      })

            
        }else{
            console.log("no ingresa")
        }
    
    
    }
    
    const validateFirstName=(event)=>{
        
        setBody({...body,
        [event.target.name] : event.target.value}
        )  
          
        
    }
    const validateLastName=(event)=>{
        
        setBody({...body,
        [event.target.name] : event.target.value}
        )  
          
        
    }
    const validateEmail=(event)=>{
        
        setBody({...body,
        [event.target.name] : event.target.value}
        )  
          
        
    }
    
    

    const enviar=(e)=>{
        
        e.preventDefault()
       
    
        if((body.username !== "") && (body.priority !== "" )){
            console.log(body.username,body.first_name,body.last_name,body.email,body.priority)
             putUser(body.url, body.username,body.first_name,body.last_name,body.email,body.priority)
             console.log('Los datos han sido validados correctamente')
         }else{
             console.log(' no dejes ningún campo vacio')
         } 

       
    
    }



    return (
        <>
          <Card>
         

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
                            <Form onSubmit={e=>enviar(e)}>

                                <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Nombre de usuario</Form.Label>
                                        <Form.Control  value={body.username} name="username" onChange={validateUsername}  isInvalid={body.username === ''}
                                                isValid={body.username !== ''}/>
                                </Form.Group>

                                <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Nombre/s</Form.Label>
                                        <Form.Control placeholder="Ingrese el nombre/s" value={body.first_name} name="first_name"onChange={validateFirstName}/>
                                </Form.Group>
                                <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control placeholder="Ingrese el apellido" name="last_name" value={body.last_name} onChange={validateLastName}/>
                                </Form.Group>
                                

                                <Form.Group controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Ingrese el Email" name= "email" value={body.email} onChange={validateEmail}/>
                                </Form.Group>
                                
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Prioridad</Form.Label>
                                        <Form.Control as="select" name="priority"  onChange={validatePriority} isInvalid={body.priority === "-1"}
                                                isValid={body.priority !== "-1"}>
                                            <option value="-1">Seleccione una prioridad</option>
                                            <option value="1"> Critico </option>
                                            <option value="2"> Alta </option>
                                            <option value="3"> Media </option>
                                            <option value="4"> Baja </option>
                                            <option value="5"> Muy Baja </option>
                                        </Form.Control>
                                    </Form.Group>
                            
                          

                                <Button type="submit" variant="primary">Cargar Usuario</Button>

                            </Form>
                        </Card.Body>
                    </Card>
            
        </>
    )
}

export default EditUser
