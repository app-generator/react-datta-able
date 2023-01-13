import { apiInstance } from "../custom";

const getFeeds = () => {
    return apiInstance.get("administration/feed/");
}

const deleteFeed = (id) => {
    return apiInstance.delete("administration/feed/"+id+"/");
}

const active = (id, state) => {
    return apiInstance.patch("administration/feed/"+id+"/", {
        active: state
    } );
}


export { getFeeds, deleteFeed, active };