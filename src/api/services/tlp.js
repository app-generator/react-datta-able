import  apiInstance  from "../api";
import { COMPONENT_URL } from '../../config/constant';

const getTLP = () => {
    return apiInstance.get(COMPONENT_URL.tlp);
}
const getTLPSpecific = (url) => {
    return apiInstance.get(url);
}

export { getTLP, getTLPSpecific };