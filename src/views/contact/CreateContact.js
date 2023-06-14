import React, { useState } from 'react';
import { Card, Col, Row  } from 'react-bootstrap';
import { postContact } from '../../api/services/contacts';
import FormCreateContact from './components/FormCreateContact';
import Navigation from '../../components/Navigation/Navigation';
import Alert from '../../components/Alert/Alert';

const CreateContact = () => {
    const [supportedName, setSupportedName] = useState('');
    const [selectRol, setSelectRol] = useState('');
    const [supportedPriority, setSupportedPriority] = useState('');
    const [supportedContact, setSupportedContact] = useState('');
    const [supportedKey, setSupportedKey] = useState(null);
    const [selectType, setSelectType] = useState('');
    
    //Alert
    const [showAlert, setShowAlert] = useState(false);

    const createContact = () => { //refactorizar al FormCreateContact

        postContact (supportedName, supportedContact, supportedKey, selectType, selectRol, supportedPriority)
        .then((response) => { 
            window.location.href = "/contacts"
        })
        .catch(() => {
            setShowAlert(true)
        });    
    };

    return (
        <React.Fragment>
        <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)}/>
            <Row>
                <Navigation actualPosition="Crear Contacto" path="/contacts" index ="Contactos"/>
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Contactos</Card.Title>
                            <span className="d-block m-t-5">Agregar Contacto</span>
                        </Card.Header>
                        <Card.Body>
                             <FormCreateContact 
                                name={supportedName} setName= {setSupportedName} 
                                role={selectRol} setRole={setSelectRol} 
                                priority={supportedPriority} setPriority={setSupportedPriority} 
                                type={selectType} setType={setSelectType} 
                                contact={supportedContact} setContact={setSupportedContact} 
                                keypgp={supportedKey} setKey={setSupportedKey} 
                                ifConfirm={createContact} ifCancel={() => window.location.href = "/contacts"} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CreateContact;
