import { validateAlphanumeric, validateSpace, validateLength, validateEmail,validateNumbers, validateURL, isEmpty } from "../validators"

const validateName = (name) =>{
    //return (validateAlphanumeric(name) && validateLength(name, 100) && validateSpace(name))// tengo que ver la funcion de este metodo validateSpace(name)
    return (validateAlphanumeric(name) && validateLength(name, 100) )
}

const validateSelect = (option) =>{
    return (!isEmpty(option))
}

const validateContact = (contact) =>{
    return (validateSpace(contact))// no entinedo porque un selec
}

const validateContactMail = (contactMail) =>{
    return (validateSpace(contactMail) && validateEmail(contactMail))
}

const validateContactPhone = (contactPhone) =>{
    return (validateSpace(contactPhone) && validateNumbers(contactPhone))
}

const validateContactURI = (contactURI) =>{
    return (validateSpace(contactURI) && validateURL(contactURI))
}

const validateContactTelegram = (contactTelegram) =>{
    return (validateSpace(contactTelegram) && validateAlphanumeric(contactTelegram))
}


export {validateName, validateSelect, validateContact,validateContactMail, validateContactPhone, validateContactURI, validateContactTelegram}