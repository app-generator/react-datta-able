
const validateEmail = (email) => {
    return  (/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email);
}


const validateFieldText = (text) =>{
    return (/^[A-Za-zÁÉÍÓÚáéíóúñÑ' ]+$/g).test(text)
}

const validateAlphanumeric = (text) =>{
    return (/^[A-Za-zÁÉÍÓÚáéíóúñÑ'0-9 ]+$/g).test(text)
}

export {validateEmail, validateFieldText, validateAlphanumeric};