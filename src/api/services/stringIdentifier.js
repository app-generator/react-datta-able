import  apiInstance  from "../api";
import setAlert from '../../utils/setAlert';
import { COMPONENT_URL } from '../../config/constant';

const postStringIdentifier = (identifier) =>{
    return apiInstance.post(COMPONENT_URL.stringidentifier, {
        input_string: identifier
    }).then(response => {
        console.log(response.data)
        return response;
    }).catch(error => {
        return Promise.reject(error);
    });
}

export {postStringIdentifier}