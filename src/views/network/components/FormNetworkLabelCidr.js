import React from 'react';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getNetwork } from '../../../api/services/networks';

const FormNetworkLabelCidr = (props) => { //TODO refactorizar los Form
    const [network, setNetwork] = useState('');

    useEffect(() => {

        showParentCidr(props.url)
        
    }, [props.url]);
    
    const showParentCidr = (url) => {
        getNetwork(url)
        .then((response) => {
            console.log(response)
            setNetwork(response.data)
        })
        .catch();
    }
return (
        network && 
        <React.Fragment>
            <Form.Control plaintext readOnly defaultValue={network.cidr} />
        </React.Fragment>
    );
};

export default FormNetworkLabelCidr; 
