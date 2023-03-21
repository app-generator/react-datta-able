import apiInstance from "../api";
import setAlert from '../../utils/setAlert';
import { COMPONENT_URL } from '../../config/constant';

const getCases = (page="") => {
    return apiInstance.get(COMPONENT_URL.case+page);
}

const getAllCases = () => {
    return apiInstance.get(COMPONENT_URL.case);
}

const getOrderingCases = (id) => {
    return apiInstance.get(COMPONENT_URL.case + '?ordering=' + id)
}

const getCase = (url) => { 
    return apiInstance.get(url);
}

const postCase = (date, lifecycle, parent, priority, tlp, assigned, state) => {
    return apiInstance.post(COMPONENT_URL.case, {
        date: date, 
        lifecycle: lifecycle, 
        parent: parent,
        priority: priority,
        tlp: tlp,
        assigned: assigned,
        state: state  
    }, 
    {
        validateStatus: function (status) {
            switch(status) {
                case 201:
                    setAlert(`El caso se ha creado correctamente`, "success");
                    break;
                case 400: 
                    setAlert("El caso no se ha creado (Bad Request)", "error");
                    break;
            }
            return status;
        }
    });
}

const putCase = (url, date, lifecycle, parent, priority, tlp, assigned, state) => {
    return apiInstance.put(url,
    {
        date: date, 
        lifecycle: lifecycle, 
        parent: parent,
        priority: priority,
        tlp: tlp,
        assigned: assigned,
        state: state  
    }, 
    {
        validateStatus: function (status) {
            switch(status) {
                case 200:
                    setAlert(`El caso se pudo editar correctamente`, "success");
                    break;
                case 404: 
                    setAlert(`El caso no se pudo editar`, "error");
                    break;
            }
            return status;
        }
    });
}

const deleteCase = (url) => { 
    return apiInstance.delete(url,  
    {
        validateStatus: function (status) {
            switch(status) {
                case 204:
                    setAlert("El caso se ha eliminado correctamente", "success");
                    break;
                case 404: 
                    setAlert("El caso no se ha eliminado", "error");
                    break;
            }
            return status;
        }
    });
}

export { getCases, getAllCases, getOrderingCases, getCase, postCase, putCase, deleteCase };
