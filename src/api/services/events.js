import  apiInstance  from "../api";
import { COMPONENT_URL } from '../../config/constant';

const getEvents = (page="") => {//el parametro es para completar la url con el numero de pagina
    
    return apiInstance.get(COMPONENT_URL.event+page);
}
const postEvent = () => {//el parametro es para completar la url con el numero de pagina
    
    return apiInstance.put(COMPONENT_URL.event,{});
}


export { getEvents , postEvent};