const validateEmail = (email) => {
    return  (/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email);
}

const validateFieldText = (text) =>{
    if (text === ""){
      return true
    }
    return (/^[A-Za-zÁÉÍÓÚáéíóúñÑ' ]+$/g).test(text)
}

const validateUsername = (text) =>{
    if (text === ""){
      return true
    }
    return (/^[a-zA-Z0-9@.+_\-]+$/).test(text)
}

const  validateSpaces= (text) => {
  return ( !(/ /).test(text))

}
const validateSpace= (text) => {
  
  return (text.trim() !== "")
}

const validateLength = (text, maxlength) =>{
  return (text.length <= maxlength)
}

const isEmpty = (text) =>{
  return (text.trim().length === 0)
}

const isBlank = (text) =>{
  return (text === '')
}

const isNull = (text) =>{
  return (text == undefined)
}

const validateAlphanumeric = (text) =>{
  if (text === ""){
      return true
  }
  return (/^[A-Za-zÁÉÍÓÚáéíóúñÑ'0-9 ]+$/g).test(text)
}

const validateNumbers = (text) =>{
  if (text === ""){
    return true
  }
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
const validateHours = (hours) => {
  return (/^(0?[0-9]|1[0-9]|2[0-3])$/).test(hours)
}
const validateMinutes = (minutes) => {
  return (/^(0?[0-9]|[1-5][0-9])$/).test(minutes)
}

const validateNumber = (number) => {
  if (number === ""){
    return true
  }
  return (/^[0-9]+$/g).test(number)
}

const validateCidr = (address) => {
  var ipCidr = require("ip-cidr");
  var cidr = null; 

  try {
      cidr = new ipCidr(address);  
      if(cidr != null) {
          const start = cidr.start()
          return cidr.address.addressMinusSuffix == start
      }
  } catch (error) {
      return false;
  }
}

const validateIP =(ip)=> {
  const patronIP = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  if (!patronIP.test(ip)) {
    return false; // No coincide con el formato xxx.xxx.xxx.xxx
  }
  
  const octetos = ip.split('.');
  for (let i = 0; i < octetos.length; i++) {
    const octeto = parseInt(octetos[i], 10);
    if (octeto < 0 || octeto > 255) {
      return false; // Cada octeto debe estar entre 0 y 255
    }
  }
  
  return true; // La IP es válida
}

const validateAutonomousSystem = (autonomousSystem) =>{
  var min = 0;
  var max = 4294967295;

  return (autonomousSystem > min && autonomousSystem <= max)
}

const validateUserAgent=(userAgent) =>{
  console.log(userAgent)
  return (/^[a-zA-Z0-9\s\.,\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]*$/).test(userAgent);
}


const validateDomain=(dominio)=> {
  // Expresión regular para verificar la sintaxis del dominio
  var patron = /^[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
  // Verificar si el dominio coincide con el patrón
  return patron.test(dominio)
}
const validateHexadecimal32=(valueHexadecimal)=> {
  // Verificar la longitud de la cadena
  if (valueHexadecimal.length !== 32) {
    return false;
  }
  // Verificar si la cadena es hexadecimal
  return (/^[0-9a-fA-F]+$/).test(valueHexadecimal);
}

const validateHexadecimal40=(valueHexadecimal)=> {
  // Verificar la longitud de la cadena
  if (valueHexadecimal.length !== 40) {
    return false;
  }
  // Verificar si la cadena es hexadecimal
  return (/^[0-9a-fA-F]+$/).test(valueHexadecimal);
}

const validateHexadecimal64=(valueHexadecimal)=> {
  // Verificar la longitud de la cadena
  if (valueHexadecimal.length !== 64) {
    return false;
  }
  // Verificar si la cadena es hexadecimal
  return (/^[0-9a-fA-F]+$/).test(valueHexadecimal);
}

const validateHexadecimal128=(valueHexadecimal)=> {
  // Verificar la longitud de la cadena
  if (valueHexadecimal.length !== 128) {
    return false;
  }
  // Verificar si la cadena es hexadecimal
  return (/^[0-9a-fA-F]+$/).test(valueHexadecimal);
}

export {validateHours, validateMinutes,validateEmail, validateFieldText, validateUsername, validateSpaces, 
        validateNumber, validateAlphanumeric, validateNumbers, validateSpace, validateURL, validateCidr, 
        validateLength, isEmpty, isBlank, isNull, validateIP, validateAutonomousSystem, validateUserAgent, 
        validateDomain, validateHexadecimal32, validateHexadecimal40, validateHexadecimal64, validateHexadecimal128};

