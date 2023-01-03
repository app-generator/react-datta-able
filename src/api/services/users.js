import { apiInstance } from "../custom";

const getUsers = () => {
    return apiInstance.get("user");
}

const getUser = (id) => { 
    return apiInstance.get("user/"+id);
}

const postUser = (username, first_name, last_name, email, priority, is_active) => {
    return apiInstance.post("user/", JSON.stringify({
        username: username, 
        first_name: first_name, 
        last_name: last_name, 
        email: email, 
        priority: priority,
        is_active: is_active
    }));
}

export { getUsers, getUser, postUser };
