import { useDispatch } from 'react-redux';

import apiInstance from './api';
import { refreshToken } from './services/auth';
import { REFRESH_TOKEN, LOGOUT } from '../store/actions';


const setup = (store) => {

    const { dispatch } = store;

    apiInstance.interceptors.request.use((request) => {
        request.headers.Cookie = 'csrftoken=PiwFJyJ0A3fTtcK1mXXC8ybzeZTqHrj5UaVXPTiXyKEPzmiUluX6iHAcyWQMwqU9; sessionid=jjb434m059eiw9pxfdvrdcb1njxdlvdv; tabstyle=raw-tab';
        request.headers.common['X-CSRFTOKEN'] = 'PiwFJyJ0A3fTtcK1mXXC8ybzeZTqHrj5UaVXPTiXyKEPzmiUluX6iHAcyWQMwqU9';
    
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
                        const accessToken = res.data.access+"nuevoAT";

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
