import { apiInstance } from "../custom";
import { COMPONENT_URL } from '../../config/constant';

const getTLP = () => {
    return apiInstance.get(COMPONENT_URL.tlp);
}


export { getTLP };