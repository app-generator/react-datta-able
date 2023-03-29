import apiInstance from "../api";
import setAlert from '../../utils/setAlert';
import { COMPONENT_URL } from '../../config/constant';

const getTemplates = (page="") => {
  return apiInstance.get(COMPONENT_URL.template+page);
}

const getTemplate = (url) => { 
  return apiInstance.get(url);
}

const postTemplate = (cidr,domain,active,priority,event_taxonomy,event_feed,case_lifecycle,case_tlp,case_state) => {
    
  return apiInstance.post(COMPONENT_URL.template, {
    cidr: cidr,
    domain: domain,
    active: active,
    priority: priority,
    event_taxonomy: event_taxonomy,
    event_feed: event_feed,
    case_lifecycle: case_lifecycle,
    case_tlp: case_tlp,
    case_state: case_state
  });
}

const putTemplate = ( url, cidr,domain,active,priority,event_taxonomy,event_feed,case_lifecycle,case_tlp,case_state) => {
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
  });
}

const deleteTemplate = (url) => {
  return apiInstance.delete(url);
}

const isActive = (url, active) =>{
  return apiInstance.patch(url, {
      active: active
  } );
}

export  {getTemplates, getTemplate, postTemplate, putTemplate, deleteTemplate, isActive}