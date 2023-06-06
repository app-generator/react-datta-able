import { validateEmail,validateFieldText,validateUsername, validateLength, isEmpty} from '../validators';


const validateUserName = (name) =>{
    return (validateUsername(name) && validateLength(name, 150) && !isEmpty(name))
}

const validateName = (name) =>{
    return (validateFieldText(name) && validateLength(name, 150) && !isEmpty(name))
}

const validateUserMail = (mail) =>{
    return (validateEmail(mail) && validateLength(mail, 100) && !isEmpty(mail))
}

const validateSelect = (option) =>{
    return (!isEmpty(option))
}

export {validateUserName, validateName, validateUserMail, validateSelect}