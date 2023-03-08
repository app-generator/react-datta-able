import React from 'react';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getTaxonomy } from '../../../../api/services/taxonomy';


const FormTaxonomy = (props) => { //TODO refactorizar Form
    const [taxonomy, setTaxonomy] = useState('');

    useEffect(() => {

        showParentCidr(props.url)
        
    }, []);
    
    const showParentCidr = (url) => {
        getTaxonomy(url)
        .then((response) => {
            console.log(response)
            setTaxonomy(response.data)
        })
        .catch();
    }
return (
        taxonomy && 
        <React.Fragment>
            <Form.Control plaintext readOnly defaultValue={taxonomy.name} />
        </React.Fragment>
    );
};

export default FormTaxonomy; 
