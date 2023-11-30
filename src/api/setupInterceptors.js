import apiInstance from './api';
import { refreshToken } from './services/auth';
import setAlert from '../utils/setAlert';

const setup = (store) => {

    apiInstance.interceptors.request.use((request) => {
   
        const state = store.getState();
        const token = state.account.token;

        if(request.url.includes("refresh")) {
            delete apiInstance.defaults.headers.common["Authorization"];
        } else if (token){
            // request.headers.Authorization = `Bearer ${token}`;
            apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        return request;

    });

    apiInstance.interceptors.response.use((response) => {
     
        return response;
        },(error) => {
            
            // Generic error: Connection to server failed
            if (!error.response) {
    
                setAlert("Falló la conexión al servidor","error");
                console.log("Falló la conexión al servidor");
    
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

            const originalConfig = error.config;

            if (error.response.data.code === 'token_not_valid' && !originalConfig._retry && !((JSON.stringify(error.config.url)).includes("refresh"))){
              
                originalConfig._retry = true;

                refreshToken()
                    .then((res) => { 
 
                        const state = store.getState();
                        const token = state.account.token;
                        
                        originalConfig.headers.Authorization = `Bearer ${token}`;

                        return apiInstance(originalConfig);

                    }).catch((err) => { 
                        console.log("catch: el refresh dio error");
                        return Promise.reject(err);
                    });
            } else {
                
                // Cuando falla el refresh, el error entra por acá, luego por auth.js y luego por el catch del refresh (del setupinterceptor.js)
                console.log("Error en el setupinterceptor");
                return Promise.reject(error);
            }
    

        }
    );

};


export default setup;
