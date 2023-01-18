import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

const DeleteAlert = (props) => {
    const [show, setShow] = useState(true);
    
    return(
        props.alert && 
        <Toast bg='success' style={{
            position: 'fixed',
            top: 0,
            right: 0,
            zIndex:9999,
            backgroundColor:'#ffffff'
            }}  onClose={() => setShow(false)} show={show} delay={5000} autohide>
            <Toast.Header>
                <strong className="mr-auto"> Notificacion  </strong>
                <small>recien</small>
            </Toast.Header>
            <Toast.Body>
                <i className='feather icon-info mx-1' />           
                {props.alert}
            </Toast.Body>
        </Toast>
    )
}
export default DeleteAlert;