import  apiInstance  from "../api";
import { COMPONENT_URL } from '../../config/constant';
import setAlert from '../../utils/setAlert';

const getUsers = (page="") => {//el parametro es para completar la url con el numero de pagina
    let messageError = `No se pudo recuperar la informacion de los usuarios`;
    return apiInstance.get(COMPONENT_URL.user+page)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const getUser = (url) => { 
    let messageError = `No se pudo recuperar la informacion del usuario`;
    return apiInstance.get(url).then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const getAllUsers = (currentPage = 1, results = [], limit = 100) => {
            
    return apiInstance.get(COMPONENT_URL.user, { params: { page: currentPage, page_size: limit } })       
        .then((response) => {
            let res = [...results, ...response.data.results]                                    
            if(response.data.next != undefined){                                
                return getAllUsers(++currentPage, res, limit)
            }
            else{
                return res;     
            }                  
        })
        .catch((error) => {
            return Promise.reject(error);            
        })   

}

const postUser = (username, first_name, last_name, email, priority, is_active) => {
    let messageSuccess = `El usuario ${username} se pudo crear correctamente`;
    let messageError = `El usuario ${username} no se pudo crear`;
    
    return apiInstance.post(COMPONENT_URL.user, {
        username: username, 
        first_name: first_name, 
        last_name: last_name, 
        email: email, 
        priority: priority,
        is_active: is_active
    }).then(response => {
        setAlert(messageSuccess, "success");
        return response;
    }).catch( error => { 
        console.log(error.response)
        if (error.response.status == 400){
            //se informa que existe el username con ese nombre
            if(error.response.data.username =="A user with that username already exists." ){
                messageError = `El usuario ${username} se pudo crear correctamente porque ya existe en el sistema`;   
            }

        }else if(error.message == "Cannot read properties of undefined (reading 'code')"){
            //el backend o servidor no funciona
            messageError = `El usuario ${username} no puede ser creado porque el servidor no responde`;

        }
        setAlert(messageError, "error");
        
        return Promise.reject(error);
    });
}

const putUser = ( url,username, first_name, last_name, email, priority, is_active) => {
    let messageSuccess = `El usuario ${username} se pudo editar correctamente`;
    let messageError = `El usuario ${username} no se pudo editar`;
    return apiInstance.put(url, {
        username: username, 
        first_name: first_name, 
        last_name: last_name, 
        email: email, 
        priority: priority,
        is_active: is_active
    }).then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        if (error.message == "Request failed with status code 400"){
            //se informa que existe el username con ese nombre
            messageError = `El usuario ${username} se pudo crear correctamente porque ya existe en el sistema`;
            setAlert(messageError, "error");

        }else if(error.message == "Cannot read properties of undefined (reading 'code')"){
            //el backend o servidor no funciona
            messageError = `El usuario ${username} no puede ser creado porque el servidor no responde`;
            setAlert(messageError, "error");

        }else{   
            setAlert(messageError, "error");
        }
        return Promise.reject(error);
    });
}

const isActive = (url, active) => {
    let messageSuccess = !active ? `El usuario ha sido desactivado` : `El usuario ha sido activado`;
    let messageError = `El usuario no se pudo modificar`;
    return apiInstance.patch(url, {
        is_active: active
    } ).then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        if(error.message == "Cannot read properties of undefined (reading 'code')"){
            //el backend o servidor no funciona
            messageError = !active ? `El usuario no pudo ser desactivado no pudo ser` : `El usuario no pudo ser activado no pudo ser`;
            setAlert(messageError, "error");

        }else{
            setAlert(messageError, "error");
        }
        return Promise.reject(error);
    });
}

const deleteUser = (url) => {
    let messageSuccess = `El usuario se pudo eliminar correctamente`;
    let messageError = `EL usuario no se pudo eliminar`;
    return apiInstance.delete(url).then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        console.log(error.response)
        setAlert(messageError, "error");
        if (error.message == "Request failed with status code 500"){
            //se informa que no se peude eliminar por que está siendo referencia en otra tabla
            messageError = `El usuario no se pudo eliminar porque está siendo referencia en otro componente/tabla(?`;
            setAlert(messageError, "error");
        }else if(error.message == "Cannot read properties of undefined (reading 'code')"){
            //el backend o servidor no funciona
            messageError = `El usuario  no puede ser eliminado porque el servidor no responde`;
            setAlert(messageError, "error");

        }else{   
            setAlert(messageError, "error");
        }
        
        return Promise.reject(error);
    })
}

export { getUsers, getUser, getAllUsers, postUser, putUser, deleteUser, isActive };
