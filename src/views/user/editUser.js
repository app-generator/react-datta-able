import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Breadcrumb } from 'react-bootstrap';
import { getUsers, getUser, postUser, putUser, isActive, deleteUser } from "../../api/services/users";
import { useParams } from 'react-router-dom';


const AddUser = () => {    
    const {url} = useParams();
    
    const[username,setUsername]=useState(false)
    const[priority,setPriority]=useState(false)
    const[body,setBody]=useState({ username: "", 
    first_name: "", 
    last_name: "", 
    email: "", 
    priority: "" })

    const validateUsername=(event)=>{
        
        if(event.target.value.trim()){
              setUsername(true)
              setBody({...body,
                [event.target.name] : event.target.value}
                )  
          
        }
    }
    const validatePriority=(event)=>{

        if (event.target.value !== "-1"){
            setPriority(true)


            console.log(event.target.value)
            setBody({...body,
                    [event.target.name] : "http://localhost:8000/api/administration/priority/"+event.target.value+"/"}//hay que pegarle a la api de prioridad
                    )  

            console.log(body)
        }else{
            console.log("no ingresa")
        }
    
    
    }
    
    

    const enviar=(e)=>{
        
        e.preventDefault()
       
    
        if((username===true) && (priority===true)){
            console.log(body.username,body.first_name,body.last_name,body.email,body.priority)
             postUser(body.username,body.first_name,body.last_name,body.email,body.priority)
             console.log('Los datos han sido validados correctamente')
         }else{
             console.log(' no dejes ningún campo vacio')
         } 

       
    
    }



    return (
        <>
          <Card>
          <h1>El Id es: {url}</h1>

          <Breadcrumb>
                    <Breadcrumb.Item href="./app/dashboard/default">
                        <i className="feather icon-home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="./list-user">
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
                            <Form onSubmit={e=>enviar(e)}>

                                <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Nombre de usuario</Form.Label>
                                        <Form.Control placeholder="Ingrese el nombre del usuario" value ={body.username} name="username" onChange={validateUsername}/>
                                </Form.Group>

                                <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Nombre/s</Form.Label>
                                        <Form.Control placeholder="Ingrese el nombre/s" />
                                </Form.Group>
                                <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control placeholder="Ingrese el apellido" />
                                </Form.Group>
                                

                                <Form.Group controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Ingrese el Email" />
                                </Form.Group>
                                
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Prioridad</Form.Label>
                                        <Form.Control as="select" name="priority" onChange={validatePriority}>
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

export default AddUser
