
import  apiInstance  from "../api";
import setAlert from '../../utils/setAlert';

const getFiles = (url) => {
    return apiInstance.get(url);
}

export {getFiles}