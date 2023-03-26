import  apiInstance  from "../api";
import { COMPONENT_URL } from '../../config/constant';

const getEvents = (page="") => {//el parametro es para completar la url con el numero de pagina
    
    return apiInstance.get(COMPONENT_URL.event+page);
}
const postEvent = (evidence, children, todos, artifacts, comments, cidr, domain, date, evidence_file_path,
    notes, parent, priority, tlp, taxonomy, feed, reporter, cases, tasks) => {//el parametro es para completar la url con el numero de pagina
    
    return apiInstance.post(COMPONENT_URL.event,{
        evidence:evidence, children:children, todos:todos, artifacts:artifacts, comments:comments, cidr:cidr, domain:domain,
         date:date, evidence_file_path:evidence_file_path,notes:notes, parent:parent, priority:priority, 
         tlp:tlp, taxonomy:taxonomy, feed:feed, reporter:reporter, case:cases, tasks:tasks
    });
}
const putEvent = (url,evidence, children, todos, artifacts, comments, cidr, domain, date, evidence_file_path,
    notes, parent, priority, tlp, taxonomy, feed, reporter, cases, tasks) => {//el parametro es para completar la url con el numero de pagina
    
    return apiInstance.put(url,{
        evidence:evidence, children:children, todos:todos, artifacts:artifacts, comments:comments, cidr:cidr, domain:domain,
         date:date, evidence_file_path:evidence_file_path,notes:notes, parent:parent, priority:priority, 
         tlp:tlp, taxonomy:taxonomy, feed:feed, reporter:reporter, case:cases, tasks:tasks
    });

}

const deleteEvent = (url) => {
    return apiInstance.delete(url);
}

export { getEvents , postEvent, putEvent, deleteEvent};