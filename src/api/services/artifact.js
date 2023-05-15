import  apiInstance  from "../api";
import { COMPONENT_URL } from '../../config/constant';

const getArtefacts = (page="") => {//el parametro es para completar la url con el numero de pagina
    
    return apiInstance.get(COMPONENT_URL.artifact+page);
}

const getArtefact = (url) => {//el parametro es para completar la url con el numero de pagina
    
    return apiInstance.get(url);
}
const postArtifact = (type, value) => {//el parametro es para completar la url con el numero de pagina
    
    return apiInstance.post(COMPONENT_URL.artifact,{
        type:type, value:value
    });
}
const getAllArtifacts = (currentPage = 1, results = [], limit = 100) => {
    return apiInstance.get(COMPONENT_URL.artifact, { params: { page: currentPage, page_size: limit } })       
        .then((response) => {
            let res = [...results, ...response.data.results]                                    
            if(response.data.next != undefined){                                
                return getAllArtifacts(++currentPage, res, limit)
            }
            else{
                return res;     
            }                  
        })
        .catch((error) => {
            return Promise.reject(error);            
        })
}


export { getArtefacts, postArtifact, getArtefact, getAllArtifacts};