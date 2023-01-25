import axios from 'axios';




const apiInstance = axios.create({
    baseURL: "",
    withCredentials: true
});

apiInstance.interceptors.request.use((request) => {
    request.headers.Cookie = ' csrftoken=6LLfG40hhTZDWp1hzjFeTrR3eZR8MRn9ieGE3gM5pTsBFHnkjIgFsq2g7slAegxM; sessionid=kycgqf46tnfl76d0vivf3wvq5q0guxkt';
    request.headers.common['X-CSRFTOKEN'] = '6LLfG40hhTZDWp1hzjFeTrR3eZR8MRn9ieGE3gM5pTsBFHnkjIgFsq2g7slAegxM';
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