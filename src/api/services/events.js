import  apiInstance  from "../api";
import { COMPONENT_URL , PAGE} from '../../config/constant';
import setAlert from '../../utils/setAlert';

const getEvents = (currentPage, filters, order) => {//el parametro es para completar la url con el numero de pagina
    console.log(COMPONENT_URL.event + PAGE + currentPage + '&ordering=' + order +'&' + filters )
    return apiInstance.get(COMPONENT_URL.event + PAGE + currentPage + '&ordering=' + order +'&' + filters );
}
const postEvent = (formData) => {//el parametro es para completar la url con el numero de pagina
    let messageSuccess = `La evento se pudo crear correctamente`;
    let messageError = `La evento no se pudo crear`;
    
    return apiInstance.post(COMPONENT_URL.event,formData).then(response => {
        setAlert(messageSuccess, "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}
const putEvent = (url,formData) => {//el parametro es para completar la url con el numero de pagina
    let messageSuccess = `El evento se pudo editar correctamente`;
    let messageError = `El evento no se pudo editar`;
    
    return apiInstance.put(url,formData).then(response => {
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
    let messageSuccess = `Los eventps han sido mergeados correctamente.`;
    let messageError = `Los eventos no han sido mergeados. `;
    return apiInstance.patch(urlChildren,
    {
        parent : urlParent
    }).then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error");
        return Promise.reject(error);
    })
}

export { getEvents , postEvent, putEvent, deleteEvent, mergeEvent, getEvent};
