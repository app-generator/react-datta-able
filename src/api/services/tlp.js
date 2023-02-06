import { apiInstance } from "../custom";

const getTLP = () => {
    return apiInstance.get("administration/tlp");
}


export { getTLP };