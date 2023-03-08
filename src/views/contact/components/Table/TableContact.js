import React, { useState } from 'react';
import { Row, Col, Badge, Card, Form, Button, Table, Modal, CloseButton, Spinner } from 'react-bootstrap';
import CrudButton from '../../../../components/Button/CrudButton';
import { getContact, deleteContact } from '../../../../api/services/contacts';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../../../components/Modal/ModalConfirm';
import PriorityButton from '../../../../components/Button/PriorityButton';

const TableContact = ({callback, list, loading }) => {
    const [contact, setContact] = useState('')
    const [error, setError] = useState(null)
    const [modalShow, setModalShow] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [url, setUrl] = useState(null)
    const [id, setId] = useState(null)
    const [name, setName] = useState(null);
    const [created, setCreated] = useState(null)
    const [modified, setModified] = useState(null)
    const [type, setType] = useState(null)
    const [role, setRole] = useState(null)

    const [lastItem, setLastItem] = useState(null);

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    } 

    //Read Contact
    const showContact = (url)=> {
        setId(url.split('/')[(url.split('/')).length-2]);
        setUrl(url)
        setContact('')
        getContact(url)
        .then((response) => {
            setContact(response.data)
            let datetime = response.data.created.split('T')
            setCreated(datetime[0] + ' ' + datetime[1].slice(0,8))
            datetime = response.data.modified.split('T');
            setModified(datetime[0] + ' ' + datetime[1].slice(0,8))
            let rol = labelRole[response.data.role];
            setRole(rol)
            setType(Upper(response.data.type))
            setModalShow(true)
        })
        .catch(setError);
    };

    //Remove Contact
    const Delete = (url, name) => {
        setLastItem(list.length === 1)
        setUrl(url);
        setName(name);
        setModalDelete(true)
    }

    const removeContact = (url)=> {
        deleteContact(url)
            .then((response) => {
                console.log(response)
                callback(lastItem)
            })
            .catch((error) => {
                console.log(error)
                setError(error)
                callback(false) //error si no se puede eliminar el ultimo
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

    const labelRole =
    {
        technical : 'Tecnico',
        administrative : 'Administrativo',
        abuse : 'Abuso',
        notifications : 'Notificaciones',
        noc : 'NOC',
    };

    return (
            <React.Fragment>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Rol</th>
                            <th>Contacto</th>
                            <th>Prioridad</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((contact, index) => {
                            return (
                                <tr key={contact.url}>
                                <th scope="row">{index+1}</th>
                                <td>{contact.name}</td>
                                <td>{labelRole[contact.role]}</td>
                                <td>{contact.username}</td>
                                <td><PriorityButton url={contact.priority}/></td>
                                <td>
                                    <CrudButton type='read' onClick={() => showContact(contact.url)} />
                                    <Link to={{pathname:'/contact/edit', state: contact}} >
                                        <CrudButton type='edit'/>
                                    </Link>
                                    <CrudButton type='delete' onClick={() => Delete(contact.url, contact.name)} />
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
                                        {contact.public_key ? 
                                            <tr>
                                                <td>Llave pública</td>
                                                <td>
                                                    <Form.Control plaintext readOnly defaultValue={contact.public_key} />
                                                </td>
                                            </tr>
                                            : 
                                            <></>
                                        }
                                        <tr>
                                            <td>Informacion Relacionada</td>
                                            <td>
                                                <Button size="sm" variant='light' className="text-capitalize">
                                                    Redes
                                                <Badge variant="light" className="ml-2">4</Badge>
                                                </Button>
                                                <Button size="sm" variant='light' className="text-capitalize">
                                                    Prioridad&nbsp;
                                                <PriorityButton url={contact.priority}/>
                                                </Button>
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
                                    </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col> 
                    </Row>
                </Modal.Body>
            </Modal>
            <ModalConfirm type='delete' component='Contacto' name={name} showModal={modalDelete} onHide={() => setModalDelete(false)} ifConfirm={() => removeContact(url)}/>
        </React.Fragment> 
  );
};

export default TableContact;
