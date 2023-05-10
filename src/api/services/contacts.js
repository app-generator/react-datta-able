import apiInstance from "../api";
import setAlert from '../../utils/setAlert';
import { COMPONENT_URL, PAGE } from '../../config/constant';

const getContacts = (currentPage) => {
    let messageError = `No se pudo recuperar la informacion de los contactos.`;
    return apiInstance.get(COMPONENT_URL.contact + PAGE + currentPage)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const getContact = (url) => {
    let messageError = `No se pudo recuperar la informacion del contacto.`;
    return apiInstance.get(url)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const getAllContacts = (currentPage = 1, results = [], limit = 100) => {
    let messageError = `No se pudo recuperar la informacion de los contactos.`;            
    return apiInstance.get(COMPONENT_URL.feed, { params: { page: currentPage, page_size: limit } })       
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
            setAlert(messageError, "error");
            return Promise.reject(error);            
        })   
}

const postContact = (name, username, public_key, type, role, priority) => {
    let messageSuccess = `El contacto ${name} se pudo crear correctamente`;
    let messageError = `El contacto ${name} no se pudo crear`;
    return apiInstance.post(COMPONENT_URL.contact, {
        name: name, //*
        username: username, //*
        public_key: public_key, 
        type: type, //*
        role: role, //*
        priority: priority //*
        }).then(response => {
            setAlert(messageSuccess, "success");
            return response;
        }).catch( error => { 
            setAlert(messageError, "error");
            return Promise.reject(error);
        });
    }


const putContact = (url, name, username, public_key, type, role, priority) => {
    let messageSuccess = `El contacto ${name} se pudo editar correctamente`;
    let messageError = `El contacto ${name} no se pudo editar`;
    return apiInstance.put(url, 
    {
        name: name, 
        username: username, 
        public_key: public_key, 
        type: type, 
        role: role, 
        priority: priority
    }).then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const deleteContact = (url, name) => {
    let messageSuccess = `El contacto ${name} se pudo eliminar correctamente`;
    let messageError = `El contacto ${name} no se pudo eliminar`;
    return apiInstance.delete(url)
    .then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

export { getContacts, getAllContacts, getContact, postContact, putContact, deleteContact };
