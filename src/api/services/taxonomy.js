import  apiInstance  from "../api";
import { COMPONENT_URL, PAGE } from '../../config/constant';


const getTaxonomy = (currentPage) => {
    return apiInstance.get(COMPONENT_URL.taxonomy + PAGE + currentPage);
}

const getParent = (url) => { 
    return apiInstance.get(url);
}

const postTaxonomy = (slug, type, name, description, active, parent) => {
    return apiInstance.post(COMPONENT_URL.taxonomy, {
        slug: slug,
        type: type, 
        name: name, 
        description: description,
        active: active,
        parent: parent    
    });
}


const putTaxonomy = (url, slug, type, name, description, active, parent) => {
    return apiInstance.put(url, {
        slug: slug,
        type: type, 
        name: name, 
        description: description,
        active: active, 
        parent: parent  
    });
}


const putActivationStatus= (url, state, name) => {
    return apiInstance.patch(url, {
        active: state    
    });
}


const deleteTaxonomy = (url, name) => {
    return apiInstance.delete(url);
}


export { getTaxonomy, postTaxonomy, putTaxonomy, getParent, putActivationStatus, deleteTaxonomy }