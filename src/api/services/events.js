import  apiInstance  from "../api";
import { COMPONENT_URL } from '../../config/constant';
import setAlert from '../../utils/setAlert';

const getEvents = (page="") => {//el parametro es para completar la url con el numero de pagina
    
    return apiInstance.get(COMPONENT_URL.event+page);
}
const postEvent = (f) => {//el parametro es para completar la url con el numero de pagina
    let messageSuccess = `La evento se pudo crear correctamente`;
    let messageError = `La evento no se pudo crear`;
    
    return apiInstance.post(COMPONENT_URL.event,f).then(response => {
        setAlert(messageSuccess, "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}
const putEvent = (url,f) => {//el parametro es para completar la url con el numero de pagina
    let messageSuccess = `El evento se pudo editar correctamente`;
    let messageError = `El evento no se pudo editar`;
    
    return apiInstance.put(url,f).then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}
const getEvent = (url) => {//el parametro es para completar la url con el numero de pagina
    
    return apiInstance.get(url);
}

const deleteEvent = (url) => {
    let messageSuccess = `El evento se pudo eliminar correctamente`;
    let messageError = `El evento no se pudo eliminar`;
    return apiInstance.delete(url).then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}
const mergeEvent = (urlParent, urlChildren) => {
    return apiInstance.patch(urlChildren,
    {
        parent : urlParent
    }, 
    {
        validateStatus: function (status) {
            switch(status) {
                case 200:
                    setAlert(`Caso mergeado`, "success");
                    break;
                case 404: 
                    setAlert(`No se pudo mergear`, "error");
                    break;
            }
            return status;
        }
    });
}

export { getEvents , postEvent, putEvent, deleteEvent, mergeEvent, getEvent};
