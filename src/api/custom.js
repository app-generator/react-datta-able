import axios from 'axios';

import { API_SERVER } from '../config/constant';

const apiInstance = axios.create({
    baseURL: API_SERVER,
    withCredentials: true
});

apiInstance.interceptors.request.use((request) => {
    request.headers.Cookie = 'csrftoken=EjUu7wEDJlcuH1xCMLHMLqzZUHoG9Yt4hcuGdodOmpEftZcNcmxnRVabCG6D0q1G; sessionid=l7pcawn8ikhrv6jitk7xrlqdbs0ml7pd';
    request.headers.common['X-CSRFTOKEN'] = 'EjUu7wEDJlcuH1xCMLHMLqzZUHoG9Yt4hcuGdodOmpEftZcNcmxnRVabCG6D0q1G';
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