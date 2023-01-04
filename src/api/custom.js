import axios from 'axios';

import { API_SERVER } from '../config/constant';

const apiInstance = axios.create({
    baseURL: API_SERVER,
    withCredentials: true
});

apiInstance.interceptors.request.use((request) => {
    request.headers.Cookie = 'csrftoken=pekvqPoruPo9bhr7QmQaz8HmJRQADDaAd5SRKhRufXNNurx4JiDLpsFw5kAsk4rT; sessionid=tdsj4cz10gvpqlznbj5da7frkijau7rz';
    request.headers.common['X-CSRFTOKEN'] = 'pekvqPoruPo9bhr7QmQaz8HmJRQADDaAd5SRKhRufXNNurx4JiDLpsFw5kAsk4rT';
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