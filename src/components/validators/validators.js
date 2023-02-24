
const validateEmail = (email) => {
    return  (/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email);
}


const validateFieldText = (text) =>{
    return (/^[A-Za-zÁÉÍÓÚáéíóúñÑ' ]+$/g).test(text)
}

const validateUsername = (text) =>{
    return (/^[A-Za-z0-9@.+_' ]+$/g).test(text)
}


const  validateSpaces= (text) => {
  return ( !(/ /).test(text))
}

const validateTime = (time) => {
  return (/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/g).test(time)
}

const validateNumber = (number) => {
  return (/^[0-9]+$/g).test(number)
}


export {validateEmail, validateFieldText, validateUsername, validateSpaces, validateNumber};