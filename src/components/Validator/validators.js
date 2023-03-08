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
const validateSpace= (text) => {
  return (text.trim() != 0)
}

const validateLength = (text, maxlength) =>{
  return (text.length <= maxlength)
}

const isEmpty = (text) =>{
  return (text.trim().length === 0)
}

const validateAlphanumeric = (text) =>{
  return (/^[A-Za-zÁÉÍÓÚáéíóúñÑ'0-9 ]+$/g).test(text)
}

const validateNumbers = (text) =>{
  return (/^[0-9]+$/g).test(text)
}

const validateURL = (str) => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

const validateTime = (time) => {
  return (/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/g).test(time)
}

const validateNumber = (number) => {
  return (/^[0-9]+$/g).test(number)
}

export {validateEmail, validateFieldText, validateUsername, validateSpaces, validateSpace, validateLength, isEmpty, validateNumber, validateAlphanumeric, validateNumbers, validateURL};