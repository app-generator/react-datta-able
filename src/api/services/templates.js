import apiInstance from "../api";
import setAlert from '../../utils/setAlert';
import { COMPONENT_URL } from '../../config/constant';

const getTemplates = (page="") => {
  let messageError = `No se pudo recuperar la informacion de las plantillas`;
  return apiInstance.get(COMPONENT_URL.template+page)
  .then(response => {        
    return response;
}).catch( error => { 
    setAlert(messageError, "error");
    return Promise.reject(error);
});
}

const getTemplate = (url) => { 
  let messageError = `No se pudo recuperar la  plantilla`;
  return apiInstance.get(url).then(response => {        
    return response;
}).catch( error => { 
    setAlert(messageError, "error");
    return Promise.reject(error);
});
}

const postTemplate = (cidr,domain,active,priority,event_taxonomy,event_feed,case_lifecycle,case_tlp,case_state) => {
  let messageSuccess = `La plantilla se pudo crear correctamente`;
  let messageError = `La plantilla no se pudo crear`;
  const body = domain == "" ?  {
    cidr: cidr,
    active: active,
    priority: priority,
    event_taxonomy: event_taxonomy,
    event_feed: event_feed,
    case_lifecycle: case_lifecycle,
    case_tlp: case_tlp,
    case_state: case_state
  } : {
    cidr: cidr,
    domain: domain,
    active: active,
    priority: priority,
    event_taxonomy: event_taxonomy,
    event_feed: event_feed,
    case_lifecycle: case_lifecycle,
    case_tlp: case_tlp,
    case_state: case_state
  }
  return apiInstance.post(COMPONENT_URL.template, body).then(response => {
    setAlert(messageSuccess, "success");
    return response;
}).catch( error => { 
    setAlert(messageError, "error");
    return Promise.reject(error);
});
}

const putTemplate = ( url, cidr,domain,active,priority,event_taxonomy,event_feed,case_lifecycle,case_tlp,case_state) => {
  let messageSuccess = `La plantilla se pudo editar correctamente`;
    let messageError = `La plantilla no se pudo editar`;
  return apiInstance.put(url, {
    cidr: cidr,
    domain: domain,
    active: active,
    priority: priority,
    event_taxonomy: event_taxonomy,
    event_feed: event_feed,
    case_lifecycle: case_lifecycle,
    case_tlp: case_tlp,
    case_state: case_state
  }).then(response => {
    setAlert(messageSuccess , "success");
    return response;
}).catch( error => { 
    setAlert(messageError, "error");
    return Promise.reject(error);
});
}

const deleteTemplate = (url) => {
  let messageSuccess = `La plantilla se pudo eliminar correctamente`;
  let messageError = `La plantilla no se pudo eliminar`;
  return apiInstance.delete(url).then(response => {
    setAlert(messageSuccess , "success");
    return response;
}).catch( error => { 
    setAlert(messageError, "error");
    return Promise.reject(error);
})
}

const isActive = (url, active) =>{
  let messageSuccess = !active ? `La plantilla ha sido desactivado` : `La plantilla ha sido activado`;
  let messageError = `La plantilla no se pudo modificar`;
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

export  {getTemplates, getTemplate, postTemplate, putTemplate, deleteTemplate, isActive}