import Cookies from 'js-cookie';

import apiInstance from './api';
import { refreshToken } from './services/auth';
import { REFRESH_TOKEN, LOGOUT, SET_MESSAGE } from '../store/actions';

const setup = (store) => {

    const { dispatch } = store;

    apiInstance.interceptors.request.use((request) => {
   
        const cookies = Cookies.get();
        request.headers.common['X-CSRFTOKEN'] = cookies.csrftoken;

        const state = store.getState();
        const token = state.account.token;

        if (token) {
            request.headers.Authorization = `${token}`;
        }

        return request;

    });
    
    apiInstance.interceptors.response.use((response) => {

        return response;
        },(error) => {
    
            const originalConfig = error.config;
    
            // falta redefinir status esperado en caso de que falle el access token
            if (error.response.status === 555 && !originalConfig._retry) {
                originalConfig._retry = true;   
    
                refreshToken()
                    .then((res) => {
                        const accessToken = res.data.access;

                        dispatch({
                            type: REFRESH_TOKEN,
                            payload: { token: accessToken }
                        });

                        return apiInstance(originalConfig);
                       
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
