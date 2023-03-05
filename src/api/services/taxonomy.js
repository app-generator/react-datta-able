import  apiInstance  from "../api";
import { COMPONENT_URL, PAGE } from '../../config/constant';
import setAlert from "../../utils/setAlert";

const getTaxonomy = (currentPage) => {
    return apiInstance.get(COMPONENT_URL.taxonomy + PAGE + currentPage);
}

const putActivationStatus= (url, state, name) => {
    return apiInstance.patch(url, {
        active: state
    },{
        validateStatus: function (status) {
            let messageSuccess = +!state ? `La taxonomia ${name} ha sido desactivada` : `La taxonomia ${name} ha sido activada`;
            let messageError = `La taxonomia ${name} no se pudo modificar`;
             if (status === 200)                 
                setAlert(messageSuccess, "success");
            else 
                setAlert(messageError, "error");
            return status;
        } 
    });
}


const deleteTaxonomy = (url, name) => {
    return apiInstance.delete(url,{
        validateStatus: function (status) {
            let messageSuccess = `La taxonomia ${name} se pudo eliminar correctamente`;
            let messageError = `La taxonomia ${name} no se pudo eliminar`;
             if (status === 200)                 
                setAlert(messageSuccess, "success");
            else 
                setAlert(messageError, "error");
            return status;
        } 
    });
}


export { getTaxonomy, putActivationStatus, deleteTaxonomy }