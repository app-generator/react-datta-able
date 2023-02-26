import axios from 'axios';
import { API_SERVER } from '../config/constant';

const apiInstance = axios.create({
    baseURL: "http://localhost:8000/api/",
    withCredentials: true
});

apiInstance.interceptors.request.use((request) => {
    request.headers.Cookie = 'csrftoken=QJAmyTfG6G3YlIkS3mwft8fhlvRhE3Z5GO1zHdYrTjQ31VsDqDxP0Y3wdat8azyx; sessionid=l6vhmyw2lg0klcx60l4358z2jolcuhrb';
    request.headers.common['X-CSRFTOKEN'] = 'QJAmyTfG6G3YlIkS3mwft8fhlvRhE3Z5GO1zHdYrTjQ31VsDqDxP0Y3wdat8azyx';
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