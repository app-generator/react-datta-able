import { apiInstance } from "../custom";

const getFeeds = () => {
    return apiInstance.get("administration/feed/");
}

const postFeed = (slug, name, description, active) => {
    return apiInstance.post("administration/feed/", {
        slug: slug, 
        name: name, 
        description: description,
        active: active
    });
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

export { getFeeds, postFeed, putFeed, putActivationStatus, deleteFeed };