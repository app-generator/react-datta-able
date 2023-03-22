import  apiInstance  from "../api";
import { COMPONENT_URL } from '../../config/constant';
import setAlert from '../../utils/setAlert';

const getTLP = () => {
    let messageError = `No se pudo recuperar la informacion de TLP`;
    return apiInstance.get(COMPONENT_URL.tlp)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}


export { getTLP };