import apiInstance from "../api";
import setAlert from '../../utils/setAlert';
import { COMPONENT_URL, PAGE } from '../../config/constant';

const getPlaybooks = (currentPage) => {
    let messageError = `No se ha recuperado la informacion de playbooks. `;
    return apiInstance.get(COMPONENT_URL.playbook + PAGE + currentPage)
    .then(response => {        
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "playbook");
        return Promise.reject(error);
    });
}

const getAllPlaybooks = (currentPage = 1, results = [], limit = 100) => {
    return apiInstance.get(COMPONENT_URL.playbook, { params: { page: currentPage } })//, page_size: limit
        .then((response) => {
            let res = [...results, ...response.data.results]                                    
            if(response.data.next != null){                                
                return getAllPlaybooks(++currentPage, res, limit)
            }
            else{
                return res;     
            }                  
        })
        .catch((error) => {
            return Promise.reject(error);            
        })   
}

const getPlaybook = (url) => {
    let messageError = `No se ha recuperado la informacion del playbook. `;
    return apiInstance.get(url)
    .then(response => {
        return response;
    }).catch( error => {
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "playbook");
        return Promise.reject(error);
    });
}

const postPlaybook = (name, taxonomy) => {
    let messageSuccess = `El playbook ${name} se ha creado correctamente. Puede agregar tareas. `;
    let messageError = `El playbook ${name} no se ha creado. `;
    return apiInstance.post(COMPONENT_URL.playbook, 
    {
        name: name,
        taxonomy: taxonomy, //[]
    }).then(response => {
        setAlert(messageSuccess, "success", "playbook");
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "playbook");
        return Promise.reject(error);
    });
}

const putPlaybook = (url, name, taxonomy) => {
    let messageSuccess = `El playbook ${name} se ha editado correctamente.`;
    let messageError = `El playbook ${name} no se ha editado. `;
    return apiInstance.put(url, 
    {
        name: name,
        taxonomy : taxonomy
    }).then(response => {
        setAlert(messageSuccess , "success", "playbook");
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "playbook");
        return Promise.reject(error);
    });
}

const deletePlaybook = (url, name) => {
    let messageSuccess = `El playbook ${name} se ha eliminado correctamente.`;
    let messageError = `El playbook ${name} no se ha eliminado. `;
    return apiInstance.delete(url)
    .then(response => {
        setAlert(messageSuccess , "success", "playbook");
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "playbook");
        return Promise.reject(error);
    });
}

export { getPlaybooks, getAllPlaybooks, getPlaybook, postPlaybook, putPlaybook, deletePlaybook };
