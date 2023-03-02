import apiInstance from "../api";
import setAlert from '../../utils/setAlert';
import { COMPONENT_URL } from '../../config/constant';

const getNetworks = (page="") => {
    return apiInstance.get(COMPONENT_URL.network+page);
}

const getNetwork = (url) => { 
    return apiInstance.get(url);
}

const postNetwork = (children, cidr, domain, active, type, parent, network_entity, contacts) => {
    return apiInstance.post(COMPONENT_URL.network, {
        
        children: children,
        cidr: cidr, //*
        domain: domain,
        active: active,
        type: type,
        parent, parent,
        network_entity: network_entity,
        contacts: contacts //*
    }, 
    {
        validateStatus: function (status) {
            switch(status) {
                case 201:
                    setAlert(`La red ${cidr} se ha creado correctamente`, "success");
                    break;
                case 400: 
                    setAlert("La red no se ha creado (Bad Request)", "error");
                    break;
            }
            return status;
        }
    });
}

const putNetwork = (url, children, cidr, domain, active, type, parent, network_entity, contacts) => {
    return apiInstance.put(url, 
    {
        children: children,
        cidr: cidr, //*
        domain: domain,
        active: active,
        type: type,
        parent, parent,
        network_entity: network_entity,
        contacts: contacts //*
    }, 
    {
        validateStatus: function (status) {
            switch(status) {
                case 200:
                    setAlert(`La red ${cidr} se pudo editar correctamente`, "success");
                    break;
                case 404: 
                    setAlert(`La red ${cidr} no se pudo editar`, "error");
                    break;
            }
            return status;
        }
    });
}

const deleteNetwork = (url) => {
    return apiInstance.delete(url,  
    {
        validateStatus: function (status) {
            switch(status) {
                case 204:
                    setAlert("La red se ha eliminado correctamente", "success");
                    break;
                case 404: 
                    setAlert("La red no se ha eliminado", "error");
                    break;
                case 500: 
                    setAlert("No se elimino", "error");
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
                    setAlert(active ? "La red se ha activado correctamente" : "La red se ha desactivado correctamente", "success");
                    break;
                case 404: 
                    setAlert(active ? "La red no se ha activado" : "La red no se ha desactivado", "error");
                    break;
            }
            return status;
        }
    }); 
}

export { getNetworks, getNetwork, postNetwork, putNetwork, deleteNetwork, isActive };
