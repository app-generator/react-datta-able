import React from 'react';
import { Badge, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getContact } from '../../../../api/services/contacts';

const FormContact = (props) => {
    const [contact, setContact] = useState('');

    useEffect(() => {

        showContactData(props.url)
        
    }, []);
    
    const showContactData = (url) => {
        getContact(url)
        .then((response) => {
            console.log(response)
            setContact(response.data)
        })
        .catch();
    }

    const labelRole =
        {
            technical : 'Tecnico',
            administrative : 'Administrativo',
            abuse : 'Abuso',
            notifications : 'Notificaciones',
            noc : 'NOC',
        };

return (
        contact && 
        <React.Fragment>
            <Badge className="badge mr-1 ligth" >{contact.name + ' (' + labelRole[`${contact.role}`] + '): ' + contact.username}</Badge>
            <br/>
        </React.Fragment>
    );
};

export default FormContact; 
//<Form.Control plaintext readOnly defaultValue={contact.name + ' (' + contact.role + '): ' + contact.username} />
