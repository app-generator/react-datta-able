import React from "react";
import { Alert } from "react-bootstrap";
const DeleteAlert = (props) => {
    return(
        props.alert && 
        <Alert variant={props.alert.type} className="fade show">
            <i className='feather icon-info mx-1' />
            <strong>{props.alert.message}</strong>
        </Alert>
    )
}
export default DeleteAlert;
