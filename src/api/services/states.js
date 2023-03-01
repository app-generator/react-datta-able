import  apiInstance  from "../api";
import { COMPONENT_URL } from '../../config/constant';

const getStates = (page="") => {//el parametro es para completar la url con el numero de pagina
    
    return apiInstance.get(COMPONENT_URL.state+page);
}
export {getStates}