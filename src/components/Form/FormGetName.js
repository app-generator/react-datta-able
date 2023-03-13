import React from 'react';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';


const FormGetName = (props) => { // url, get, key, Form: true o false
    const [item, setItem] = useState('');

    useEffect(() => {

        showName(props.url)
        
    }, []);
    
    const showName = (url) => {
        props.get(url)
        .then((response) => {
            console.log(response)
            setItem(response.data)
        })
        .catch();
    }
return (
        item && 
        <React.Fragment>
            {props.form ? <Form.Control plaintext readOnly defaultValue={item.name} key={props.key} />
            :
            <>{item.name}</>
            }
        </React.Fragment>
    );
};

export default FormGetName; 
