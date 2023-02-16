import React, { useState, useEffect } from 'react';
import { Row, Col, Badge, Card, Form, Button, Table, Modal, CloseButton, Spinner } from 'react-bootstrap';
import { getContact, deleteContact } from '../../../../api/services/contacts';
import CrudButton from '../../../../components/Button/CrudButton';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../../../components/Modal/ModalConfirm';

const TableContact = ({callback, list, loading }) => {
    const [contact, setContact] = useState('')
    const [error, setError] = useState(null)
    const [modalShow, setModalShow] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [id, setId] = useState(null)

    const [name, setName] = useState(null);
    const [created, setCreated] = useState(null)
    const [modified, setModified] = useState(null)
    const [type, setType] = useState(null)
    const [role, setRole] = useState(null)

    useEffect(() => {

    },[]);

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    }

    const priority = {
        "url": "http://localhost:8000/api/administration/priority/6/",
        "color": "#00FF00",
        "created": "2019-03-22T16:24:33Z",
        "modified": "2022-04-09T00:33:40.089000Z",
        "name": "Low",
        "severity": 4,
        "attend_time": "04:00:00",
        "solve_time": "2 00:00:00",
        "attend_deadline": "1 00:00:00",
        "solve_deadline": "2 00:00:00",
        "notification_amount": 3
    };
    const getPrioridades = {
        "count": 5,
        "next": null,
        "previous": null,
        "results": [
            {
                "url": "http://localhost:8000/api/administration/priority/1/",
                "color": "#FFFFFF",
                "created": "2019-03-22T16:24:33Z",
                "modified": "2022-05-27T20:03:30.447000Z",
                "name": "Critical",
                "severity": 1,
                "attend_time": "00:00:00",
                "solve_time": "01:00:00",
                "attend_deadline": "00:01:00",
                "solve_deadline": "2 00:00:00",
                "notification_amount": 3
            },
            {
                "url": "http://localhost:8000/api/administration/priority/3/",
                "color": "#FFFFFF",
                "created": "2019-03-22T16:24:33Z",
                "modified": "2022-04-09T00:26:44.802000Z",
                "name": "High",
                "severity": 2,
                "attend_time": "00:10:00",
                "solve_time": "04:00:00",
                "attend_deadline": "03:00:00",
                "solve_deadline": "2 00:00:00",
                "notification_amount": 3
            },
            {
                "url": "http://localhost:8000/api/administration/priority/2/",
                "color": "#FFFFFF",
                "created": "2019-03-22T16:24:33Z",
                "modified": "2022-04-09T00:26:25.310000Z",
                "name": "Medium",
                "severity": 3,
                "attend_time": "01:00:00",
                "solve_time": "08:00:00",
                "attend_deadline": "07:00:00",
                "solve_deadline": "2 00:00:00",
                "notification_amount": 3
            },
            {
                "url": "http://localhost:8000/api/administration/priority/6/",
                "color": "#FFFFFF",
                "created": "2019-03-22T16:24:33Z",
                "modified": "2022-04-09T00:33:40.089000Z",
                "name": "Low",
                "severity": 4,
                "attend_time": "04:00:00",
                "solve_time": "2 00:00:00",
                "attend_deadline": "1 00:00:00",
                "solve_deadline": "2 00:00:00",
                "notification_amount": 3
            },
            {
                "url": "http://localhost:8000/api/administration/priority/5/",
                "color": "#FFFFFF",
                "created": "2019-03-22T16:24:33Z",
                "modified": "2022-04-09T00:19:17.743000Z",
                "name": "Very Low",
                "severity": 5,
                "attend_time": "1 00:00:00",
                "solve_time": "7 00:00:00",
                "attend_deadline": "1 00:00:00",
                "solve_deadline": "2 00:00:00",
                "notification_amount": 3
            }
        ]
    };

    //Read Entity
    const showContact = (key)=> {
        setId(key)
        setContact('')
        getContact(key)
        .then((response) => {
            setContact(response.data)
            let datetime = response.data.created.split('T')
            setCreated(datetime[0] + ' ' + datetime[1].slice(0,8))
            datetime = response.data.modified.split('T');
            setModified(datetime[0] + ' ' + datetime[1].slice(0,8))
            setRole(Upper(response.data.role))
            setType(Upper(response.data.type))
            setModalShow(true)
        })
        .catch(setError);
    };

    //Remove Contact
    const Delete = (key, name) => {
        setId(key);
        setName(name);
        setModalDelete(true)
    }

    const removeContact = (key)=> {
        deleteContact(key)
            .then((response) => {
                console.log(response)
                callback(`El contacto ${name} ha sido eliminado`, true)
            })
            .catch((error) => {
                console.log(error)
                setError(error)
                callback(`El contacto ${name} NO ha sido eliminado`, false)
            })
            .finally(() => {
                setModalDelete(false)
            })
    };

    if (error) {
        console.log(error);
        return <p>Ups! Se produjo un error al buscar el contacto.</p>
    }

    const Upper = (text) => {
        let first = text.charAt(0).toUpperCase();
        return (first+text.slice(1))
    }

    return (
            <React.Fragment>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Contacto</th>
                            <th>Creado</th>
                            <th>Modificado</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((contact, index) => {
                            let url = contact.url.split('/')[(contact.url.split('/')).length-2];
                            return (
                                <tr key={url}>
                                <th scope="row">{index+1}</th>
                                <td>{contact.name}</td>
                                <td>{contact.username}</td>
                                <td>{contact.created.slice(0, 10)}</td>
                                <td>{contact.modified.slice(0, 10)}</td>
                                <td>
                                    <CrudButton type='read' onClick={() => showContact(url)} />
                                    <Link to={{pathname:'/contact/edit', state: contact}} >
                                        <CrudButton type='edit'/>
                                    </Link>
                                    <CrudButton type='delete' onClick={() => Delete(url, contact.name)} />
                                </td>
                            </tr>
                            );
                        })}
                    </tbody>
                </Table>

                <Modal size='lg' show={modalShow} onHide={() => setModalShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <Row>    
                        <Col>                 
                            <Card>
                                <Card.Header> 
                                    <Row>
                                        <Col>
                                            <Card.Title as="h5">Contactos</Card.Title>
                                            <span className="d-block m-t-5">Detalle de contacto</span>
                                        </Col>
                                        <Col sm={12} lg={2}>                       
                                            <Link to={{pathname:'/contact/edit', state: contact}} >
                                                <CrudButton type='edit'/>
                                            </Link>
                                            <CloseButton aria-label='Cerrar' onClick={() => setModalShow(false)} />
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    <Table responsive >
                                    <tbody>
                                        <tr>
                                            <td>Id del sistema</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={id} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Nombre</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={contact.name} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Rol</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={role} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>{type}</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={contact.username} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Fecha de creación</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={created} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ultima actualización</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={modified} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Llave pública</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={contact.public_key} />
                                            </td>
                                        </tr>
                                        
                                        <tr>
                                            <td>Informacion Relacionada</td>
                                            <td>
                                                <Button size="sm" variant='light' className="text-capitalize">
                                                    Redes
                                                <Badge variant="light" className="ml-2">4</Badge>
                                                </Button>
                                                <Button size="sm" variant='light' className="text-capitalize">
                                                    Prioridad
                                                    <span className="badge ml-2" style={{background: `${priority.color}`}}>{priority.name}</span>
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>prioridad</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={contact.priority} />
                                            </td>
                                        </tr>                                    
                                    </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col> 
                    </Row>
                </Modal.Body>
            </Modal>
            <ModalConfirm type='delete' component='Contacto' name={name} showModal={modalDelete} onHide={() => setModalDelete(false)} ifConfirm={() => removeContact(id)}/>
        </React.Fragment> 
  );
};

export default TableContact;
