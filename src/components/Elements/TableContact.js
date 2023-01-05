import React from 'react';
import { useState } from 'react';
import { Row, Col, Badge, Card, Form, Button, Table, Modal, CloseButton, Spinner } from 'react-bootstrap';
import priority from './../../../src/views/contact/service/getPriority';
import ActiveButton from './../../components/Elements/ActiveButton';
import EditButton from './EditButton';

const TableContact = ({ list, loading, itemsPerPage, currentPage }) => {
    const [modalShow, setModalShow] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);    
    if (loading) {
        return (
            <Row className="justify-content-md-center">
                <Spinner animation="border" variant="primary" size='sm' />
            </Row>
        );    
    }
    const getContact = {
        "count": 1,
        "next": null,
        "previous": null,
        "results": [
            {
                "url": "http://localhost:8000/api/contact/57/",
                "created": "2021-12-07T14:48:44.564000Z",
                "modified": "2021-12-07T14:48:44.575000Z",
                "name": "Soporte CERT",
                "username": "soporte@cert.unlp.edu.ar",
                "public_key": null,
                "type": "email",
                "role": "administrative",
                "priority": "http://localhost:8000/api/administration/priority/6/"
            }
        ]
    }

    let type = getContact.results[0].type;
    let first = type.charAt(0).toUpperCase();
    type = first+type.slice(1)

    return (
            <React.Fragment>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Activo</th>
                            <th>Contacto</th>
                            <th>Creado</th>
                            <th>Modificado</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((contact, index) => {
                            let id = contact.url.split('/')[(contact.url.split('/')).length-2];
                            //(itemsPerPage*(currentPage-1)) + index +1
                            return (
                                <tr key={id}>
                                <th scope="row">{id}</th>
                                <td>{contact.name}</td>
                                <td>
                                    <ActiveButton state={Math.round(Math.random())}></ActiveButton>?
                                </td>
                                <td>{contact.username}</td>
                                <td>{contact.created.slice(0, 10)}</td>
                                <td>{contact.modified.slice(0, 10)}</td>
                                <td>
                                <Button className="btn-icon btn-rounded" variant='outline-primary' title='Detalle' onClick={() => setModalShow(true)}>
                                    <i className='fas fa-eye'/>
                                </Button>
                                <EditButton link='/contact/edit'/>
                                <Button className="btn-icon btn-rounded" variant='outline-danger' title='Eliminar' onClick={() => setModalDelete(true)}>
                                    <i className='fas fa-trash-alt'/>
                                </Button>
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
                                        <Col sm={12} lg={4}>                       
                                            <Button title='Editar' className="btn-icon btn-rounded" variant='outline-warning' href='/contact/edit'>
                                                <i className='fas fa-edit'/>
                                            </Button>
                                            <ActiveButton state={Math.round(Math.random())}></ActiveButton>                              
                                            <CloseButton aria-label='Cerrar' onClick={() => setModalShow(false)} />
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    <Table responsive >
                                        <tr>
                                            <td>Id del sistema</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={1} />
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Nombre</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={getContact.results[0].name} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>{type}</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={getContact.results[0].username} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Fecha de creación</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={getContact.results[0].created} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ultima actualización</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={getContact.results[0].modified} />
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
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col> 
                    </Row>
                </Modal.Body>
            </Modal>

            <Modal show={modalDelete} onHide={() => setModalDelete(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Contacto</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Corfirma la eliminación del Id {1}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => setModalDelete(false)}>
                        Cancelar
                    </Button>
                    <Button variant="outline-danger" onClick={() => setModalDelete(false)}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment> 
  );
};

export default TableContact