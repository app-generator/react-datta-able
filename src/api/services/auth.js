import apiInstance from "../api";
import { COMPONENT_URL } from '../../config/constant';
import setAlert from '../../utils/setAlert';


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
    return apiInstance.post(COMPONENT_URL.refreshCookieToken, {}); 
}

const logout = () => {
    return apiInstance.post(COMPONENT_URL.logout)
        .catch( error => { 
            setAlert("No se pudo realizar el logout", "error");
            return Promise.reject(error);
        });
}

export { register, login, refreshToken, logout };
