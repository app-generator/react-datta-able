import { apiInstance } from "../custom";
import { API_SERVER,COMPONENT_URL } from '../../config/constant';

const getUsers = () => {
    
    return apiInstance.get(COMPONENT_URL.user);
}

const getUser = (url) => { 
    return apiInstance.get(url);
}

const postUser = (username, first_name, last_name, email, priority, is_active) => {
    console.log(username)
    console.log(first_name)
    return apiInstance.post(API_SERVER + "user/", {
        username: username, 
        first_name: first_name, 
        last_name: last_name, 
        email: email, 
        priority: priority,
        is_active: is_active
    });
}

const putUser = (url, username, first_name, last_name, email, priority, is_active) => {
    return apiInstance.put(url, {
        username: username, 
        first_name: first_name, 
        last_name: last_name, 
        email: email, 
        priority: priority,
        is_active: is_active
    });
}

const isActive = (url, active) => {
    return apiInstance.patch(url, {
        is_active: active
    } );
}

const deleteUser = (url) => {
    return apiInstance.delete(url);
}

export { getUsers, getUser, postUser, putUser, deleteUser, isActive };
