import apiInstance from "../api";
import setAlert from '../../utils/setAlert';
import { COMPONENT_URL } from '../../config/constant';

const getTaxonomy = (url) => { 
    return apiInstance.get(url);
}

const getAllTaxonomies = (url=COMPONENT_URL.taxonomy) => {
    return apiInstance.get(url);
}

export { getTaxonomy, getAllTaxonomies };
