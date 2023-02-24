import axios from 'axios';
import { API_SERVER } from '../config/constant';




const apiInstance = axios.create({
    baseURL: "",
    withCredentials: true
});

apiInstance.interceptors.request.use((request) => {
    request.headers.Cookie = 'csrftoken=1UqjIIfzpAPEV8Zg0BCW6ZNJOTQN1MhC3j6PNVPWxHU4tgsPCJiRbg12qaMiZWLR; sessionid=nc2z6mqzu7bvdgp71t9ijy3p1wy53tbt';
    request.headers.common['X-CSRFTOKEN'] = '1UqjIIfzpAPEV8Zg0BCW6ZNJOTQN1MhC3j6PNVPWxHU4tgsPCJiRbg12qaMiZWLR';
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