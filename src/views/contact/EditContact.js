import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Breadcrumb, Card, Form, Button } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import { putContact } from '../../api/services/contacts';
import FormContact from './components/Form/FormContact';

const EditContact = () => {
    const contact = useLocation().state;
    
    const [supportedName, setSupportedName] = useState(contact.name);
    const [selectRol, setSelectRol] = useState(contact.role);
    const [supportedPriority, setSupportedPriority] = useState(contact.priority);
    const [supportedContact, setSupportedContact] = useState(contact.username);
    const [supportedKey, setSupportedKey] = useState(contact.public_key);
    const [selectType, setSelectType] = useState(contact.type);
    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)
    const [error, setError] = useState(null);

    useEffect( ()=> {
        if(sessionStorage.getItem('Alerta')) {
            const storage = JSON.parse(sessionStorage.getItem('Alerta'));
            setAlert(storage)
                setTimeout(() => {
                    setAlert(null)
                    setStateAlert(null)
                    sessionStorage.removeItem('Alerta')
                }, 5000);
        }
    },[]);

    const editContact = () => {
        let id = contact.url.split('/')[(contact.url.split('/')).length-2];
        putContact (id, supportedName, supportedContact, supportedKey, selectType, selectRol, supportedPriority)
        .then((response) => { 
            console.log(response)
            //setAlert
            sessionStorage.setItem('Alerta', JSON.stringify({name:`El contacto ${supportedName} ha sido editado`, type:1}));
            window.location.href = "/contact/tables"
        })
        .catch((error) => {
            setError(error)
            console.log(error)
            //setAlert
            setAlert({name:`El contacto ${supportedName} NO ha sido editado`, type:0})
        });    
    };

    return (
        <React.Fragment>
            <Alert alert={alert} stateAlert={stateAlert} />
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href="./app/dashboard/default"><i className="feather icon-home" /></Breadcrumb.Item>
                    <Breadcrumb.Item href="./tables"> Contactos</Breadcrumb.Item>
                    <Breadcrumb.Item active><b>Editar Contacto</b></Breadcrumb.Item>
                </Breadcrumb>    
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Contactos</Card.Title>
                            <span className="d-block m-t-5">Editar Contacto</span>
                        </Card.Header>
                        <Card.Body>
                        <FormContact 
                                name={supportedName} setName= {setSupportedName} 
                                role={selectRol} setRole={setSelectRol} 
                                priority={supportedPriority} setPriority={setSupportedPriority} 
                                type={selectType} setType={setSelectType} 
                                contact={supportedContact} setContact={setSupportedContact} 
                                key={supportedKey} setKey={setSupportedKey} 
                                ifConfirm={editContact} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default EditContact;