import  apiInstance  from "../api";
import { COMPONENT_URL, PAGE } from '../../config/constant';

const getFeeds = (currentPage) => {
    return apiInstance.get(COMPONENT_URL.feed + PAGE + currentPage);
}

const postFeed = (slug, name, description, active) => {
    return apiInstance.post(COMPONENT_URL.feed, {
        slug: slug, 
        name: name, 
        description: description,
        active: active
    });
}


const putFeed = (url, slug, name, description, active) => {
    return apiInstance.put(url, {
        slug: slug, 
        name: name, 
        description: description,
        active: active
    });
}


const putActivationStatus= (url, state) => {
    return apiInstance.patch(url, {
        active: state
    });
}


const deleteFeed = (url) => {
    return apiInstance.delete(url);
}

export { getFeeds, postFeed, putFeed, putActivationStatus, deleteFeed };