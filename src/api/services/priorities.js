import  apiInstance  from "../api";
import { COMPONENT_URL } from '../../config/constant';

const getPriorities = (page="") => {//el parametro es para completar la url con el numero de pagina
    
    return apiInstance.get(COMPONENT_URL.priority+page);
}

const getPriority = (url) => { 
    return apiInstance.get(url);
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
export { getPriorities, getAllPriorities, getPriority, postPriority, deletePriority, putPriority }