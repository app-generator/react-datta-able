import { validateEmail,validateFieldText,validateUsername, validateLength, isEmpty, isBlank} from '../validators';

const validateUserName = (name) =>{
    return (validateUsername(name) && validateLength(name, 150) )
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

const validatePassword = (password, passwordConfirmation) =>{
    return (!isBlank(password) && (password === passwordConfirmation))
}

const validateUnrequiredInput = (input) =>{
    return (!isBlank(input))
}

export {validateUserName, validateName, validateUserMail, validateSelect, validatePassword, validateUnrequiredInput}