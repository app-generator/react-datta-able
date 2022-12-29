import React, { useState } from 'react';
import { Row, Col, Badge, Card, Form, Button, Table, Modal, CloseButton } from 'react-bootstrap';

function ViewButtonModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <Button title='Ver' className="btn-icon btn-rounded" variant={'outline-primary'} onClick={handleShow} >
            <i className='fas fa-eye mx-1'/>
        </Button>
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
                                        <Button title='Editar' className="btn-icon btn-rounded" variant={'outline-warning'} href="./feeds/edit" >
                                            <i className='fas fa-edit mx-1'/>
                                        </Button>
                                        <Button title='Activo' className="btn-icon btn-rounded" variant={'outline-success'} >
                                            <i className='fas fa-check mx-1'/>
                                        </Button>                            
                                        <CloseButton aria-label='Cerrar' onClick={handleClose} />
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive >
                                    <tr>
                                        <td>Id del sistema</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue="abusix" />
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Nombre</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue="Abusix" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Descripcion</td>
                                        <td>
                                            <Form.Control style={{resize:"none"}} as="textarea" rows={3} plaintext readOnly defaultValue="Reportes relacionados  con SPAM de https://abusix.com" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fecha de creación</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue="2019-03-22T16:21:24Z" />
                                        </td>
                                    </tr>
                                     <tr>
                                        <td>Ultima actualización</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue="2019-03-22T16:21:24Z" />
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

export default ViewButtonModal;