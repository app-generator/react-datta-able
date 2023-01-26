import axios from 'axios';




const apiInstance = axios.create({
    baseURL: "",
    withCredentials: true
});

apiInstance.interceptors.request.use((request) => {
    request.headers.Cookie = 'csrftoken=UNVaCJyxn4n1ABxSRc095BoeyxUHNap8r9Zn2NqcMIY6AjVTA6Dp6MsZ1ePyXHuE; sessionid=eku6hdm5jbvwudc9hhovdmkmi1civ155';
    request.headers.common['X-CSRFTOKEN'] = 'UNVaCJyxn4n1ABxSRc095BoeyxUHNap8r9Zn2NqcMIY6AjVTA6Dp6MsZ1ePyXHuE';
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