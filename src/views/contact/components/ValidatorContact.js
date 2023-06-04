import { validateAlphanumeric, validateSpace, validateLength, validateEmail,validateNumbers, validateURL, isEmpty } from "../../../utils/validators"

const validateName = (name) =>{
    return (validateAlphanumeric(name) && validateLength(name, 100) && validateSpace(name))
}

const validateSelect = (option) =>{
    return (!isEmpty(option))
}

const validateContact = (contact) =>{
    return (validateSpace(contact))
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