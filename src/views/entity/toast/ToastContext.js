import { Toast } from 'react-bootstrap';
import React, { createContext, useEffect, useState } from "react";

const ToastContext = createContext();

export default ToastContext;

//provee el valor de los contextos a los componentes que engloba
export const ToastContextProvider = ({children}) => {
    //const [show, setShow] = useState(true);
    const [toasts, setToasts] = useState ([]);

    useEffect(() => {
        if(toasts.length > 0){
            const timer = setTimeout(() => {
                setToasts(toasts => toasts.slice(1));
                }, 3000);
            return () => clearTimeout(timer);
        }
    //dependencias
    }, [toasts.length, setToasts])


    const addToasts = (message) => {
        //recibe el estado actual
        setToasts(toasts => [...toasts, message])
    };
    return (
        <ToastContext.Provider value={addToasts}>
            <>
                {children}
                    {toasts.map (toast => {
                        <Toast bg='success' style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            zIndex:9999,
                            }}>
                            {/*}}  onClose={() => setShow(false)} show={show} delay={5000} autohide>*/}
                            <Toast.Header>
                                <strong className="mr-auto"> Notificacion  </strong>
                                <small>recien</small>
                            </Toast.Header>
                            <Toast.Body>
                                <i className='feather icon-info mx-1' />           
                                {toast}
                            </Toast.Body>
                        </Toast>
                    })}
            </>
        </ToastContext.Provider>
    )
}