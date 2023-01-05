import { apiInstance } from "../custom";

const getFeeds = () => {
    return apiInstance.get("administration/feed");
}


export { getFeeds };