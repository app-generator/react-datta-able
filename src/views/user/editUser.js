import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Breadcrumb } from 'react-bootstrap';
import { putUser} from "../../api/services/users";
import { validateEmail,validateFieldText,validateUsername} from './validators';
import { useLocation } from "react-router-dom";
import Alert from '../../components/Alert/Alert';



const EditUser = () => {    
    const location = useLocation();
    const user = location.state.post;
    
      
    
    const[error,setError]=useState()
    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)
    const[body,setBody]=useState(user)
    

    const activateBooton = ()=>{
        const formErrors = []

        if(body.username === ""){
            formErrors.push("username: Por favor Ingresar ingresar un nombre")
        }
        if(!validateUsername(body.username)){
            formErrors.push("username: ingrese un nombre de usuario valido")
        }
        if(body.priority == "-1"){
            formErrors.push("priority: Por favor elija una prioridad")
        }
        if(body.first_name !== ""){
            if(!validateFieldText(body.first_name)){
                formErrors.push("first_name: solo se permiten letras para el nombre")
            }
        }
        if (body.last_name !== ""){
            if(!validateFieldText(body.last_name)){
                formErrors.push("last_name: solo se permiten letras para el apellido")
            }
        }
        if (body.email !== ""){
            if(!validateEmail(body.email)){
                formErrors.push("email: El email no es valido")
            }
        }
        
        return (formErrors.length == 0)

    }


    const FieldUsername=(event)=>{
        
      
        if(!(/ /).test(event.target.value)){
            setBody({...body,
            [event.target.name] : event.target.value}
            )  
        //activateBooton()
        }
        
          
        
    }
    const fieldFullName=(event)=>{

        console.log(user)
        
        console.log(body)
            setBody({...body,
                [event.target.name] : event.target.value}
                )  
          //      activateBooton()
          
        
    }
    const fieldEmail=(event)=>{
        
        setBody({...body,
        [event.target.name] : event.target.value}
        )  
        //activateBooton()
    
          
        
    }
    const fieldPriority=(event)=>{

        if (event.target.value !== "-1"){
            


            console.log(event.target.value)
            setBody({...body,
                    [event.target.name] : "http://localhost:8000/api/administration/priority/"+event.target.value+"/"}//hay que pegarle a la api de prioridad
                    )

            
        }else{
            console.log("no ingresa")
            setBody({...body,
                [event.target.name] : event.target.value}//hay que pegarle a la api de prioridad
                )
        }
        //activateBooton()
    }
    
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
                        <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control 
                                        placeholder="Ingrese el nombre del usuario" 
                                        maxlength="150" 
                                        value ={body.username} 
                                        name="username" 
                                        isInvalid={body.username === ''|| !validateUsername(body.username)}
                                        isValid={body.username !== ''} onChange={(e)=>FieldUsername(e)}/>
                                        {body.username  ? '' : <div className="invalid-feedback">   Ingrese un nombre de usuario</div>}
                                    {validateUsername(body.username)  ? "" : <div className="invalid-feedback"> Solo se permiten letras, numeros y los cateacteres especiales '@', '.' , '+', '-', '_' </div>}
                                </Form.Group>

                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Nombre/s</Form.Label>
                                    <Form.Control 
                                        placeholder="Ingrese el nombre/s" 
                                        maxlength="150" 
                                        value ={body.first_name}
                                        name="first_name"
                                        onChange={(e)=>fieldFullName(e)} 
                                        isInvalid={body.first_name !== "" && !validateFieldText(body.first_name)}/>
                                    {validateFieldText(body.first_name) ? "" : <div className="invalid-feedback">   Ingrese caracteres validos</div>}
                                </Form.Group>

                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Apellido</Form.Label>
                                    
                                    <Form.Control 
                                        placeholder="Ingrese el apellido" 
                                        maxlength="150" 
                                        value ={body.last_name}
                                        name="last_name" 
                                        onChange={(e)=>fieldFullName(e)} 
                                        isInvalid={body.last_name !== "" && !validateFieldText(body.last_name)}/>
                                    {validateFieldText(body.last_name) ? ""  : <div className="invalid-feedback">   Ingrese caracteres validos</div>}
                                </Form.Group>
                                

                                <Form.Group controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control  
                                        placeholder="Ingrese el Email" 
                                        maxlength="254"  
                                        value ={body.email}
                                        name="email" 
                                        onChange={(e)=>fieldEmail(e)} 
                                        isInvalid={body.email !== "" && !validateEmail(body.email)}/>
                                    {validateEmail(body.email) ? ""  : <div className="invalid-feedback">   Ingrese un email valido</div>}
                                </Form.Group>
                                
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Prioridad</Form.Label>
                                        <Form.Control 
                                                as="select" 
                                                name="priority" 
                                                value={body.priority}
                                                onChange={(e)=>fieldPriority(e)} 
                                                isInvalid={body.priority === "-1"}
                                                isValid={body.priority !== "-1"}>
                                         
                                            <option value="-1">Seleccione una prioridad</option>
                                            <option value="1"> Critico </option>
                                            <option value="2"> Alta </option>
                                            <option value="3"> Media </option>
                                            <option value="4"> Baja </option>
                                            <option value="5"> Muy Baja </option>
                                        </Form.Control>
                                        {(body.priority !== "-1") ? '' : <div className="invalid-feedback">Seleccione una prioridad</div>}
                                </Form.Group>
                                {(activateBooton()) ? 
                                    <><Button variant="primary" onClick={editUser} >Guardar</Button></>
                                    : 
                                    <><Button variant="primary" disabled>Guardar</Button></> }
                                    <Button variant="primary" href="/list-user">Cancelar</Button>

                            </Form>
                        </Card.Body>
                    </Card>
            
        </>
    )
}

export default EditUser
