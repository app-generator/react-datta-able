import Cookies from 'js-cookie';

import apiInstance from './api';
import { refreshToken } from './services/auth';
import { REFRESH_TOKEN, LOGOUT } from '../store/actions';

const setup = (store) => {

    const { dispatch } = store;

    apiInstance.interceptors.request.use((request) => {
        //request.headers.Cookie = '';
        //request.headers.common['X-CSRFTOKEN'] = '';

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
    
            if (error.response.status === 403 && !originalConfig._retry) {
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
