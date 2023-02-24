import React, { useState } from 'react';
import { Row, Col, Badge, Card, Form, Button, Table, Modal, CloseButton } from 'react-bootstrap';
import CrudButton from '../../../components/Button/CrudButton';

function ButtonView({feed}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <CrudButton type='read' onClick={handleShow} />
        <Modal size='lg' show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>            
            <Modal.Body>
                <Row>    
                    <Col>                 
                        <Card>
                            <Card.Header> 
                                <Row>
                                    <Col>
                                        <Card.Title as="h5">Fuentes de Informacion</Card.Title>
                                        <span className="d-block m-t-5">Detalle de fuente de informacion</span>
                                    </Col>
                                    <Col sm={12} lg={4}>
                                        <CloseButton aria-label='Cerrar' onClick={handleClose} />
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive >
                                    <tr>
                                        <td>Id del sistema</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={feed.slug}/>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Nombre</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={feed.name} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Estado</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={feed.active ? "Activo" : "Inactivo"} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Descripcion</td>
                                        <td>
                                            <Form.Control style={{resize:"none"}} as="textarea" rows={3} plaintext readOnly defaultValue={feed.description} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fecha de creación</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={feed.created.slice(0,10)} />
                                        </td>
                                    </tr>
                                     <tr>
                                        <td>Ultima actualización</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={feed.modified.slice(0,10)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Informacion Relacionada</td>
                                        <td>
                                            <Button size="sm" variant='light' className="text-capitalize">
                                                Incidentes
                                                <Badge variant="light" className="ml-1">24256</Badge>
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
    </>
  );
}

export default ButtonView;