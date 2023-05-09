import apiInstance from "../api";
import setAlert from '../../utils/setAlert';
import { COMPONENT_URL } from '../../config/constant';

const getEntities = (page="") => {
    return apiInstance.get(COMPONENT_URL.entity+page);
}

const getEntity = (url) => { 
    return apiInstance.get(url);
}

const getAllEntities = (currentPage = 1, results = [], limit = 100) => {
            
    return apiInstance.get(COMPONENT_URL.entity, { params: { page: currentPage, page_size: limit } })       
        .then((response) => {
            let res = [...results, ...response.data.results]                                    
            if(response.data.next != undefined){                                
                return getAllEntities(++currentPage, res, limit)
            }
            else{
                return res;     
            }                  
        })
        .catch((error) => {
            return Promise.reject(error);            
        })   

}

const postEntity = (name, active) => {
    return apiInstance.post(COMPONENT_URL.entity, {
        name: name, 
        active: active 
    }, 
    {
        validateStatus: function (status) {
            switch(status) {
                case 201:
                    setAlert(`La entidad ${name} se ha creado correctamente`, "success");
                    break;
                case 400: 
                    setAlert("La entidad no se ha creado (Bad Request)", "error");
                    break;
            }
            return status;
        }
    });
}

const putEntity = (url, name, active) => {
    return apiInstance.put(url,
    {
        name: name, 
        active: active 
    }, 
    {
        validateStatus: function (status) {
            switch(status) {
                case 200:
                    setAlert(`La entidad ${name} se pudo editar correctamente`, "success");
                    break;
                case 404: 
                    setAlert(`La entidad ${name} no se pudo editar`, "error");
                    break;
            }
            return status;
        }
    });
}

const deleteEntity = (url) => { 
    return apiInstance.delete(url,  
    {
        validateStatus: function (status) {
            switch(status) {
                case 204:
                    setAlert("La entidad se ha eliminado correctamente", "success");
                    break;
                case 404: 
                    setAlert("La entidad no se ha eliminado", "error");
                    break;
            }
            return status;
        }
    });
}

const isActive = (url, active) => { 
    return apiInstance.patch(url, 
    {
        active: active
    }, 
    {
        validateStatus: function (status) {
            switch(status) {
                case 200:
                    setAlert(active ? "La entidad se ha activado correctamente" : "La entidad se ha desactivado correctamente", "success");
                    break;
                case 404: 
                    setAlert(active ? "La entidad no se ha activado" : "La entidad no se ha desactivado", "error");
                    break;
            }
            return status;
        }
    }); 
}

export { getEntities, getAllEntities, getEntity, postEntity, putEntity, deleteEntity, isActive };
