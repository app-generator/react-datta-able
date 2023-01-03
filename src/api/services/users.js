import { apiInstance } from "../custom";

const getUsers = () => {
    return apiInstance.get("user");
}

const getUser = (id) => { 
    return apiInstance.get("user/"+id+"/");
}

const postUser = (username, first_name, last_name, email, priority, is_active) => {
    return apiInstance.post("user/", {
        username: username, 
        first_name: first_name, 
        last_name: last_name, 
        email: email, 
        priority: priority,
        is_active: is_active
    });
}

const putUser = (id, username, first_name, last_name, email, priority, is_active) => {
    return apiInstance.put("user/"+id+"/", {
        username: username, 
        first_name: first_name, 
        last_name: last_name, 
        email: email, 
        priority: priority,
        is_active: is_active
    });
}

const isActive = (id, active) => {
    return apiInstance.patch("user/"+id+"/", {
        is_active: active
    } );
}

const deleteUser = (id) => {
    return apiInstance.delete("user/"+id+"/");
}

export { getUsers, getUser, postUser, putUser, deleteUser, isActive };
