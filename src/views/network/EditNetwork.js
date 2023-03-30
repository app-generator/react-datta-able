import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import { getContacts } from '../../api/services/contacts';
import { putNetwork } from '../../api/services/networks';
import FormCreateNetwork from './components/FormCreateNetwork';
import ModalConfirm from '../../components/Modal/ModalConfirm';
import { isActive } from '../../api/services/networks'; 
import Navigation from '../../components/Navigation/Navigation';

const EditNetwork = () => {

    const network = useLocation().state;
    const [url, setUrl] = useState(network.url);///
    const [children, setChildren] = useState(network.children);
    const [cidr, setCidr] = useState(network.cidr===null ? '' : network.cidr); //* 
    const [domain, setDomain] = useState(network.domain===null ? '' : network.domain); // null 
    const [active, setActive] = useState(network.active); //* true 
    const [type, setType] = useState(network.type); //* internal external
    const [parent, setParent] = useState(network.parent);
    const [network_entity, setNetwork_entity] = useState(network.network_entity);
    const [contacts, setContacts] = useState(network.contacts); //* 
    const [error, setError] = useState(null);
    const [modalState, setModalState] = useState(false);

    //Dropdown
    const [contactsOption, setContactsOption] = useState([])
    const [contactCreated, setContactsCreated ] = useState(null); // si creo se renderiza
    

    useEffect(()=> {
        
        //multiselect all options 
        getContacts()
            .then((response) => {
                let listContact = []
                response.data.results.map((contactsItem)=>{
                    listContact.push({value:contactsItem.url, label:contactsItem.name + ' (' + labelRole[contactsItem.role] + ') ' + contactsItem.username})
                })
                setContactsOption(listContact)
                console.log(response.data.results)
            })
            .catch((error)=>{
                setError(error)
            })  
        
        },[])

    const labelRole = {
        technical : 'Tecnico',
        administrative : 'Administrativo',
        abuse : 'Abuso',
        notifications : 'Notificaciones',
        noc : 'NOC',
    };

    //Update
    const editNetwork = () => {

        putNetwork (url, children, cidr, domain, active, type, parent, network_entity, contacts) 
            .then((response) => { 
                console.log(response)
                console.log('create network - put .then')
                window.location.href = "/network/tables"
            })
            .catch((error) => {
                setError(error)
                console.log(error)
            });    
    };

    //Update Network
    const switchState = ()=> {
        isActive(url, !active) //+!active si el estado es int
            .then((response) => {
                console.log(response.data)
                setActive(response.data.active)
            })
            .catch((error) => {
                console.log(error)
                setError(error)
            })
            .finally(() => {
                setModalState(false)
            })
    };
    

    return (
        <React.Fragment>
            <Row>
                <Navigation actualPosition="Editar Red" path="/network/tables" index ="Redes"/>
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col>
                                    <Card.Title as="h5">Redes</Card.Title>
                                    <span className="d-block m-t-5">Editar Red</span>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                             <FormCreateNetwork 
                                cidr={cidr} setCidr={setCidr}
                                domain={domain} setDomain={setDomain}
                                type={type} setType={setType}
                                parent={parent} setParent={setParent}
                                network_entity={network_entity} setNetwork_entity={setNetwork_entity}
                                active={active} setActive={setActive} 
                                ifConfirm={editNetwork} edit={true} 
                                contacts={contacts} setContacts={setContacts}
                                allContacts={contactsOption}
                                setContactsCreated={setContactsCreated} />                          
                        </Card.Body>
                    </Card>
                    <Alert />
                </Col>
            </Row>
            <ModalConfirm type='editState' component='Red' name={cidr} state={active} showModal={modalState} onHide={() => setModalState(false)} ifConfirm={() => switchState(url, active)}/>
        </React.Fragment>
    );
};

export default EditNetwork;
