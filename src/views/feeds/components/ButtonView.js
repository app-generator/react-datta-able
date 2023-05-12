import React, { useState, useEffect } from 'react';
import { Row, Col, Badge, Card, Form, Button, Table, Modal, CloseButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CrudButton from '../../../components/Button/CrudButton';
import ActiveButton from '../../../components/Button/ActiveButton';

function ButtonView({feed}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [created, setCreated] = useState(null) 
  const [modified, setModified] = useState(null) 

  useEffect(() => {
    let datetime = feed.created.split('T')
    setCreated(datetime[0] + ' ' + datetime[1].slice(0,8))
    datetime = feed.modified.split('T');
    setModified(datetime[0] + ' ' + datetime[1].slice(0,8))
  }, [feed]);

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
                                    <Col sm={12} lg={2}>
                                        <Link to={{pathname:"./feeds/edit", state:feed}} >
                                            <CrudButton type="edit" />
                                        </Link>
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
                                        <td>Activo</td>
                                        <td>
                                            <ActiveButton active={feed.active} />
                                        </td>
                                    </tr>
                                    { (feed.description == undefined) ? '' : 
                                            <tr>
                                                <td>Descripcion</td>
                                                <td>
                                                    <Form.Control style={{resize:"none"}} as="textarea" rows={3} plaintext readOnly defaultValue={feed.description} />
                                                </td>
                                            </tr>

                                    }                                     
                                    <tr>
                                        <td>Informacion Relacionada</td>
                                        <td>
                                            <Button size="sm" variant='light' className="text-capitalize">
                                                Incidentes
                                                <Badge variant="light" className="ml-1">24256</Badge>
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Creación</td>
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