import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Badge, Card, Form, Button, Table, Modal, CloseButton, Spinner } from 'react-bootstrap';
import ActiveButton from './../../components/Elements/ActiveButton';
import CrudButton from './CrudButton';
import { getEntity } from '../../api/services/entities';

const TableEntity = ({ list, loading }) => {
    const [entity, setEntity] = useState('');
    const [error, setError] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [id, setId] = useState(null);
    const [created, setCreated] = useState(null);
    const [modified, setModified] = useState(null);

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
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
            setModalShow(true)
        })
        .catch(setError);
    };
        if (error) {
            console.log(error);
            return <p>Ups! Se produjo un error al buscar la entidad.</p>
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
                            <th>Activo</th>
                            <th>Creado</th>
                            <th>Modificado</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((entity) => {
                            let id = entity.url.split('/')[(entity.url.split('/')).length-2];
                            return (
                                <tr key={id}>
                                <th scope="row">{id}</th>
                                <td>{entity.name}</td>
                                <td>
                                    <ActiveButton state={entity.active}></ActiveButton>
                                </td>
                                <td>{entity.created.slice(0,10)}</td>
                                <td>{entity.modified.slice(0,10)}</td>
                                <td>
                                    <CrudButton type='read' onClick={() => showEntity(id)} />
                                    <CrudButton type='edit' link='/entity/edit'/>
                                    <CrudButton type='delete' onClick={() => setModalDelete(true)} />
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
                                        <Col sm={12} lg={4}>                       
                                            <CrudButton type='edit' link='/entity/edit'/>
                                            <ActiveButton state={entity.active}></ActiveButton>                               
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
                <Modal.Body>¿Corfirma la eliminación del Id {id}?</Modal.Body>
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

export default TableEntity;