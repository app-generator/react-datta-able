import { apiInstance } from "../custom";

const getUsers = () => {
    //return apiInstance.get("/users");
    return apiInstance.get("user");

}

export default getUsers;