import axios from 'axios';

import { API_SERVER } from '../config/constant';

const apiInstance = axios.create({
    baseURL: API_SERVER,
    withCredentials: true
});

apiInstance.interceptors.request.use((request) => {
    request.headers.Cookie = 'csrftoken=kOx7OwT23E6EhurCWcc5lQBqou7DEL2tJWKA6NYmX7OezecBqB1wIsUyVQRweFmG; sessionid=6uzabdc1p7e4ql2w2olzkzg6fuzmjkty';
    request.headers.common['X-CSRFTOKEN'] = 'kOx7OwT23E6EhurCWcc5lQBqou7DEL2tJWKA6NYmX7OezecBqB1wIsUyVQRweFmG';
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