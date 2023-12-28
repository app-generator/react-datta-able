import apiInstance from "../api";
import setAlert from '../../utils/setAlert';
import { COMPONENT_URL, PAGE } from '../../config/constant';

const getDashboardFeed = (filter ) => {
    let messageError = `No ha recuperado la informacion de las fuentes de información. `;
    return apiInstance.get(COMPONENT_URL.dashboardFeed + "?" + filter)
    .then(response => {        
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "feed");
        return Promise.reject(error);
    });
}

const getDashboardEvent = (filter) => {
    let messageError = `No ha recuperado la informacion de las fuentes de información. `;
    return apiInstance.get(COMPONENT_URL.dashboardEvent + "?" + filter)
    .then(response => {        
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "feed");
        return Promise.reject(error);
    });
}

const getDashboardCases = (filter) => {
    let messageError = `No ha recuperado la informacion de las fuentes de información. `;
    console.log(COMPONENT_URL.dashboardCases + "?" + filter)
    return apiInstance.get(COMPONENT_URL.dashboardCases + "?" + filter)
    .then(response => {        
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "feed");
        return Promise.reject(error);
    });
}

const getDashboardNetworkEntities = (filter) => {
    let messageError = `No ha recuperado la informacion de las fuentes de información. `;
    return apiInstance.get(COMPONENT_URL.dashboardNetworkEntities + "?" + filter)
    .then(response => {        
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "feed");
        return Promise.reject(error);
    });
}

export {getDashboardFeed, getDashboardEvent, getDashboardCases, getDashboardNetworkEntities };