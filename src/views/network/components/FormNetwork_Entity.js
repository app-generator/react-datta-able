import React from 'react';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getEntity } from '../../../api/services/entities';

const BadgeNetwork_Entity = (props) => { //TODO
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
            <Form.Control plaintext readOnly defaultValue={entity.name} />
        </React.Fragment>
    );
};

export default BadgeNetwork_Entity; 
 