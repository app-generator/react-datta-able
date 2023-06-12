import apiInstance from "../api";
import { COMPONENT_URL, PAGE } from '../../config/constant';
import setAlert from '../../utils/setAlert';

const getCases = (currentPage) => {
    let messageError = `No se ha recuperado informacion de casos. `;
    return apiInstance.get(COMPONENT_URL.case + PAGE + currentPage)
    .then(response => {        
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "case");
        return Promise.reject(error);
    });
}

const getCase = (url) => {
    let messageError = `No se ha recuperado informacion del caso. `;
    return apiInstance.get(url)
    .then(response => {        
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "case");
        return Promise.reject(error);
    });
}

const getAllCases = (currentPage = 1, results = [], limit = 100) => {
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
            return Promise.reject(error);            
        })   
}

const getOrderingCases = (currentPage = 1, results = [], limit = 100, id='+id') => {
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
            return Promise.reject(error);            
        })   
}
//const postCase = (date, lifecycle, parent, priority, tlp, assigned, state, comments, evidence, attend_date, solve_date) => {
const postCase = (formData) => {
    let messageSuccess = `El caso ha sido creado correctamente.`;
    let messageError = `El caso no ha sido creado. `;
    return apiInstance.post(COMPONENT_URL.case, formData)
    /*    {
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
    }*/
    .then(response => {
        setAlert(messageSuccess, "success", "case");
        return response;
    }).catch( error => { 
        console.log(error.response.data)
        if (error.response.status == 400 ) { 
            if(error.response.data.parent != null) {
                messageError += 'La red padre no es valida. ';
            }
            else if(error.response.data.assigned != null) {
                messageError += 'El usuario asignado no es valido. ';             
            } 
        }        
        setAlert(messageError , "error", "case");
        return Promise.reject(error);
    });
}
    
//const putCase = (url, date, lifecycle, parent, priority, tlp, assigned, state, comments, evidence, attend_date, solve_date) => {
    const putCase = (url, formData) => {
        let messageSuccess = `El caso se ha editado correctamente.`;
        let messageError = `El caso no se ha editado. `;
        return apiInstance.put(url, formData
        /*{
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
        }*/
        ).then(response => {
            setAlert(messageSuccess , "success", "case");
            return response;
        }).catch( error => { 
            let statusText = error.response.statusText;
            messageError += statusText;
            setAlert(messageError , "error", "case");
            return Promise.reject(error);
        });
    }


const deleteCase = (url) => {
    let messageSuccess = `El caso se ha eliminado correctamente.`;
    let messageError = `El caso no se ha eliminado. `;
    return apiInstance.delete(url)
    .then(response => {
        setAlert(messageSuccess , "success", "case");
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "case");
        return Promise.reject(error);
    });
}

const mergeCase = (urlParent, urlChildren) => {
    let messageSuccess = `Los casos han sido mergeados correctamente.`;
    let messageError = `Los casos no han sido mergeados. `;
    return apiInstance.patch(urlChildren,
    {
        parent : urlParent
    }).then(response => {
        setAlert(messageSuccess , "success", "case");
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "case");
        return Promise.reject(error);
    });
}

export { getCases, getAllCases, getOrderingCases, getCase, postCase, putCase, deleteCase, mergeCase };
