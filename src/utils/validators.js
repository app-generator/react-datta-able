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
const validateHours = (hours) => {
  return (/^(0?[0-9]|1[0-9]|2[0-3])$/).test(hours)
}
const validateMinutes = (minutes) => {
  return (/^(0?[0-9]|[1-5][0-9])$/).test(minutes)
}

const validateNumber = (number) => {
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
  const regex = /^[0-9]{1,5}$/;
  return regex.test(autonomousSystem);
}

const validateUserAgent=(userAgent) =>{
  var patron = /^[a-zA-Z0-9\-.\(\)\/_\s]+$/;
  return patron.test(userAgent);
}

const validateFQDN=(fqdn)=> {
  // Expresión regular para validar el FQDN
  var fqdnRegex = /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)+[A-Za-z]{2,6}$/;
  
  return fqdnRegex.test(fqdn);
}
export {validateHours, validateMinutes,validateEmail, validateFieldText, validateUsername, validateSpaces, 
        validateNumber, validateAlphanumeric, validateNumbers, validateSpace, validateURL, validateCidr, 
        validateLength, isEmpty, validateIP, validateAutonomousSystem, validateUserAgent, validateFQDN};

