import React, { useState } from 'react';
import { Card, Col, Row  } from 'react-bootstrap';
import { postContact } from '../../api/services/contacts';
import FormCreateContact from './components/FormCreateContact';
import Navigation from '../../components/Navigation/Navigation';

const CreateContact = () => {
    const [supportedName, setSupportedName] = useState('');
    const [selectRol, setSelectRol] = useState('0');
    const [supportedPriority, setSupportedPriority] = useState('0');
    const [supportedContact, setSupportedContact] = useState('');
    const [supportedKey, setSupportedKey] = useState('');
    const [selectType, setSelectType] = useState('0');
    const [error, setError] = useState(null);

    const createContact = () => { //refactorizar al FormCreateContact

        postContact (supportedName, supportedContact, supportedKey, selectType, selectRol, supportedPriority)
        .then((response) => { 
            //window.location.href = "/contact/tables"
        })
        .catch((error) => {
            setError(error)
        });    
    };

    return (
        <React.Fragment>
            <Row>
                <Navigation actualPosition="Crear Contacto" path="/contact/tables" index ="Contactos"/>
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
                                ifConfirm={createContact} ifCancel={() => window.location.href = "/contact/tables"} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CreateContact;
