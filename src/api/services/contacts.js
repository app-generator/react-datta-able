import apiInstance from "../api";
import setAlert from '../../utils/setAlert';
import { COMPONENT_URL, PAGE } from '../../config/constant';

const getContacts = (currentPage) => {
    let messageError = `No se ha recuperado la informacion de contactos. `;
    return apiInstance.get(COMPONENT_URL.contact + PAGE + currentPage)
    .then(response => {        
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "contact");
        return Promise.reject(error);
    });
}

const getContact = (url) => {
    let messageError = `No se ha recuperado la informacion del contacto. `;
    return apiInstance.get(url)
    .then(response => {        
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "contact");
        return Promise.reject(error);
    });
}

const getAllContacts = (currentPage = 1, results = [], limit = 100) => {
    return apiInstance.get(COMPONENT_URL.contact, { params: { page: currentPage, page_size: limit } })       
        .then((response) => {
            let res = [...results, ...response.data.results]                                    
            if(response.data.next != undefined){                                
                return getAllContacts(++currentPage, res, limit)
            }
            else{
                return res;     
            }                  
        })
        .catch((error) => {
            return Promise.reject(error);
        })   
}

const postContact = (name, username, public_key, type, role, priority) => {
    let messageSuccess = `El contacto ${name} se ha creado correctamente.`;
    let messageError = `El contacto ${name} no se ha creado. `;
    return apiInstance.post(COMPONENT_URL.contact, {
        name: name, //*
        username: username, //*
        public_key: public_key, 
        type: type, //*
        role: role, //*
        priority: priority //*
        }).then(response => {
            setAlert(messageSuccess, "success", "contact");
            return response;
        }).catch( error => {

            let statusText = error.response.data.username;
            messageError += statusText;
            setAlert(messageError , "error", "contact");
            return Promise.reject(error);
        });
    }


const putContact = (url, name, username, public_key, type, role, priority) => {
    let messageSuccess = `El contacto ${name} se ha editado correctamente.`;
    let messageError = `El contacto ${name} no se ha editado. `;
    return apiInstance.put(url, 
    {
        name: name, 
        username: username, 
        public_key: public_key, 
        type: type, 
        role: role, 
        priority: priority
    }).then(response => {
        setAlert(messageSuccess , "success", "contact");
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "contact");
        return Promise.reject(error);
    });
}

const deleteContact = (url, name) => {
    let messageSuccess = `El contacto ${name} se ha eliminado correctamente.`;
    let messageError = `El contacto ${name} no se ha eliminado. `;
    return apiInstance.delete(url)
    .then(response => {
        setAlert(messageSuccess , "success", "contact");
        return response;
    }).catch( error => { 
        let statusText = error.response.statusText;
        messageError += statusText;
        setAlert(messageError , "error", "contact");
        return Promise.reject(error);
    });
}

export { getContacts, getAllContacts, getContact, postContact, putContact, deleteContact };
