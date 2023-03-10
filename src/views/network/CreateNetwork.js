import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import { postNetwork } from '../../api/services/networks';
import FormCreateNetwork from './components/Form/FormCreateNetwork';
import Navigation from '../../components/navigation/navigation';

const CreateNetwork = () => {
    const [children, setChildren] = useState(null);
    const [cidr, setCidr] = useState(''); //* 
    const [domain, setDomain] = useState(null); // null 
    const [active, setActive] = useState(true); //* true 
    const [type, setType] = useState('0'); //* internal external
    const [parent, setParent] = useState(null);
    const [network_entity, setNetwork_entity] = useState(null);
    const [contacts, setContacts] = useState([]); //* 
    const [error, setError] = useState(null);

    const createNetwork = () => {

        //        postNetwork (null, '10.0.0.0/16', null, true, 'external', null, null, ['http://localhost:8000/api/contact/88/']) 
        postNetwork (children, cidr, domain, active, type, parent, network_entity, contacts) 
            .then((response) => { 
            console.log(response)
            console.log('create network - post .then')
            //window.location.href = "/network/tables"
        })
        .catch((error) => {
            setError(error)
            console.log(error)
        }); 

    };

    return (
        <React.Fragment>
            <Row>
                <Navigation actualPosition="Crear Red" path="/network/tables" index ="Redes"/>
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Redes</Card.Title>
                            <span className="d-block m-t-5">Agregar Red</span>
                        </Card.Header>
                        <Card.Body>
                             <FormCreateNetwork 
                                cidr={cidr} setCidr={setCidr}
                                domain={domain} setDomain={setDomain}
                                type={type} setType={setType}
                                parent={parent} setParent={setParent}
                                network_entity={network_entity} setNetwork_entity={setNetwork_entity}
                                contacts={contacts} setContacts={setContacts}
                                ifConfirm={createNetwork} edit={false} />                          
                        </Card.Body>
                    </Card>
                    <Alert />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CreateNetwork;
//crear contacto