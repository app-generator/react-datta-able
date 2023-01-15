import axios from 'axios';

import { API_SERVER } from '../config/constant';

const apiInstance = axios.create({
    baseURL: API_SERVER,
    withCredentials: true
});

apiInstance.interceptors.request.use((request) => {
    request.headers.Cookie = 'csrftoken=Ia74qbWRShvcPTr9xtdwbnOyVupltxjNjQmfvQrxyykt8xH8reCQD6VseZvJEyG5; sessionid=4p7fq3pw169b5do6cxw8bwdum5qq5t5j';
    request.headers.common['X-CSRFTOKEN'] = 'Ia74qbWRShvcPTr9xtdwbnOyVupltxjNjQmfvQrxyykt8xH8reCQD6VseZvJEyG5';
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