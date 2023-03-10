import React from 'react';
import {Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';

const ActiveButton = ({ active, onClick}) => {
    
    const [stateBool, setStateBool] = useState(null);
    
    useEffect(() => {

        setStateBool(active);

    },[active]);

    return (
        <React.Fragment>
            <Button 
                className="btn-icon btn-rounded" 
                variant={stateBool ? 'outline-success' : 'outline-danger'} 
                title={stateBool ? 'Activo' : 'Inactivo'}
                onClick={onClick}>
                    <i className={stateBool ? 'feather icon-check-circle' : 'feather icon-alert-triangle'}/>
            </Button>
        </React.Fragment>
    );
};

export default ActiveButton; 
