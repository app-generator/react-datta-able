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


export { getArtefacts, postArtifact, getArtefact};