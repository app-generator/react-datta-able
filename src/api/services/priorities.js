import  apiInstance  from "../api";
import { COMPONENT_URL } from '../../config/constant';
import setAlert from '../../utils/setAlert';

const getPriorities = (page="") => {//el parametro es para completar la url con el numero de pagina
    let messageError = `No se pudo recuperar la informacion de las prioridades`;
    return apiInstance.get(COMPONENT_URL.priority+page)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const getPriority = (url) => { 
    let messageError = `No se pudo recuperar la informacion de la prioridad`;
    return apiInstance.get(url)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const getAllPriorities = (currentPage = 1, results = [], limit = 100) => {
            
    return apiInstance.get(COMPONENT_URL.priority, { params: { page: currentPage, page_size: limit } })       
        .then((response) => {
            let res = [...results, ...response.data.results]                                    
            if(response.data.next != undefined){                                
                return getAllPriorities(++currentPage, res, limit)
            }
            else{
                return res;     
            }                  
        })
        .catch((error) => {
            return Promise.reject(error);            
        })   

}

const postPriority = (name, color, severity, attend_time, solve_time) => {
    let messageSuccess = `La prioridad ${name} se pudo crear correctamente`;
    let messageError = `La prioridad ${name} no se pudo crear`;
    return apiInstance.post(COMPONENT_URL.priority, {
        name: name, 
        color: color, 
        severity: severity, 
        attend_time: attend_time, 
        solve_time: solve_time
    }).then(response => {
        setAlert(messageSuccess, "success");
        return response;
    }).catch( error => { 
        if (error.response.status == 400){
            //se informa que existe el username con ese nombre
            if(error.response.data.severity == "priority with this severity already exists." ){
                messageError = `La prioridad ${name} no se pudo crear porque la severidad ya existe`;   
            }
        }else if(error.message == "Cannot read properties of undefined (reading 'code')"){
            //el backend o servidor no funciona
            messageError = `El usuario ${name} no puede ser creado porque el servidor no responde`;
        }else{
            let statusText = error.response.statusText;
            messageError += ": "+ statusText;
        }
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const putPriority = ( url, name, color, severity, attend_time, solve_time) => {
    let messageSuccess = `La prioridad ${name} se pudo crear correctamente`;
    let messageError = `La prioridad ${name} no se pudo crear`;
    return apiInstance.put(url, {
        name: name, 
        color: color, 
        severity: severity, 
        attend_time: attend_time, 
        solve_time: solve_time
        
    }).then(response => {
        setAlert(messageSuccess, "success");
        return response;
    }).catch( error => { 
        if (error.response.status == 400){
            //se informa que existe el username con ese nombre
            if(error.response.data.severity == "priority with this severity already exists." ){
                messageError = `La prioridad ${name} no se pudo editar porque la severidad ya existe`;   
            }
        }else if(error.message == "Cannot read properties of undefined (reading 'code')"){
            //el backend o servidor no funciona
            messageError = `El usuario ${name} no puede ser editar porque el servidor no responde`;
        }else{
            let statusText = error.response.statusText;
            messageError += ": "+ statusText;
        }
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const deletePriority = (url) => {
    let messageSuccess = `La prioridad se pudo eliminar correctamente`;
    let messageError = `La prioridad no se pudo eliminar`;
    return apiInstance.delete(url).then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}
export { getPriorities, getAllPriorities, getPriority, postPriority, deletePriority, putPriority }