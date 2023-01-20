import { useContext } from "react";
import ToastContext from "./ToastContext"; 
//consumir contextos desde los hooks 
const useToastContext = () => {
    //devuelve el valor del contexto
    return useContext(ToastContext);
}
export default useToastContext;
//luego envolver la aplicacion con el provider