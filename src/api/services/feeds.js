import { apiInstance } from "../custom";

const getFeeds = () => {
    return apiInstance.get("administration/feed/");
}


const putFeed = (id, slug, name, description, active) => {
    return apiInstance.put("administration/feed/"+id+"/", {
        slug: slug, 
        name: name, 
        description: description,
        active: active
    });
}


const putActivationStatus= (id, state) => {
    return apiInstance.patch("administration/feed/"+id+"/", {
        active: state
    } );
}


const deleteFeed = (id) => {
    return apiInstance.delete("administration/feed/"+id+"/");
}

export { getFeeds, putFeed, putActivationStatus, deleteFeed };