import axios from 'axios';




const apiInstance = axios.create({
    baseURL: "",
    withCredentials: true
});

apiInstance.interceptors.request.use((request) => {
    request.headers.Cookie = '';
    request.headers.common['X-CSRFTOKEN'] = '';
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