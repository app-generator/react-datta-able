import React, { useState, useEffect } from 'react';
import { Row, Col, Badge, Card, Form, Button, Table, Modal, CloseButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ActiveButton from '../../../components/Button/ActiveButton';
import CrudButton from '../../../components/Button/CrudButton';
import { getTaxonomy } from '../../../api/services/taxonomies';

function ButtonView({taxonomy}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); 
  const [created, setCreated] = useState(null) 
  const [modified, setModified] = useState(null) 
  const [parent, setParent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    taxonomyParent()    
    let datetime = taxonomy.created.split('T')
    setCreated(datetime[0] + ' ' + datetime[1].slice(0,8))
    datetime = taxonomy.modified.split('T');
    setModified(datetime[0] + ' ' + datetime[1].slice(0,8))
  }, [taxonomy]);
  
  const taxonomyParent = ()=> {
    getTaxonomy(taxonomy.parent)
    .then((response) => {
        setParent(response.data.name)               
    })     
    .catch((error) => {
        setError(error);            
    })  
    
  }

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
                                        <Card.Title as="h5">Taxonomia</Card.Title>
                                        <span className="d-block m-t-5">Detalle de taxonomia</span>
                                    </Col>
                                    <Col sm={12} lg={2}>
                                        <Link to={{pathname:"./taxonomy/edit", state:taxonomy}} >
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
                                            <Form.Control plaintext readOnly defaultValue={taxonomy.slug}/>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Nombre</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={taxonomy.name} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Activo</td>
                                        <td>
                                            <ActiveButton active={+taxonomy.active} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tipo</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={taxonomy.type} />
                                        </td>
                                    </tr>
                                    { (taxonomy.description == undefined) ? '' : 
                                            <tr>
                                                <td>Descripcion</td>
                                                <td>
                                                    <Form.Control style={{resize:"none"}} as="textarea" rows={3} plaintext readOnly defaultValue={taxonomy.description} />
                                                </td>
                                            </tr>

                                    }
                                    { (taxonomy.parent == undefined) ? '' :                                                                                                                  
                                        <tr>
                                            <td>Padre</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={parent} />
                                            </td>
                                        </tr>
                                    }                                     
                                    <tr>
                                        <td>Informacion Relacionada</td>
                                        <td>
                                            <Button size="sm" variant='light' className="text-capitalize">
                                                Reportes
                                                <Badge variant="light" className="ml-1">{taxonomy.reports.length}</Badge>
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