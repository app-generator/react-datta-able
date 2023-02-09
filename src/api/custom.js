import axios from 'axios';
import { API_SERVER } from '../config/constant';




const apiInstance = axios.create({
    baseURL: "",
    withCredentials: true
});

apiInstance.interceptors.request.use((request) => {
    request.headers.Cookie = 'csrftoken=wpGgnNXqfX1xagfahNjoLRNo7JSpibiwmpx72bnZeWnsbcOrcaoJ5rSMPiibPxfA; sessionid=zuwkmnjfzgzk3305xavnt95gjxrp8mtp';
    request.headers.common['X-CSRFTOKEN'] = 'wpGgnNXqfX1xagfahNjoLRNo7JSpibiwmpx72bnZeWnsbcOrcaoJ5rSMPiibPxfA';
    return request;
});

apiInstance.interceptors.response.use((response) => {
    return response;
    },(error) => {
        console.log(error.toJSON());
        console.log(error.message);
        return Promise.reject(error);
    }
);

export { apiInstance };