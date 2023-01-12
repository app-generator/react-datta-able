import { apiInstance } from "../custom";

const getFeeds = () => {
    return apiInstance.get("administration/feed/");
}

const deleteFeed = (id) => {
    return apiInstance.delete("administration/feed/"+id+"/");
}


export { getFeeds, deleteFeed };