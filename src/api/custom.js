import axios from 'axios';

const apiInstance = axios.create({
    baseURL: "http://localhost:8000/api/",
    withCredentials: true
});

apiInstance.interceptors.request.use((request) => {
    request.headers.Cookie = 'csrftoken=EQAnUxAeTQ1uDSkimUXY16SoFg5QvR30jj2vj7eN7sVhfOODa4G0qOYhLWTiVy5H; sessionid=a6ou88oz4x2lw64vlvx11om9o3trzmb8';
    request.headers.common['X-CSRFTOKEN'] = 'EQAnUxAeTQ1uDSkimUXY16SoFg5QvR30jj2vj7eN7sVhfOODa4G0qOYhLWTiVy5H';
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