import { validateSpace, validateCidr, validateURL, validateSpaces, isEmpty, validateLength } from '../../../utils/validators'; 

const validateSelect = (option) =>{
    return (!isEmpty(option))
}

const validateNetworkCIDR = (cidr) =>{
    return (validateCidr(cidr) && validateSpace(cidr))
}

const validateNetworkDomain = (domain) =>{
    return (validateURL(domain) && validateSpaces(domain) && validateLength(domain, 100) && !isEmpty(domain))
}

export {validateSelect, validateNetworkCIDR, validateNetworkDomain}