import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Card,Breadcrumb } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import { putNetwork } from '../../api/services/networks';
import FormCreateNetwork from './components/Form/FormCreateNetwork';

const EditNetwork = () => {
    const network = useLocation().state;
    const [url, setUrl] = useState(network.url);///
    const [children, setChildren] = useState(network.children);
    const [cidr, setCidr] = useState(network.cidr); //* 
    const [domain, setDomain] = useState(network.domain); // null 
    const [active, setActive] = useState(network.active); //* true 
    const [type, setType] = useState(network.type); //* internal external
    const [parent, setParent] = useState(network.parent);
    const [network_entity, setNetwork_entity] = useState(network.network_entity);
    const [contacts, setContacts] = useState([...network.contacts]); //* 
    const [error, setError] = useState(null);

    //Update
    const editNetwork = () => {
    //        putNetwork (url, null, '10.0.0.0/16', null, true, 'external', null, null, ['http://localhost:8000/api/contact/88/']) 
    putNetwork (url, children, cidr, domain, active, type, parent, network_entity, contacts) 
        .then((response) => { 
            console.log(response)
            window.location.href = "/network/tables"
        })
        .catch((error) => {
            setError(error)
            console.log(error)
        });    
    };

    return (
        <React.Fragment>
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href="./app/dashboard/default"><i className="fas fa-home" /></Breadcrumb.Item>
                    <Breadcrumb.Item active>Redes</Breadcrumb.Item>
                    <Breadcrumb.Item active>Editar Red</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Redes</Card.Title>
                            <span className="d-block m-t-5">Editar Red</span>
                        </Card.Header>
                        <Card.Body>
                             <FormCreateNetwork 
                                cidr={cidr} setCidr={setCidr}
                                domain={domain} setDomain={setDomain}
                                type={type} setType={setType}
                                parent={parent} setParent={setParent}
                                network_entity={network_entity} setNetwork_entity={setNetwork_entity}
                                contacts={contacts} setContacts={setContacts}
                                ifConfirm={editNetwork} />                          
                        </Card.Body>
                    </Card>
                    <Alert />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default EditNetwork;
