import { apiInstance } from "../api";
import { COMPONENT_URL } from '../../config/constant';

const getTLP = () => {
    return apiInstance.get(COMPONENT_URL.tlp);
}


export { getTLP };