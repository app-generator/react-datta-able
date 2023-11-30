import apiInstance from "../api";
import { COMPONENT_URL, PAGE } from '../../config/constant';
import setAlert from '../../utils/setAlert';


const getTaxonomies = (currentPage, order) => {
    let messageError = `No se pudo recuperar la informacion de las taxonomias`;
    return apiInstance.get(COMPONENT_URL.taxonomy + PAGE + currentPage + '&ordering=' + order )
        .then(response => {
            return response;
        }).catch(error => {
            setAlert(messageError, "error");
            return Promise.reject(error);
        });
}

const getTaxonomy = (url) => {
    let messageError = `No se pudo recuperar la informacion de la taxonomia`;
    return apiInstance.get(url)
        .then(response => {
            return response;
        }).catch(error => {
            setAlert(messageError, "error");
            return Promise.reject(error);
        });
}

const getAllTaxonomies = (currentPage = 1, results = [], limit = 100) => {
    let messageError = `No se pudo recuperar la informacion de las taxonomias`;
    return apiInstance.get(COMPONENT_URL.taxonomy, { params: { page: currentPage} }) //, page_size: limit 
        .then((response) => {
            let res = [...results, ...response.data.results]
            if (response.data.next !== null) {
                return getAllTaxonomies(++currentPage, res, limit)
            }
            else {
                res.sort((p, q) => {
                    return p.slug > q.slug ? 1 : -1;
                });
                return res;
            }
        })
        .catch((error) => {
            setAlert(messageError, "error");
            return Promise.reject(error);
        })

}

const postTaxonomy = (type, name, description, active, parent) => {
    let messageSuccess = `La taxonomia ${name} se ha creado correctamente`;
    let messageError = `La taxonomia ${name} no ha creado. `;
    return apiInstance.post(COMPONENT_URL.taxonomy, {
        type: type, 
        name: name, 
        description: description,
        active: active,
        parent: parent
    }).then(response => {
        setAlert(messageSuccess, "success");
        return response;
    }).catch(error => { //"slug": ["Ya existe una entidad Taxonomy con slug=copyright." ],
        console.log(error.response)

        let statusText = ""; 
        if (error.response.status == 400){
            console.log("status 400")
            if (error.response.data.slug && error.response.data.slug[0].includes("Ya existe una entidad Taxonomy con slug")) {
                statusText = "Ingrese un nombre diferente.";
                console.log("Error de slug");
            }
        }

        messageError += statusText;
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}


const putTaxonomy = (url, type, name, description, active, parent) => {
    let messageSuccess = `La taxonomia ${name} se ha editado correctamente`;
    let messageError = `La taxonomia ${name} no se ha editado. `;
    return apiInstance.put(url, {
        type: type, 
        name: name, 
        description: description,
        active: active,
        parent: parent
    }).then(response => {
        setAlert(messageSuccess, "success");
        return response;
    }).catch(error => {
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}


const putActivationStatus = (url, state, name) => {
    let messageSuccess = !state ? `La taxonomia ${name} ha sido desactivada` : `La taxonomia ${name} ha sido activada`;
    let messageError = `La taxonomia ${name} no se pudo modificar`;
    return apiInstance.patch(url, {
        active: state
    }).then(response => {
        setAlert(messageSuccess, "success");
        return response;
    }).catch(error => {
        setAlert(messageError, "error");
        return Promise.reject(error);
    });
}


const deleteTaxonomy = (url, name) => {
    let messageSuccess = `La taxonomia ${name} se ha eliminado correctamente`;
    let messageError = `La taxonomia ${name} no se ha encontrado.`;
    return apiInstance.delete(url)
        .then(response => {
            setAlert(messageSuccess, "success");
            return response;
        }).catch(error => {
            if(error.response.detail && error.response.detail === "Not found") {
                messageError = `La taxonomia ${name} no se ha encontrado.`;
            }
            setAlert(messageError, "error");
            return Promise.reject(error);
        });
}


export { getTaxonomies, getTaxonomy, getAllTaxonomies, postTaxonomy, putTaxonomy, putActivationStatus, deleteTaxonomy }







