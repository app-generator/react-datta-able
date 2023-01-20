import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

const Alert = (props) => {
    const [show, setShow] = useState(true);
    const oscuro = '#3F4D67'
    const verde = '#198754'
    const azul = '#04A9F5'
    const success = '#1DE9B6'
    const danger = '#ff0000'

    return(
        props.alert && 
        <Toast style={{
            position: 'fixed',
            zIndex:9999,
            color:'#000000',
            }} className={props.alert.type===1 ? 'border border-success rounded' : 'border border-danger rounded'}  onClose={() => setShow(false)} show={show} delay={5000} autohide>
            <Toast.Header>
                <h6 className="mr-auto"> Notificacion  </h6>
                <small>recien</small>
            </Toast.Header>
            <Toast.Body style={{
            backgroundColor: `${props.alert.type===1 ? success : danger}`
            }}>
                <i className='feather icon-info mx-1' />           
                {props.alert.type===1 ? `La entidad ${props.alert.name} ha sido eliminada ` : `La entidad ${props.alert.name} NO ha sido eliminada `}
            </Toast.Body>
        </Toast>
    )
}
export default Alert;