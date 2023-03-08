import React from 'react';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getTask } from '../../../../api/services/tasks';


const FormTask = (props) => { //TODO refactorizar Form
    const [task, setTask] = useState('');

    useEffect(() => {

        showParentCidr(props.url)
        
    }, []);
    
    const showParentCidr = (url) => {
        getTask(url)
        .then((response) => {
            console.log(response)
            setTask(response.data)
        })
        .catch();
    }
return (
        task && 
        <React.Fragment>
            <Form.Control plaintext readOnly defaultValue={task.name} />
        </React.Fragment>
    );
};

export default FormTask; 
