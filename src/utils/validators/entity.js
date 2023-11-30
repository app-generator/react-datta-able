import { validateAlphanumeric, validateLength, validateSpace } from "../validators"

const validateName = (name) =>{
    //return (validateAlphanumeric(name) && validateLength(name, 100) && validateSpace(name)) no me queda en claro para que esta el validatespace
    return (validateAlphanumeric(name) && validateLength(name, 100))
}

export {validateName}