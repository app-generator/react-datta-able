import { validateFormatText, validateLengthText, isEmpty } from "./ValidatorInput"

const validateName = (name) =>{
    return (validateFormatText(name) && validateLengthText(name, 100) && !isEmpty(name))
}


const validateDescription = (description) =>{
    return (validateLengthText(description, 250) && !isEmpty(description))
}

export {validateName, validateDescription}