import { apiInstance } from "../custom";

const getContacts = () => {
    return apiInstance.get("contact/");
}

const getContact = (id) => { 
    return apiInstance.get("contact/"+id+"/");
}

const postContact = (name, username, public_key, type, role, priority) => {
    return apiInstance.post("contact/", {
        name: name, //*
        username: username, //*
        public_key: public_key, 
        type: type, 
        role: role, 
        priority: priority //*
    });
}

const putContact = (id, name, username, public_key, type, role, priority) => {
    return apiInstance.put("contact/"+id+"/", {
        name: name, 
        username: username, 
        public_key: public_key, 
        type: type, 
        role: role, 
        priority: priority
    });
}

const deleteContact = (id) => {
    return apiInstance.delete("contact/"+id+"/");
}

export { getContacts, getContact, postContact, putContact, deleteContact };
