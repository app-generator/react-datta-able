import axios from 'axios';

import { API_SERVER } from '../config/constant';

const apiInstance = axios.create({
    baseURL: API_SERVER,
    withCredentials: true
});

apiInstance.interceptors.request.use((request) => {
    request.headers.Cookie = 'csrftoken=AQKFXFy20OyM5wkriFZunrTlDrELV0I6qgBwKpwlCxPVhFWdfhA10rp93uXUP2tY; sessionid=rt35276qk1g69u5sqhmvu3ebevb1xvsw';
    request.headers.common['X-CSRFTOKEN'] = 'AQKFXFy20OyM5wkriFZunrTlDrELV0I6qgBwKpwlCxPVhFWdfhA10rp93uXUP2tY';
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