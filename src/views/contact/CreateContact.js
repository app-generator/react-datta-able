import React, { useState, useEffect } from 'react';
import { Row, Col, Card,Breadcrumb } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import { postContact } from '../../api/services/contacts';
import FormContact from './components/Form/FormContact';

const CreateContact = () => {
    const [supportedName, setSupportedName] = useState('');
    const [selectRol, setSelectRol] = useState('0');
    const [supportedPriority, setSupportedPriority] = useState('0');
    const [supportedContact, setSupportedContact] = useState('');
    const [supportedKey, setSupportedKey] = useState(null);
    const [selectType, setSelectType] = useState('0');
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

    const createContact = () => {
        console.log(supportedName);
        console.log(supportedContact);
        console.log(supportedKey);
        console.log(selectType);
        console.log(selectRol);
        console.log(supportedPriority);


        postContact (supportedName, supportedContact, supportedKey, selectType, selectRol, supportedPriority)
        .then((response) => { 
            console.log(response)
            //setAlert
            sessionStorage.setItem('Alerta', JSON.stringify({name:`El contacto ${supportedName} ha sido creado.`, type:1}));
            window.location.href = "/contact/tables"
        })
        .catch((error) => {
            setError(error)
            console.log(error)
            //setAlert
            setAlert({name:`El contacto ${supportedName} NO ha sido creado`, type:0})
        });    
    };

    return (
        <React.Fragment>
            <Alert alert={alert} stateAlert={stateAlert} />
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href="./app/dashboard/default"><i className="fas fa-home" /></Breadcrumb.Item>
                    <Breadcrumb.Item active>Contactos</Breadcrumb.Item>
                    <Breadcrumb.Item active>Crear Contacto</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Contactos</Card.Title>
                            <span className="d-block m-t-5">Agregar Contacto</span>
                        </Card.Header>
                        <Card.Body>
                             <FormContact 
                                name={supportedName} setName= {setSupportedName} 
                                role={selectRol} setRole={setSelectRol} 
                                priority={supportedPriority} setPriority={setSupportedPriority} 
                                type={selectType} setType={setSelectType} 
                                contact={supportedContact} setContact={setSupportedContact} 
                                key={supportedKey} setKey={setSupportedKey} 
                                ifConfirm={createContact} />                          
                        </Card.Body>

                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CreateContact;