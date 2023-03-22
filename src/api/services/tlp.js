import  apiInstance  from "../api";
import { COMPONENT_URL } from '../../config/constant';
import setAlert from '../../utils/setAlert';

const getTLP = () => {
    return apiInstance.get(COMPONENT_URL.tlp)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert("No se pudo recuperar la informacion de TLP", "error");
        return Promise.reject(error);
    });
}


export { getTLP };