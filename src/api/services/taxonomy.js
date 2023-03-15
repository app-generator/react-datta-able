import  apiInstance  from "../api";
import { COMPONENT_URL, PAGE } from '../../config/constant';


const getTaxonomies = (currentPage) => {
    return apiInstance.get(COMPONENT_URL.taxonomy + PAGE + currentPage);
}

const getTaxonomy = (url) => { 
    return apiInstance.get(url);
}

const getAllTaxonomies = (currentPage = 1, results = [], limit = 100) => {

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
            return Promise.reject(error);            
        })   

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


const putActivationStatus= (url, state) => {
    return apiInstance.patch(url, {
        active: state    
    });
}


const deleteTaxonomy = (url) => {
    return apiInstance.delete(url);
}


export { getTaxonomies, getTaxonomy, postTaxonomy, putTaxonomy, putActivationStatus, deleteTaxonomy,  getAllTaxonomies }







