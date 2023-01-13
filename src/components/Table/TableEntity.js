import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Badge, Card, Form, Button, Table, Modal, CloseButton, Spinner } from 'react-bootstrap';
import ActiveButton from '../Button/ActiveButton';
import CrudButton from '../Button/CrudButton';
import { getEntity, isActive, putEntity, deleteEntity } from '../../api/services/entities';
import DeleteAlert from '../Alert/DeleteAlert'

const TableEntity = ({ list, loading }) => {
    const [entity, setEntity] = useState('');
    const [array, setArray] = useState(list);
    const [error, setError] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [created, setCreated] = useState(null);
    const [modified, setModified] = useState(null);
    const [state,setState] = useState(null);
    const [alert,setAlert] = useState(null);

    useEffect(() => {

    },[]);
    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    }

    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type
        })
        setTimeout(() => {
            return window.location.reload();
        }, 5000)

    }
    
    const showEntity = (key)=> {
        setId(key)
        setEntity('')
        getEntity(key)
        .then((response) => {
            setEntity(response.data)
            let datetime = response.data.created.split('T')
            setCreated(datetime[0] + ' ' + datetime[1].slice(0,8))
            datetime = response.data.modified.split('T');
            setModified(datetime[0] + ' ' + datetime[1].slice(0,8))
            setState(response.data.active)
            setModalShow(true)
        })
        .catch(setError);
    };
    const Delete = (key, name) => {
        setId(key);
        setName(name);
        setModalDelete(true)
    }
    const removeEntity = (key)=> {
        deleteEntity(key).then((response) => {
            console.log(response)
            //setArray(array.filter(item => item.name != name)
            setModalDelete(false)
            showAlert('La entidad ha sido eliminada', 'success')
            ///
        })
        .catch(setError);
    };
        if (error) {
            console.log(error);
            showAlert('Ha ocurrido un error', 'danger')
        }

    return (
            <React.Fragment>
                <DeleteAlert alert={alert}/>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Activo</th>
                            <th>Creado</th>
                            <th>Modificado</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((entity, index) => {
                            let url = entity.url.split('/')[(entity.url.split('/')).length-2];

                            return (
                                <tr key={url}>
                                    <th scope="row">{index+1}</th>
                                    <td>{entity.name}</td>
                                    <td>
                                        <ActiveButton active={entity.active} id={url} onClick={() => setModalState(true)} />
                                    </td>
                                    <td>{entity.created.slice(0,10)}</td>
                                    <td>{entity.modified.slice(0,10)}</td>
                                    <td>
                                        <CrudButton type='read' onClick={() => showEntity(url)} />
                                        <CrudButton type='edit' link='/entity/edit'/>
                                        <CrudButton type='delete' onClick={() => Delete(url, entity.name)} />
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
                                            <Card.Title as="h5">Entidades</Card.Title>
                                            <span className="d-block m-t-5">Detalle de entidad</span>
                                        </Col>
                                        <Col sm={12} lg={3}>                       
                                            <CrudButton type='edit' link='/entity/edit'/>
                                            <ActiveButton id={id} active={state} onClick={() => setModalState(true)} />
                                            <CloseButton aria-label='Cerrar' onClick={() => setModalShow(false)} />
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    <Table responsive >
                                        <tr>
                                            <td>Id del sistema</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={id} />
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Nombre</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={entity.name} />
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
                                            <td>Informacion Relacionada</td>
                                            <td>
                                                <Button size="sm" variant='light' className="text-capitalize">
                                                    Network <Badge variant="light" className="ml-1">4</Badge>
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
                    <Modal.Title>Eliminar Entidad</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Desea eliminar {name}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={() => removeEntity(id)}>
                        Eliminar
                    </Button>
                    <Button variant="outline-secondary" onClick={() => setModalDelete(false)}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={modalState} onHide={() => setModalState(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Estado de la entidad</Modal.Title>
                </Modal.Header>
                <Modal.Body>Desea activar/desactivar la entidad de Id {id}?</Modal.Body>
                <Modal.Footer centered>
                    <Button variant="outline-primary" onClick={() => setModalState(false)}>
                        Activar/desactivar
                    </Button>

                    <Button variant="outline-secondary" onClick={() => setModalDelete(false)}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment> 
  );
};

export default TableEntity;