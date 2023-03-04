import React from 'react';
import {Badge } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getEntity } from '../../../../api/services/entities';

const BadgeNetwork_Entity = (props) => {
    const [entity, setEntity] = useState('');

    useEffect(() => {

        showEntity(props.url)
        
    }, []);
    
    const showEntity = (url) => {
        getEntity(url)
        .then((response) => {
            console.log(response)
            setEntity(response.data)
        })
        .catch();
    }
return (
        entity && 
        <React.Fragment>
            <Badge className="badge mr-1 ligth" >{entity.name}</Badge> 
        </React.Fragment>
    );
};

export default BadgeNetwork_Entity; 
