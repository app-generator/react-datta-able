import apiInstance from "../api";
import setAlert from '../../utils/setAlert';
import { COMPONENT_URL, PAGE } from '../../config/constant';

const getDashboardFeed = () => {
    let messageError = `No ha recuperado la informacion de entidades. `;
    return apiInstance.get(COMPONENT_URL.dashboardFeed)
    .then(response => {        
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "entity");
        return Promise.reject(error);
    });
}
export {getDashboardFeed };