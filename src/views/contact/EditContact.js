import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import { putContact } from '../../api/services/contacts';
import FormCreateContact from './components/FormCreateContact';
import Navigation from '../../components/Navigation/Navigation';
import { getContact } from '../../api/services/contacts';

const EditContact = () => {
    const location = useLocation();
    const fromState = location.state;
    const [contact, setContact] = useState(fromState);
        
    const [supportedName, setSupportedName] = useState('');
    const [selectRol, setSelectRol] = useState('');
    const [supportedPriority, setSupportedPriority] = useState('');
    const [supportedContact, setSupportedContact] = useState('');
    const [supportedKey, setSupportedKey] = useState('');
    const [selectType, setSelectType] = useState('');
    
    //Alert
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {

        if(contact){
            setSupportedName(contact.name);
            setSelectRol(contact.role);
            setSupportedPriority(contact.priority);
            setSupportedContact(contact.username);
            setSupportedKey(contact.public_key);
            setSelectType(contact.type);
        } else {
            const contactUrl = localStorage.getItem('contact');
            console.log("STORAGE")
            getContact(contactUrl)
            .then((response) => {
                setContact(response.data)
            }).catch(error => console.log(error));
          
          }
    }, [contact]);

    const editContact = () => {
        putContact (contact.url, supportedName, supportedContact, supportedKey, selectType, selectRol, supportedPriority)
        .then((response) => { 
            localStorage.removeItem('contact');
            window.location.href = "/contacts"
        })
        .catch(() => {
            setShowAlert(true)
        });    
    };

    return (
        <React.Fragment>
        <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)} component="contact"/>
            <Row>
                <Navigation actualPosition="Editar Contacto" path="/contacts" index ="Contactos"/>
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Contactos</Card.Title>
                            <span className="d-block m-t-5">Editar Contacto</span>
                        </Card.Header>
                        <Card.Body>
                        <FormCreateContact 
                                name={supportedName} setName= {setSupportedName} 
                                role={selectRol} setRole={setSelectRol} 
                                priority={supportedPriority} setPriority={setSupportedPriority} 
                                type={selectType} setType={setSelectType} 
                                contact={supportedContact} setContact={setSupportedContact} 
                                keypgp={supportedKey} setKey={setSupportedKey} 
                                ifConfirm={editContact} ifCancel={() => {window.location.href = "/contacts"}}/>
                        </Card.Body>
                    </Card>
                    </Col>
            </Row>
        </React.Fragment>
    );
};

export default EditContact;