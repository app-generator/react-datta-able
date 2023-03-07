import apiInstance from "../api";
import { COMPONENT_URL } from '../../config/constant';
import setAlert from '../../utils/setAlert';


const register = (username, password, email) => {
    return apiInstance.post("https://cualquier"+COMPONENT_URL.register, {
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

const getJWT = (username, password) => {
    return apiInstance.post("token/", {
        username: username,  
        password: password, 
    });
}

const login = (username, password) => {
    return apiInstance.post(COMPONENT_URL.login, {
        username: username,
        password: password, 
    }).then(response => {
        return response;
    }).catch( error => { 
        if (error.response.data.msg === "Wrong credentials") {
            setAlert("Las credenciales de acceso son inválidas", "error");
        }  else {
            setAlert("No se pudo realizar el login", "error");
        }
        return Promise.reject(error);
    });
}

const refreshToken = () => {
    // falta el refresh token en el backend
    console.log("Ejecutó refresh token")
    return apiInstance.post("token/", {
        username: 'ngen',  
        password: 'ngen', 
    });
}

const logout = (user) => {
    console.log("usuario recibido "+user);
    return apiInstance.post("logout/", {
        user: user
    });
}

export { register, getJWT, login, refreshToken, logout };
