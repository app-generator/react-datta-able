import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

const Alert = (props) => {
    const [show, setShow] = useState(true);
    const verde = '#198754'
    const danger = '#ff0000'

    return(
        props.alert && 
        <Toast style={{
            position: 'fixed',
            top: '10%',
            left: '40%',
            zIndex:9999,
            color:'#000000'
            }} onClose={() => setShow(false)} show={show} delay={5000} autohide>
            <Toast.Header>
                <h6 className="mr-auto"  style={{color:`${props.alert.type===1 ? verde : danger}`}}> 
                    <i className= {props.alert.type===1 ? 'feather icon-check-circle mx-1' : 'feather icon-alert-triangle'} />
                    Notificacion  
                </h6>
                <small>recien</small>
            </Toast.Header>
            <Toast.Body>
                <i className= 'feather icon-info mx-1' />           
                {props.alert.name}
            </Toast.Body>
        </Toast>
    )
}
export default Alert;
