import  apiInstance  from "../api";
import { COMPONENT_URL, PAGE } from '../../config/constant';
import setAlert from '../../utils/setAlert';


const getTaxonomies = (currentPage) => {
    let messageError = `No se pudo recuperar la informacion de las taxonomias`;
    return apiInstance.get(COMPONENT_URL.taxonomy + PAGE + currentPage)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const getTaxonomy = (url) => { 
    let messageError = `No se pudo recuperar la informacion de la taxonomia`;
    return apiInstance.get(url)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const getAllTaxonomies = (currentPage = 1, results = [], limit = 100) => {
    let messageError = `No se pudo recuperar la informacion de las taxonomias`;    
    return apiInstance.get(COMPONENT_URL.taxonomy, { params: { page: currentPage, page_size: limit } })       
        .then((response) => {
            let res = [...results, ...response.data.results]                                    
            if(response.data.next != undefined){                                
                return getAllTaxonomies(++currentPage, res, limit)
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

const postTaxonomy = (slug, type, name, description, active, parent) => {
    let messageSuccess = `La taxonomia ${name} se pudo crear correctamente`;
    let messageError = `La taxonomia ${name} no se pudo crear`;
    return apiInstance.post(COMPONENT_URL.taxonomy, {
        slug: slug,
        type: type, 
        name: name, 
        description: description,
        active: active,
        parent: parent    
    }).then(response => {
        setAlert(messageSuccess, "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}


const putTaxonomy = (url, slug, type, name, description, active, parent) => {
    let messageSuccess = `La taxonomia ${name} se pudo editar correctamente`;
    let messageError = `La taxonomia ${name} no se pudo editar`;
    return apiInstance.put(url, {
        slug: slug,
        type: type, 
        name: name, 
        description: description,
        active: active, 
        parent: parent  
    }).then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}


const putActivationStatus= (url, state, name) => {
    let messageSuccess = !state ? `La taxonomia ${name} ha sido desactivada` : `La taxonomia ${name} ha sido activada`;
    let messageError = `La taxonomia ${name} no se pudo modificar`;
    return apiInstance.patch(url, {
        active: state    
    }).then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}


const deleteTaxonomy = (url, name) => {
    let messageSuccess = `La taxonomia ${name} se pudo eliminar correctamente`;
    let messageError = `La taxonomia ${name} no se pudo eliminar`;
    return apiInstance.delete(url)
    .then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}


export { getTaxonomies, getTaxonomy, getAllTaxonomies, postTaxonomy, putTaxonomy, putActivationStatus, deleteTaxonomy }







