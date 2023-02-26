import  apiInstance  from "../api";
import { COMPONENT_URL } from '../../config/constant';

const getPriorities = (page="") => {//el parametro es para completar la url con el numero de pagina
    
    return apiInstance.get(COMPONENT_URL.priority+page);
}

const getPriority = (url) => { 
    return apiInstance.get(url);
}

const postPriority = (name, color, severity, attend_deadline, solve_deadline) => {
    
    return apiInstance.post(COMPONENT_URL.priority, {
        name: name, 
        color: color, 
        severity: severity, 
        attend_deadline: attend_deadline, 
        solve_deadline: solve_deadline
    });
}

const putPriority = ( url, name, color, severity, attend_deadline, solve_deadline) => {
    return apiInstance.put(url, {
        name: name, 
        color: color, 
        severity: severity, 
        attend_deadline: attend_deadline, 
        solve_deadline: solve_deadline
        
    });
}

const deletePriority = (url) => {
    return apiInstance.delete(url);
}
export {getPriorities, postPriority, deletePriority, putPriority}