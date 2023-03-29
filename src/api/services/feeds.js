import  apiInstance  from "../api";
import { COMPONENT_URL, PAGE } from '../../config/constant';

const getFeeds = (currentPage) => {
    return apiInstance.get(COMPONENT_URL.feed + PAGE + currentPage);
}

const getAllFeeds = (currentPage = 1, results = [], limit = 100) => {
            
    return apiInstance.get(COMPONENT_URL.feed, { params: { page: currentPage, page_size: limit } })       
        .then((response) => {
            let res = [...results, ...response.data.results]                                    
            if(response.data.next != undefined){                                
                return getAllFeeds(++currentPage, res, limit)
            }
            else{
                return res;     
            }                  
        })
        .catch((error) => {
            return Promise.reject(error);            
        })   

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
const getFeed = (url) => {
    return apiInstance.get(url);
}

export { getFeeds, getAllFeeds, postFeed, putFeed, putActivationStatus, deleteFeed, getFeed };