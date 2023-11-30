import { validateFieldText, validateLength, isEmpty, isBlank } from "../validators"

const validateName = (name) =>{
    return (validateFieldText(name) && validateLength(name, 100) )
}

const validateDescription = (description) =>{
    return (validateLength(description, 250) && !isEmpty(description))
}

const validateUnrequiredInput = (input) =>{
    return (!isBlank(input))
}

export {validateName, validateDescription, validateUnrequiredInput}