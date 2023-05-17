import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { getAllContacts } from '../../api/services/contacts';
import { postNetwork } from '../../api/services/networks';
import FormCreateNetwork from './components/FormCreateNetwork';
import Navigation from '../../components/Navigation/Navigation';
import Alert from '../../components/Alert/Alert';

const CreateNetwork = () => {
    const [cidr, setCidr] = useState(''); //required
    const [type, setType] = useState('0'); //required
    const [contacts, setContacts] = useState([]); //required 
    const active = true; //required: true 
    const children = useState(null); //?
    const [domain, setDomain] = useState(null); // null 
    const [parent, setParent] = useState(null);
    const [network_entity, setNetwork_entity] = useState(null);
    const [error, setError] = useState(null);

    //Dropdown
    const [contactsOption, setContactsOption] = useState([])
    const [contactCreated, setContactsCreated ] = useState(null); // si creo se renderiza

    //Alert
    const [showAlert, setShowAlert] = useState(false);

    useEffect(()=> {

        getAllContacts()
            .then((response) => {
                let listContact = []
                response.map((contactsItem)=>{
                    listContact.push({value:contactsItem.url, label:contactsItem.name + ' (' + labelRole[contactsItem.role] + ')'})
                })
                setContactsOption(listContact)
                console.log(response)
            })
            .catch((error)=>{
                setError(error)
            })  

        },[contactCreated])

    const labelRole = {
        technical : 'Tecnico',
        administrative : 'Administrativo',
        abuse : 'Abuso',
        notifications : 'Notificaciones',
        noc : 'NOC',
    };

    const createNetwork = () => {

        postNetwork (children, cidr, domain, active, type, parent, network_entity, contacts) 
            .then((response) => { 
            window.location.href = "/networks"
        })
        .catch(() => {
            setShowAlert(true)
            console.log(error)
        }); 

    };

    return (
        <React.Fragment>
        <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)}/>
            <Row>
                <Navigation actualPosition="Crear Red" path="/networks" index ="Redes"/>
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
                                ifConfirm={createNetwork} edit={false}
                                allContacts={contactsOption}
                                setContactsCreated={setContactsCreated}
                                setShowAlert={setShowAlert} />                          
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CreateNetwork;
