import apiInstance from "../api";
import setAlert from '../../utils/setAlert';
import { COMPONENT_URL, PAGE } from '../../config/constant';

const getEntities = (currentPage) => {
    let messageError = `No se pudo recuperar la informacion de las entidades.`;
    return apiInstance.get(COMPONENT_URL.entity + PAGE + currentPage)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const getEntity = (url) => { 
    let messageError = `No se pudo recuperar la informacion de la entidad.`;
    return apiInstance.get(url)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const getAllEntities = (currentPage = 1, results = [], limit = 100) => {
    let messageError = `No se pudo recuperar la entidad.`;
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
            setAlert(messageError, "error");
            return Promise.reject(error);
        })   
}

const postEntity = (name, active) => {
    let messageSuccess = `La entidad ${name} se pudo crear correctamente.`;
    let messageError = `La entidad ${name} no se pudo crear.`;
    return apiInstance.post(COMPONENT_URL.entity, {
        name: name, 
        active: active 
    }).then(response => {
        setAlert(messageSuccess, "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const putEntity = (url, name, active) => {
    let messageSuccess = `La entidad ${name} se pudo editar correctamente.`;
    let messageError = `La entidad ${name} no se pudo editar.`;
    return apiInstance.put(url, {
        name: name, 
        active: active 
    }).then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const deleteEntity = (url, name) => { 
    let messageSuccess = `La entidad ${name} se pudo eliminar correctamente.`;
    let messageError = `La entidad ${name} no se pudo eliminar.`;
    return apiInstance.delete(url)
    .then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const isActive = (url, active, name) => { 
    let messageSuccess = !active ? `La entidad ${name} ha sido desactivada.` : `La entidad ${name} ha sido activada.`;
    let messageError = `La entidad ${name} no se pudo modificar.`;
    return apiInstance.patch(url, {
        active: active
    }).then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

export { getEntities, getAllEntities, getEntity, postEntity, putEntity, deleteEntity, isActive };
