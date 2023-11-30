import  apiInstance  from "../api";
import { COMPONENT_URL , PAGE} from '../../config/constant';
import setAlert from '../../utils/setAlert';

const getPriorities = (currentPage, filters,order) => {//el parametro es para completar la url con el numero de pagina
    let messageError = `No se pudo recuperar la informacion de las prioridades`;
    return apiInstance.get(COMPONENT_URL.priority+ PAGE + currentPage + '&ordering=' + order +'&' + filters)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const getPriority = (url) => { 
    let messageError = `No se pudo recuperar la informacion de la prioridad`;
    return apiInstance.get(url)
    .then(response => {        
        return response;
    }).catch( error => { 
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const getAllPriorities = (currentPage = 1, results = [], limit = 100) => {
            
    return apiInstance.get(COMPONENT_URL.priority, { params: { page: currentPage, page_size: limit } })       
        .then((response) => {
            let res = [...results, ...response.data.results]                                    
            if(response.data.next != undefined){                                
                return getAllPriorities(++currentPage, res, limit)
            }
            else{
                return res;     
            }                  
        })
        .catch((error) => {
            return Promise.reject(error);            
        })   

}

const postPriority = (name, color, severity, attend_time, solve_time) => {
    let messageSuccess = `La prioridad ${name} se pudo crear correctamente. `;
    let messageError = `La prioridad ${name} no se pudo crear. `;
    return apiInstance.post(COMPONENT_URL.priority, {
        name: name, 
        color: color, 
        severity: severity, 
        attend_time: attend_time, 
        solve_time: solve_time
    }).then(response => {
        setAlert(messageSuccess, "success");
        return response;
    }).catch( error => {
        let statusText = ""; 

        if (error.response.status == 400){
            console.log("status 400")

            //se informa que existe el username con ese nombre
            if(error.response.data.slug && error.response.data.slug[0].substring(0, 39) == "Ya existe una entidad Priority con slug") {
                statusText = "Ingrese un nombre diferente. "; 
                console.log("SLUG")
            } else if(error.response.data.severity && error.response.data.severity[0] == "priority with this severity already exists." ){
                statusText = `Ingrese una severidad diferente.`;   
                console.log("SEVERIDAD")
            } else if(error.response.data.color && error.response.data.color[0] == "Enter a valid hex color, eg. #000000") {
                statusText = "Ingrese un color valido. ";   
                console.log("COLOR")
            } 

        }else if(error.message == "Cannot read properties of undefined (reading 'code')"){
            //el backend o servidor no funciona
            messageError = `El usuario ${name} no puede ser creado porque el servidor no responde`;
        } else{
            statusText = error.response.statusText;
        }
        messageError += statusText;
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const putPriority = ( url, name, color, severity, attend_time, solve_time) => {
    let messageSuccess = `La prioridad ${name} se pudo crear correctamente. `;
    let messageError = `La prioridad ${name} no se pudo crear. `;
    return apiInstance.put(url, {
        name: name, 
        color: color, 
        severity: severity, 
        attend_time: attend_time, 
        solve_time: solve_time
        
    }).then(response => {
        setAlert(messageSuccess, "success");
        return response;
    }).catch( error => { 
        let statusText = ""; 
        if (error.response.status == 400){
            console.log("status 400")

            //se informa que existe el username con ese nombre
            if(error.response.data.slug && error.response.data.slug[0].substring(0, 39) == "Ya existe una entidad Priority con slug") {
                statusText = "Ingrese un nombre diferente. "; 
            } else if(error.response.data.severity && error.response.data.severity[0] == "priority with this severity already exists." ){
                statusText = `Ingrese una severidad diferente.`;   
            } else if(error.response.data.color && error.response.data.color[0] == "Enter a valid hex color, eg. #000000") {
                statusText = "Ingrese un color valido. ";   
            } 

        }else if(error.message == "Cannot read properties of undefined (reading 'code')"){
            //el backend o servidor no funciona
            messageError = `El usuario ${name} no puede ser creado porque el servidor no responde`;
        } else{
            statusText = error.response.statusText;
        }
        messageError += statusText;
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}

const deletePriority = (url) => {
    let messageSuccess = `La prioridad se pudo eliminar correctamente. `;
    let messageError = `La prioridad no se pudo eliminar`;
    return apiInstance.delete(url).then(response => {
        setAlert(messageSuccess , "success");
        return response;
    }).catch( error => {
        let statusText = ""; 
        if(error.response.data.error && error.response.data.error[0].includes("Cannot delete some instances of model 'Priority' because they are referenced through protected foreign keys")){
            statusText = ", esta referenciada.";
        }
        messageError += statusText;
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}
export { getPriorities, getAllPriorities, getPriority, postPriority, deletePriority, putPriority }