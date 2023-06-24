import { validateFieldText, validateLength, isEmpty, isBlank } from '../validators'

const validateName = (name) =>{
    return (validateFieldText(name) && validateLength(name, 100) && !isEmpty(name))
}

const validateDescription = (description) =>{
    return (validateLength(description, 250) && !isEmpty(description))
}

const validateType = (type) =>{
    return (!isEmpty(type))
}

const validateUnrequiredInput = (input) =>{
    return (!isBlank(input))
}

export {validateName, validateDescription, validateType, validateUnrequiredInput}