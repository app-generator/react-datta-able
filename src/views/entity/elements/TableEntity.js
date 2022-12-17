import React from 'react';
import { useState } from 'react';
import { Row, Col, Badge, Card, Form, Button, Table, Modal, CloseButton, Spinner } from 'react-bootstrap';

const TableEntity = ({ listEntity, loading, entitiesPerPage, currentPage }) => {
    const [modalShow, setModalShow] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);

    const entity = {
        "count": 2,
        "next": null,
        "previous": null,
        "results": [
            {
                "url": "http://localhost:8000/api/entity/19627/",
                "created": "2022-12-11T22:10:15.281136Z",
                "modified": "2022-12-11T22:10:15.281136Z",
                "name": "UNLP2",
                "slug": "unlp2",
                "active": 0
            },
            {
                "url": "http://localhost:8000/api/entity/19626/",
                "created": "2020-04-16T13:09:25Z",
                "modified": "2020-04-16T13:09:25Z",
                "name": "Universidad Nacional de La Plata",
                "slug": "universidad_nacional_de_la_plata",
                "active": 1
            }
        ]
    }
        let array = entity.results[0].url.split('/');
        let a = array.length;
        let id = array[a-2];

    if (loading) {
        return (
            <Row className="justify-content-md-center">
                <Spinner animation="border" variant="primary" size='sm' />
            </Row>
        );    
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
                        {listEntity.map((museo, index) => {
                            return (
                                /*console.log(data),*/
                                <tr key={museo.id}>
                                <th scope="row">{(entitiesPerPage*(currentPage-1)) + index +1}</th>
                                <td>{museo.nombre}</td>
                                <td>
                                <Button className="btn-icon btn-rounded" variant='outline-success' title='Activo'>
                                    <i className='feather icon-check-circle'/>
                                </Button>
                                </td>
                                <td>{museo.direccion}</td>
                                <td>{museo.telefono}</td>
                                <td>
                                <Button className="btn-icon btn-rounded" variant='outline-primary' title='Detalle' onClick={() => setModalShow(true)}>
                                    <i className='fas fa-eye'/>
                                </Button>
                                <Button className="btn-icon btn-rounded" variant='outline-warning' title='Editar' href='/entity/edit'>
                                    <i className='fas fa-edit'/>
                                </Button>
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
                                            <Card.Title as="h5">Entidades</Card.Title>
                                            <span className="d-block m-t-5">Detalle de entidad</span>
                                        </Col>
                                        <Col sm={12} lg={4}>                       
                                            <Button title='Editar' className="btn-icon btn-rounded" variant='outline-warning' href='/entity/edit'>
                                                <i className='fas fa-edit'/>
                                            </Button>
                                            <Button title='Activo' className="btn-icon btn-rounded" variant='outline-success' >
                                                <i className='feather icon-check-circle'/>
                                            </Button>                               
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
                                                <Form.Control plaintext readOnly defaultValue={entity.results[0].name} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Fecha de creación</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={entity.results[0].created} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ultima actualización</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={entity.results[0].modified} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Informacion Relacionada</td>
                                            <td>
                                                <Button size="sm" variant='light' className="text-capitalize">
                                                    Network
                                                <Badge variant="light" className="ml-1">4</Badge>
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
                <Modal.Body>¿Corfirma la eliminación?</Modal.Body>
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