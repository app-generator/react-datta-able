import apiInstance from "../api";
import setAlert from '../../utils/setAlert';
import { COMPONENT_URL, PAGE } from '../../config/constant';

const getPlaybooks = (currentPage) => {
    let messageError = `No se pudo recuperar la informacion de los playbooks.`;
    return apiInstance.get(COMPONENT_URL.playbook + PAGE + currentPage)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const getAllPlaybooks = (currentPage = 1, results = [], limit = 100) => {
    let messageError = `No se pudo recuperar la informacion de los playbooks.`;            
    return apiInstance.get(COMPONENT_URL.playbook, { params: { page: currentPage, page_size: limit } })       
        .then((response) => {
            let res = [...results, ...response.data.results]                                    
            if(response.data.next != undefined){                                
                return getAllPlaybooks(++currentPage, res, limit)
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

const getPlaybook = (url) => {
    let messageError = `No se pudo recuperar la informacion del playbook.`;
    return apiInstance.get(url)
    .then(response => {
        return response;
    }).catch( error => {
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const postPlaybook = (name, taxonomy) => {
    let messageSuccess = `El playbook ${name} se pudo crear correctamente`;
    let messageError = `El playbook ${name} no se pudo crear`;
    return apiInstance.post(COMPONENT_URL.playbook, 
    {
        name: name,
        taxonomy: taxonomy, //[]
    }).then(response => {
        setAlert(messageSuccess, "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const putPlaybook = (url, name, taxonomy) => {
    let messageSuccess = `El playbook ${name} se pudo editar correctamente`;
    let messageError = `El playbook ${name} no se pudo editar`;
    return apiInstance.put(url, 
    {
        name: name,
        taxonomy : taxonomy
    }).then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const deletePlaybook = (url, name) => {
    let messageSuccess = `El playbook ${name} se pudo eliminar correctamente`;
    let messageError = `El playbook ${name} no se pudo eliminar`;
    return apiInstance.delete(url)
    .then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

export { getPlaybooks, getAllPlaybooks, getPlaybook, postPlaybook, putPlaybook, deletePlaybook };
