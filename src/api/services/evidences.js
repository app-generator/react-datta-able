import  apiInstance  from "../api";
import { COMPONENT_URL } from '../../config/constant';

const getEvidences = () => {
    
    return apiInstance.get(COMPONENT_URL.evidence);
}

export { getEvidences };
