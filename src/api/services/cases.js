import apiInstance from "../api";
import { COMPONENT_URL, PAGE } from '../../config/constant';
import setAlert from '../../utils/setAlert';

const getCases = (currentPage) => {
    let messageError = `No se pudo recuperar la informacion de los casos.`;
    return apiInstance.get(COMPONENT_URL.case + PAGE + currentPage)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const getCase = (url) => {
    let messageError = `No se pudo recuperar la informacion del caso`;
    return apiInstance.get(url)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const getAllCases = (currentPage = 1, results = [], limit = 100) => {
    let messageError = `No se pudo recuperar la informacion de los casos.`;            
    return apiInstance.get(COMPONENT_URL.case, { params: { page: currentPage, page_size: limit } })       
        .then((response) => {
            let res = [...results, ...response.data.results]                                    
            if(response.data.next != undefined){                                
                return getAllCases(++currentPage, res, limit)
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
const getOrderingCases = (currentPage = 1, results = [], limit = 100, id='+id') => {
    let messageError = `No se pudo recuperar la informacion de los casos.`;            
    return apiInstance.get(COMPONENT_URL.case, { params: { page: currentPage, page_size: limit, ordering : id } })       
        .then((response) => {
            let res = [...results, ...response.data.results]                                    
            if(response.data.next != undefined){                                
                return getOrderingCases(++currentPage, res, limit, id)
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

const postCase = (date, lifecycle, parent, priority, tlp, assigned, state, comments, evidence, attend_date, solve_date) => {
    let messageSuccess = `El caso se pudo crear correctamente.`;
    let messageError = `El caso no se pudo crear.`;
    return apiInstance.post(COMPONENT_URL.case, {
        date: date, //
        lifecycle: lifecycle, 
        parent: parent,
        priority: priority, //
        tlp: tlp, //
        assigned: assigned,
        state: state, //
        comments: comments,
        evidence: evidence,
        attend_date: attend_date,
        solve_date: solve_date  
    }).then(response => {
        setAlert(messageSuccess, "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}
    
const putCase = (url, date, lifecycle, parent, priority, tlp, assigned, state, comments, evidence, attend_date, solve_date) => {
    let messageSuccess = `El caso se pudo editar correctamente.`;
    let messageError = `El caso no se pudo editar.`;
    return apiInstance.put(url,
    {
        date: date, //
        lifecycle: lifecycle, 
        parent: parent,
        priority: priority, //
        tlp: tlp, //
        assigned: assigned,
        state: state, //
        comments: comments,
        evidence: evidence,
        attend_date: attend_date,
        solve_date: solve_date  
    }).then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}


const deleteCase = (url) => {
    let messageSuccess = `El caso se pudo eliminar correctamente.`;
    let messageError = `El caso no se pudo eliminar.`;
    return apiInstance.delete(url)
    .then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const mergeCase = (urlParent, urlChildren) => {
    let messageSuccess = `Los casos han sido mergeados correctamente.`;
    let messageError = `Los casos no han sido mergeados.`;
    return apiInstance.patch(urlChildren,
    {
        parent : urlParent
    }).then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

export { getCases, getAllCases, getOrderingCases, getCase, postCase, putCase, deleteCase, mergeCase };
