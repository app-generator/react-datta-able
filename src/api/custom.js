import axios from 'axios';

import { API_SERVER } from '../config/constant';

const apiInstance = axios.create({
    baseURL:'http://localhost:8000/api',
   //baseURL: "https://jsonplaceholder.typicode.com",
   withCredentials: true
});

apiInstance.interceptors.request.use((request) => {
    request.headers.Authorization = 'Bearer token';
  // request.headers.Accept = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9';
  //  request.headers.Cookie = '';
    return request;
});

apiInstance.interceptors.response.use((response) => {
    return response;
    },(error) => {
        console.log(error.response.status);
        return Promise.reject(error);
    }
);

export { apiInstance };