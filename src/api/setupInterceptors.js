import Cookies from 'js-cookie';

import apiInstance from './api';
import { refreshToken } from './services/auth';
import { REFRESH_TOKEN, LOGOUT } from '../store/actions';

import setAlert from '../utils/setAlert';

const setup = (store) => {

    const { dispatch } = store;

    apiInstance.interceptors.request.use((request) => {
   
        const cookies = Cookies.get();
        request.headers.common['X-CSRFTOKEN'] = cookies.csrftoken;

        const state = store.getState();
        const token = state.account.token;

        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }

        return request;

    });

    apiInstance.interceptors.response.use((response) => {
     
        return response;
        },(error) => {
            
            // Generic error: Connection to server failed
            if (!error.response) {
    
                setAlert("Falló la conexión al servidor","error");
    
            } 
            /*
            else {
    
                console.log(JSON.stringify(error.config.url));
                console.log(JSON.stringify(error.config.method));
                console.log(JSON.stringify(error.config.data));
                console.log(JSON.stringify(error.response.status));
                console.log(JSON.stringify(error.response.data.msg));
    
            }      
            */
    
            return Promise.reject(error);
        }
    );
    
    apiInstance.interceptors.response.use((response) => {
        return response;
        },(error) => {

            const originalConfig = error.config;

            // verificar error.response.code
            if (error.response.code === 'token_not_valid' && !originalConfig._retry) {

                originalConfig._retry = true;   

                refreshToken()
                    .then((res) => {

                        const accessToken = res.data.access;

                        dispatch({
                            type: REFRESH_TOKEN,
                            payload: { token: accessToken }
                        });

                        return apiInstance(originalConfig)
                                    .catch(error => {
                                        if (error.response.code === 'token_not_valid') {
                                            dispatch({
                                                type: LOGOUT
                                            });
                                        }
                                    });
                       
                    })
                    .catch((err) => {

                        dispatch({
                            type: LOGOUT
                        });

                    });
            }

            return Promise.reject(error);
        }
    );

};


export default setup;
