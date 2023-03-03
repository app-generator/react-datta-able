import  apiInstance  from "../api";
import { COMPONENT_URL, PAGE } from '../../config/constant';

const getTaxonomy = (currentPage) => {
    return apiInstance.get(COMPONENT_URL.taxonomy + PAGE + currentPage);
}

export { getTaxonomy }