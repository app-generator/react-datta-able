import { validateAlphanumeric, validateLength, isBlank, isNull } from '../validators'; 

const validateUnrequiredInput = (input) =>{
    return (!(isNull(input) || isBlank(input)))
}
const validatePlaybookName = (name) =>{
    return (validateAlphanumeric(name) && validateLength(name, 25) )
}


export { validatePlaybookName, validateUnrequiredInput}