import apiInstance from "../api";
import setAlert from '../../utils/setAlert';
import { COMPONENT_URL, PAGE } from '../../config/constant';

const getTasks = (currentPage) => {
    let messageError = `No se pudo recuperar la informacion de las tareas.`;
    return apiInstance.get(COMPONENT_URL.task + PAGE + currentPage)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const getAllTasks = (currentPage = 1, results = [], limit = 100) => {
    let messageError = `No se pudo recuperar la informacion de las tareas.`;            
    return apiInstance.get(COMPONENT_URL.task, { params: { page: currentPage, page_size: limit } })       
        .then((response) => {
            let res = [...results, ...response.data.results]                                    
            if(response.data.next != undefined){                                
                return getAllTasks(++currentPage, res, limit)
            }
            else{
                return res;     
            }                  
        })
        .catch((error) => {
            setAlert(messageError, "error");
            return Promise.reject(error);            
        })   
}

const getTask = (url) => { 
    let messageError = `No se pudo recuperar la informacion de la tarea`;
    return apiInstance.get(url)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const postTask = (name, description, priority, playbook) => {
    let messageSuccess = `La tarea ${name} se pudo crear correctamente`;
    let messageError = `La tarea ${name} no se pudo crear`;
    return apiInstance.post(COMPONENT_URL.task, {
        name: name,
        description: description,
        priority: priority,
        playbook: playbook
    }).then(response => {
        setAlert(messageSuccess, "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const putTask = (url, name, description, priority, playbook) => {
    let messageSuccess = `La tarea ${name} se pudo editar correctamente`;
    let messageError = `La tarea ${name} no se pudo editar`;
    return apiInstance.put(url, 
    {
        name: name,
        description: description,
        priority: priority,
        playbook: playbook
    }).then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}


const deleteTask = (url, name) => {
    let messageSuccess = `La tarea ${name} se pudo eliminar correctamente`;
    let messageError = `La tarea ${name} no se pudo eliminar`;
    return apiInstance.delete(url)
    .then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}


export { getTasks, getAllTasks, getTask, postTask, putTask, deleteTask };
