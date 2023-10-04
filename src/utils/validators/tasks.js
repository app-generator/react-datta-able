import { validateAlphanumeric, validateLength, isBlank, isNull } from '../validators'; 

const validateUnrequiredInput = (input) =>{
    return (!(isNull(input) || isBlank(input)))
}
const validateTaskName = (name) =>{
    return (validateAlphanumeric(name) && validateLength(name, 25) )
}
const validateTaskDescription = (description) =>{
    return (validateAlphanumeric(description) && validateLength(description, 200) )
}



export { validateTaskDescription, validateTaskName, validateUnrequiredInput}