import React from 'react';
import {Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getPriority } from '../../api/services/priorities';

const PriorityButton = (props) => {
    const [priority, setPriority] = useState('');
    
    useEffect(() => {

        showPriority(props.url)

    }, []);
    
    const showPriority = (url) => {
        getPriority(url)
        .then((response) => {
            console.log(response)
            setPriority(response.data)
        })
        .catch();
    }

return (
        priority && //sin prioridad no aparece el boton 
        <React.Fragment>
            <Button size="sm" variant='light' className="text-capitalize" title='Prioridades'>
                Prioridad
                <span className="badge ml-2" style={{background: `${priority.color}`} }>{priority.name}</span>
            </Button>
        </React.Fragment>
    );
};

export default PriorityButton; 
