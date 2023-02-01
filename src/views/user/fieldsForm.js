import { validateEmail,validateFieldText,validateUsername} from './validators';

const activateBooton = (body)=>{
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


const FieldUsername=(event, setBody, body)=>{
    
  
    if(!(/ /).test(event.target.value)){
        setBody({...body,
        [event.target.name] : event.target.value}
        )  
    }
        
}

const fieldFullName=(event, setBody, body)=>{

    
        setBody({...body,
            [event.target.name] : event.target.value}
            )  

    
}
const fieldEmail=(event, setBody, body)=>{
    
    setBody({...body,
    [event.target.name] : event.target.value}
    )  


      
    
}
const fieldPriority=(event, setBody, body)=>{

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

}

export {fieldEmail, fieldPriority, fieldFullName, FieldUsername, activateBooton};