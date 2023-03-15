import React from 'react';
import {Badge, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getPriority } from '../../api/services/priorities';

const PriorityButton = (props) => {
    const [priority, setPriority] = useState('');
    const [colorText, setColorText] = useState('');

    useEffect(() => {

        showPriority(props.url)
        
    }, []);
    
    const showPriority = (url) => {
        getPriority(url)
        .then((response) => {
            //console.log(response)
            setPriority(response.data)
        })
        .catch();
    }
return (
        priority && 
        <React.Fragment>
                <Badge className="badge mr-1" 
                style={{background: `${priority.color}`, color: '#111111'}}>{priority.name}</Badge> 
        </React.Fragment>
    );
};

export default PriorityButton; 
//parseInt(priority.color.slice(1),16)