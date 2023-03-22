import React from 'react';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';


const GetUserName = (props) => { // url, get, key, Form: true o false
    
    const [user, setUser] = useState('');

    useEffect(() => {

        showName(props.url)
        
    }, []);
    
    const showName = (url) => {
        props.get(url)
        .then((response) => {
            console.log(response)
            setUser(response.data)
        })
        .catch();
    }
return (
        user && 
        <React.Fragment>
            {props.form ? <Form.Control plaintext readOnly defaultValue={`${user.first_name} ${user.last_name} - ${user.username}`} key={props.key} />
            :
            <>{user.username}</>
            }
        </React.Fragment>
    );
};

export default GetUserName; 
