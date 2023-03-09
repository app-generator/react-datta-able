import apiInstance from "../api";
import setAlert from '../../utils/setAlert';
import { COMPONENT_URL } from '../../config/constant';

const getContacts = (page="") => {
    return apiInstance.get(COMPONENT_URL.contact+page);
}

const getAllContacts = () => {
    return apiInstance.get(COMPONENT_URL.contact);
}

const getContact = (url) => { 
    return apiInstance.get(url);
}

const postContact = (name, username, public_key, type, role, priority) => {
    return apiInstance.post(COMPONENT_URL.contact, {
        name: name, //*
        username: username, //*
        public_key: public_key, 
        type: type, //*
        role: role, //*
        priority: priority //*
    }, 
    {
        validateStatus: function (status) {
            switch(status) {
                case 201:
                    setAlert(`El contacto de ${name} se ha creado correctamente`, "success");
                    break;
                case 400: 
                    setAlert("El contacto no se ha creado (Bad Request)", "error");
                    break;
            }
            return status;
        }
    });
}

const putContact = (url, name, username, public_key, type, role, priority) => {
    return apiInstance.put(url, 
    {
        name: name, 
        username: username, 
        public_key: public_key, 
        type: type, 
        role: role, 
        priority: priority
    }, 
    {
        validateStatus: function (status) {
            switch(status) {
                case 200:
                    setAlert(`El contacto de ${name} se pudo editar correctamente`, "success");
                    break;
                case 404: 
                    setAlert(`El contacto de ${name} no se pudo editar`, "error");
                    break;
            }
            return status;
        }
    });
}
const deleteContact = (url) => {
    return apiInstance.delete(url,  
        {
            validateStatus: function (status) {
                switch(status) {
                    case 204:
                        setAlert("El contacto se ha eliminado correctamente", "success");
                        break;
                    case 404: 
                        setAlert("El contacto no se ha eliminado", "error");
                        break;
                }
                return status;
            }
        });
    }

export { getContacts, getAllContacts, getContact, postContact, putContact, deleteContact };
