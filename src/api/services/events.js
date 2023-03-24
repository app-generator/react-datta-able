import  apiInstance  from "../api";
import { COMPONENT_URL } from '../../config/constant';

const getEvents = () => {
    return apiInstance.get(COMPONENT_URL.event);
}

export { getEvents };
