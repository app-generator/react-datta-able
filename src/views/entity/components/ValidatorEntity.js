import { validateAlphanumeric, validateLength, validateSpace } from "../../../utils/validators"

const validateName = (name) =>{
    return (validateAlphanumeric(name) && validateLength(name, 100) && validateSpace(name))
}

export {validateName}