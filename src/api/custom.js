import axios from 'axios';




const apiInstance = axios.create({
    baseURL: "",
    withCredentials: true
});

apiInstance.interceptors.request.use((request) => {
    request.headers.Cookie = 'csrftoken=Fm3m0SUrkuuO2NX6FnrnzoJe7yZDhObNERllclT5SpgUL36ztC9j81J3pliUJqKT; sessionid=c6kjia4t0p0120k0o1spwrlq9q80dcci';
    request.headers.common['X-CSRFTOKEN'] = 'Fm3m0SUrkuuO2NX6FnrnzoJe7yZDhObNERllclT5SpgUL36ztC9j81J3pliUJqKT';
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