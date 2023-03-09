import apiInstance from "../api";
import setAlert from '../../utils/setAlert';
import { COMPONENT_URL } from '../../config/constant';

const getPlaybooks = (page="") => {
    return apiInstance.get(COMPONENT_URL.playbook+page);
}

const getAllPlaybooks = () => {
    return apiInstance.get(COMPONENT_URL.playbook);
}

const getPlaybook = (url) => { 
    return apiInstance.get(url);
}

const postPlaybook = (name, taxonomy) => {
    return apiInstance.post(COMPONENT_URL.playbook, {
        
        name: name,
        taxonomy: taxonomy, //[]
    }, 
    {
        validateStatus: function (status) {
            switch(status) {
                case 201:
                    setAlert('Se ha creado', "success");
                    break;
                case 400: 
                    setAlert('No se ha creado', "error");
                    break;
            }
            return status;
        }
    });
}

const putPlaybook = (url, name, taxonomy) => {
    return apiInstance.put(url, 
    {
        name: name,
        taxonomy : taxonomy
    }, 
    {
        validateStatus: function (status) {
            switch(status) {
                case 200:
                    setAlert('Se ha editado', "success");
                    break;
                case 404: 
                setAlert('No se ha editado', "error");
                break;
            }
            return status;
        }
    });
}

const deletePlaybook = (url) => {
    return apiInstance.delete(url,  
    {
        validateStatus: function (status) {
            switch(status) {
                case 204:
                    setAlert("Se ha eliminado", "success");
                    break;
                case 404: 
                    setAlert("No se ha eliminado", "error");
                    break;
                case 500: 
                    setAlert("No se elimino.", "error");
                    break;
            }
            return status;
        }
    });
}

export { getPlaybooks, getAllPlaybooks, getPlaybook, postPlaybook, putPlaybook, deletePlaybook };
