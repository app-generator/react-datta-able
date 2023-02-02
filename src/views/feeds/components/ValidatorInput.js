const validateFormatText = (text) =>{
    return (/^[A-Za-zÁÉÍÓÚáéíóúñÑ' ]+$/g).test(text)
}

const validateLengthText = (text, maxlength) =>{
    return (text.length <= maxlength)
}

const isEmpty = (text) =>{
    return (text === '')
}

export{validateFormatText, validateLengthText, isEmpty}