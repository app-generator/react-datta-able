import { apiInstance } from "../custom";
import { API_SERVER,COMPONENT_URL } from '../../config/constant';

const getEntities = (page="") => {return apiInstance.get("entity/"+page);}
//const getEntities = (page="") => {return apiInstance.get(COMPONENT_URL.entity+page);}

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

const putEntity = (id, name, slug, active) => {
    return apiInstance.put("entity/"+id+"/", {
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
