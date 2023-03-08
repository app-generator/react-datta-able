import apiInstance from "../api";
import setAlert from '../../utils/setAlert';
import { COMPONENT_URL } from '../../config/constant';

const getTasks = (page="") => {
    return apiInstance.get(COMPONENT_URL.task+page);
}

const getAllTasks = () => {
    return apiInstance.get(COMPONENT_URL.task);
}

const getTask = (url) => { 
    return apiInstance.get(url);
}

const postTask = (name, description, priority, playbook) => {
    return apiInstance.post(COMPONENT_URL.task, {
        
        name: name,
        description: description,
        priority: priority,
        playbook: playbook
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

const putTask = (url, name, description, priority, playbook) => {
    return apiInstance.put(url, 
    {
        name: name,
        description: description,
        priority: priority,
        playbook: playbook
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

const deleteTask = (url) => {
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

export { getTasks, getAllTasks, getTask, postTask, putTask, deleteTask };
