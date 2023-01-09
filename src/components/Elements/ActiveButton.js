import React from 'react';
import {Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { isActive } from '../../api/services/entities';


const ActiveButton = ({id, active, onClick}) => {
    const [entityId,setEntityId] = useState(id);
    const [state,setState] = useState(null);
    const [error, setError] = useState(null);
    const [stateBool, setStateBool] = useState(null);
    
    const print = () => {
        console.log("hola onclick")

        if(state===1){
            setState('0');
        }else {
            setState('1');
        }
        console.log(state);

    }
    
    
    {/*
    useEffect(() => {
        setEntityId(id);
        setState(active);
        let b = state===1;
        setStateBool(b);
    },[]);
    const switchState = (entityId, state) => {
        stateBool ? setState(0) : setState(1);
        console.log(state);

        isActive(entityId, state).then((response) => {
            console.log(response);
        }).catch(setError)
    }
*/} 

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