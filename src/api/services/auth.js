import apiInstance from "../api";
import { COMPONENT_URL } from '../../config/constant';
import setAlert from '../../utils/setAlert';
import { REFRESH_TOKEN, LOGOUT, CLEAR_MESSAGE } from '../../store/actions';
import { store } from '../../store';


const register = (username, password, email) => {
    return apiInstance.post(COMPONENT_URL.register, {
        username: username,  
        password: password, 
        email: email, 
        is_active: true
    }).then(response => {
        setAlert("Registración exitosa", "success");
        return response;
    }).catch( error => { 
        setAlert("No se pudo registrar al usuario", "error");
        return Promise.reject(error);
    });
}

const login = (username, password) => {
    return apiInstance.post(COMPONENT_URL.login, {
        username: username,
        password: password, 
    }).catch( error => { 
        if (error.response.data.detail === "La combinación de credenciales no tiene una cuenta activa") {
            setAlert("Las credenciales de acceso son inválidas", "error");
        }  else {
            setAlert("No se pudo realizar el login", "error");
        }
        return Promise.reject(error);
    });
}

const refreshToken = () => {
    return apiInstance.post(COMPONENT_URL.refreshCookieToken, {
    }).then(response => {

            console.log(response);
            const { dispatch } = store;

            try {
                dispatch({
                 type: REFRESH_TOKEN,
                 payload: { token: response.data.access }
                });

                return response;
            } catch(e){
                console.log('Error en el dispatch')
            }
            
    }).catch( error => { 

        const { dispatch } = store;

        try {
            dispatch({
                type: LOGOUT
            });
            dispatch({
                type: CLEAR_MESSAGE
            });
        } catch(e){
            console.log('Error en el dispatch')
        }

        console.log("ERROR en el refresh desde auth");

        return Promise.reject(error);
    }); 
}

const logout = () => {
    return apiInstance.post(COMPONENT_URL.logout)
        .catch( error => { 
            return Promise.reject(error);
        });
}

export { register, login, refreshToken, logout };
