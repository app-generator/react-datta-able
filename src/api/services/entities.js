import apiInstance from "../api";
import setAlert from '../../utils/setAlert';
import { COMPONENT_URL, PAGE } from '../../config/constant';

const getEntities = (currentPage) => {
    let messageError = `No ha recuperado la informacion de entidades. `;
    return apiInstance.get(COMPONENT_URL.entity + PAGE + currentPage)
    .then(response => {        
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "entity");
        return Promise.reject(error);
    });
}

const getEntity = (url) => { 
    let messageError = `No se ha recuperado la informacion de la entidad. `;
    return apiInstance.get(url)
    .then(response => {        
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "entity");
        return Promise.reject(error);
    });
}

const getAllEntities = (currentPage = 1, results = [], limit = 100) => {
    return apiInstance.get(COMPONENT_URL.entity, { params: { page: currentPage, page_size: limit } })       
        .then((response) => {
            let res = [...results, ...response.data.results]
            if(response.data.next != undefined){
                return getAllEntities(++currentPage, res, limit)
            }
            else{
                return res;     
            }
        })
        .catch((error) => {
            return Promise.reject(error);
        })   
}

const postEntity = (name, active) => {
    let messageSuccess = `La entidad ${name} se ha creado correctamente.`;
    let messageError = `La entidad ${name} no se ha creado. `;
    return apiInstance.post(COMPONENT_URL.entity, {
        name: name, 
        active: active 
    }).then(response => {
        setAlert(messageSuccess, "success", "entity");
        return response;
    }).catch( error => { 
        console.log(error.response.data)
        let statusText = ""; 
        if (error.response.status == 500 ) { //el response no dice que ya existe
            statusText = "El nombre ya existe. ";
        }
        
        messageError += statusText;
        setAlert(messageError , "error", "entity");
        return Promise.reject(error);
    });
}
/*
                console.log(JSON.stringify(error.config.url));
                console.log(JSON.stringify(error.config.method));
                console.log(JSON.stringify(error.config.data));
                console.log(JSON.stringify(error.response.status));
                console.log(JSON.stringify(error.response.data.msg));

*/
const putEntity = (url, name, active) => {
    let messageSuccess = `La entidad ${name} se ha editado correctamente.`;
    let messageError = `La entidad ${name} no se ha editado. `;
    return apiInstance.put(url, {
        name: name, 
        active: active 
    }).then(response => {
        setAlert(messageSuccess , "success", "entity");
        return response;
    }).catch( error => { 
        let statusText = error.response.data;

        messageError += statusText;
        setAlert(messageError , "error", "entity");
        return Promise.reject(error);
    });
}

const deleteEntity = (url, name) => { 
    let messageSuccess = `La entidad ${name} se ha eliminado correctamente.`;
    let messageError = `La entidad ${name} no se ha eliminado. `;
    return apiInstance.delete(url)
    .then(response => {
        setAlert(messageSuccess , "success", "entity");
        return response;
    }).catch( error => { 
        console.log(error.response.data)
        let status = error.response.status;
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "entity");
        return Promise.reject(error);
    });
}

const isActive = (url, active, name) => { 
    let messageSuccess = !active ? `La entidad ${name} se ha desactivado.` : `La entidad ${name} se ha activado.`;
    let messageError = !active ? `La entidad ${name} no se ha desactivado. ` : `La entidad ${name} no se ha activado. `;
    return apiInstance.patch(url, {
        active: active
    }).then(response => {
        setAlert(messageSuccess , "success", "entity");
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "entity");
        return Promise.reject(error);
    });
}

export { getEntities, getAllEntities, getEntity, postEntity, putEntity, deleteEntity, isActive };
