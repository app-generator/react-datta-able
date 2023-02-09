import { apiInstance } from "../custom";
import { API_SERVER,COMPONENT_URL } from '../../config/constant';

const getPriorities = (page="") => {//el parametro es para completar la url con el numero de pagina
    
    return apiInstance.get(COMPONENT_URL.priority+page);
}

const getPriority = (url) => { 
    return apiInstance.get(url);
}

const postPriority = (username, first_name, last_name, email, priority, is_active) => {

    console.log(first_name)
    return apiInstance.post(COMPONENT_URL.priority, {
        username: username, 
        first_name: first_name, 
        last_name: last_name, 
        email: email, 
        priority: priority,
        is_active: is_active
    });
}

const putPriority = ( url,username, first_name, last_name, email, priority, is_active) => {
    return apiInstance.put(url, {
        username: username, 
        first_name: first_name, 
        last_name: last_name, 
        email: email, 
        priority: priority,
        is_active: is_active
    });
}

const isActive = (url, active) => {
    return apiInstance.patch(url, {
        is_active: active
    } );
}

const deletePriority = (url) => {
    return apiInstance.delete(url);
}
export {getPriorities}