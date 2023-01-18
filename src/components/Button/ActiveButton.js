import React from 'react';
import {Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';

const ActiveButton = ({id, active, onClick}) => {
    const [entityId,setEntityId] = useState(null);
    const [state,setState] = useState(null);
    const [error, setError] = useState(null);
    const [stateBool, setStateBool] = useState(null);
    
    useEffect(() => {
        setEntityId(id.split('/')[(id.split('/')).length-2]);
        setState(active);
        setStateBool(active===1);
},[]);
    const print = () => {
        console.log("hola onclick")
    }

//    console.log(entityId)
//    console.log(state)
//    console.log(stateBool)

    return (
        <React.Fragment>
            <Button 
                className="btn-icon btn-rounded" 
                variant={stateBool ? 'outline-success' : 'outline-danger'} 
                title={stateBool ? 'Activo' : 'Inactivo'}
                onClick={print}>
                    <i className={stateBool ? 'feather icon-check-circle' : 'feather icon-alert-triangle'}/>
            </Button>
        </React.Fragment>
    );
};

export default ActiveButton;