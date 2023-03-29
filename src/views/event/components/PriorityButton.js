import React from 'react';
import {Badge} from 'react-bootstrap';
import { useState, useEffect } from 'react';

const PriorityButton = ({url, callback}) => {
    const [priority, setPriority] = useState('');

    useEffect(() => {

        callback(url, setPriority)
        
    }, []);
    
return (
        priority && 
        <React.Fragment>
                <Badge className="badge mr-1" 
                style={{background: `${priority.color}`, color: '#111111'}}>{priority.name}</Badge> 
        </React.Fragment>
    );
};

export default PriorityButton; 