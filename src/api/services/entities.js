import { apiInstance } from "../custom";

const getEntities = () => {
    return apiInstance.get("entity/");
}

const getEntity = (id) => { 
    return apiInstance.get("entity/"+id+"/");
}

const postEntity = (name, slug, active) => {
    return apiInstance.post("entity/", {
        name: name, //*
        slug: slug, //*
        active: active //*
    });
}

const putEntity = (name, slug, active) => {
    return apiInstance.post("entity/", {
        name: name, //*
        slug: slug, //*
        active: active //*
    });
}

const deleteEntity = (id) => {
    return apiInstance.delete("entity/"+id+"/");
}

const isActive = (id, active) => { //?
    return apiInstance.patch("entity/"+id+"/", {
        active: active
    } );
}

export { getEntities, getEntity, postEntity, putEntity, deleteEntity, isActive };
