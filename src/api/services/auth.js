import apiInstance from "../api";

const registerUser = (username, password, email) => {
    return apiInstance.post("register/", {
        username: username,  
        password: password, 
        email: email, 
        is_active: true
    });
}

const getJWT = (username, password) => {
    return apiInstance.post("token/", {
        username: username,  
        password: password, 
    });
}

const login = (email, password) => {
    return apiInstance.post("login/", {
        email: email,  
        password: password, 
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

export { registerUser, getJWT, login, refreshToken, logout };
