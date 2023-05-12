import  apiInstance  from "../api";
import { COMPONENT_URL } from '../../config/constant';

const getEvidences = () => {
    
    return apiInstance.get(COMPONENT_URL.evidence);
}
const getEvidence = (url) => {
    
    return apiInstance.get(url);
}
const patchEvidence = (url, evidence) =>{
    return apiInstance.patch(url,
        {
            evidence : evidence
        })
}
const deleteEvidence = (url) => {
    return apiInstance.delete(url);
}

export { getEvidences, getEvidence, patchEvidence, deleteEvidence };
