import  apiInstance  from "../api";
import { COMPONENT_URL, PAGE } from '../../config/constant';
import setAlert from "../../utils/setAlert";

const getFeeds = (currentPage) => {
    return apiInstance.get(COMPONENT_URL.feed + PAGE + currentPage);
}

const postFeed = (slug, name, description, active) => {
    return apiInstance.post(COMPONENT_URL.feed, {
        slug: slug, 
        name: name, 
        description: description,
        active: active
    },{
        validateStatus: function (status) {
            let messageSuccess = `La fuente de informacion ${name} se pudo crear correctamente`;
            let messageError = `La fuente de informacion ${name} no se pudo crear`;
            if (status === 200)                 
                setAlert(messageSuccess, "success");
            else 
                setAlert(messageError, "error");
            return status;
        }
    });
}


const putFeed = (url, slug, name, description, active) => {
    return apiInstance.put(url, {
        slug: slug, 
        name: name, 
        description: description,
        active: active
    },{
        validateStatus: function (status) {
            let messageSuccess = `La fuente de informacion ${name} se pudo editar correctamente`;
            let messageError = `La fuente de informacion ${name} no se pudo editar`;
             if (status === 200)                 
                setAlert(messageSuccess, "success");
            else 
                setAlert(messageError, "error");
            return status;
        }
    });
}


const putActivationStatus= (url, state, name) => {
    return apiInstance.patch(url, {
        active: state
    },{
        validateStatus: function (status) {
            let messageSuccess = +!state ? `La fuente de informacion ${name} ha sido desactivada` : `La fuente de informacion ${name} ha sido activada`;
            let messageError = `La fuente de informacion ${name} no se pudo modificar`;
             if (status === 200)                 
                setAlert(messageSuccess, "success");
            else 
                setAlert(messageError, "error");
            return status;
        } 
    });
}


const deleteFeed = (url, name) => {
    return apiInstance.delete(url,{
        validateStatus: function (status) {
            let messageSuccess = `La fuente de informacion ${name} se pudo eliminar correctamente`;
            let messageError = `La fuente de informacion ${name} no se pudo eliminar`;
             if (status === 200)                 
                setAlert(messageSuccess, "success");
            else 
                setAlert(messageError, "error");
            return status;
        } 
    });
}

export { getFeeds, postFeed, putFeed, putActivationStatus, deleteFeed };