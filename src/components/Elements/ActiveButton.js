import React from 'react';
import {Button} from 'react-bootstrap';

const ActiveButton = ({state}) => {
    const active = state===1;
    return (
        <React.Fragment>
            <Button 
                className="btn-icon btn-rounded" 
                variant={active ? 'outline-success' : 'outline-danger'} 
                title={active ? 'Activo' : 'Inactivo'}>
                    <i className={active ? 'feather icon-check-circle' : 'feather icon-alert-triangle'}/>
            </Button>
        </React.Fragment>
    );
};

export default ActiveButton;