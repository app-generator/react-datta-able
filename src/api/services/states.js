import  apiInstance  from "../api";
import { COMPONENT_URL } from '../../config/constant';
import setAlert from '../../utils/setAlert';

const getStates = (page="") => {//el parametro es para completar la url con el numero de pagina
    let messageError = `No se pudo recuperar la informacion de los estados`;
    return apiInstance.get(COMPONENT_URL.state+page)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const getAllStates = (currentPage = 1, results = [], limit = 100) => {
            
    return apiInstance.get(COMPONENT_URL.state, { params: { page: currentPage, page_size: limit } })       
        .then((response) => {
            let res = [...results, ...response.data.results]                                    
            if(response.data.next != undefined){                                
                return getAllStates(++currentPage, res, limit)
            }
            else{
                return res;     
            }                  
        })
        .catch((error) => {
            return Promise.reject(error);            
        })   

}

const postState = ( name,attended,solved,active,description,children) => {  
    let messageSuccess = `El estado ${name} se pudo crear correctamente`;
    let messageError = `El estado ${name} no se pudo crear`; 
    return apiInstance.post(COMPONENT_URL.state, {
        name: name,
        attended: attended,
        solved:solved,
        active:active,
        description:description,
        children:children 
    }).then(response => {
        setAlert(messageSuccess, "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}
const putState = ( url,name,attended,solved,active,description,children) => {
    let messageSuccess = `EL estado ${name} se pudo crear correctamente`;
    let messageError = `El estado ${name} no se pudo crear`;
    return apiInstance.put(url, {
        name: name,
        attended: attended,
        solved:solved,
        active:active,
        description:description,
        children:JSON.stringify(children)
        
    }).then(response => {
        setAlert(messageSuccess, "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const deleteState = ( url) => {
    let messageSuccess = `El estado se pudo eliminar correctamente`;
    let messageError = `El estado no se pudo eliminar`;
    return apiInstance.delete(url).then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 


        let statusText = ''; 
        let substring = error.response.split('\\")')[0];
        console.log(error) 
        if (substring == "(Cannot delete some instances of model 'State' because they are referenced through protected foreign keys: 'Case.state'.") {
            statusText = "Ingrese un CIDR diferente. "; 
        } else {
            statusText = "CAPTURAR NUEVO ERROR"
        }
        messageError += statusText;


        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const isActive = (url, active) =>{
    let messageSuccess = !active ? `El estado ha sido desactivado` : `El estado ha sido activado`;
    let messageError = `El estado no se pudo modificar`;
    return apiInstance.patch(url, {
        active: active
    } ).then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const getState = (url) => { 
    let messageError = `No se pudo recuperar la informacion del estado`;
    return apiInstance.get(url)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

export { getStates, getAllStates, postState, putState, deleteState, isActive, getState }
