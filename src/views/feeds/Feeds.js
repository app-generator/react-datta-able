import React, { useState } from 'react';
import { Row, Col, Card, Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const BootstrapTable = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <React.Fragment>
            <Row>
                <Col>             
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Fuentes de Informacion</Card.Title>
                            <span className="d-block m-t-5">
                               Listado de Fuentes de Informacion                            
                            </span>  
                            <Button className="btn-icon btn-rounded" variant={'outline-primary'} >
                                <i className='feather icon-plus mx-1'/>
                            </Button>                                                     
                        </Card.Header>
                        <Card.Body>                            
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Activo</th>
                                        <th>Descripcion</th>
                                        <th>Creado</th>
                                        <th>Modificado</th>                                        
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Americas</td>
                                        <td>
                                            <Link to="/app/feeds/new">
                                                <Button className="btn-icon btn-rounded" variant={'outline-success'} >
                                                    <i className='feather icon-check mx-1'/>
                                                </Button>
                                            </Link>                                            
                                        </td>
                                        <td></td>
                                        <td>2019-04-08T11:41:41Z</td>
                                        <td>2019-04-08T11:41:41Z</td>                                        
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant={'outline-primary'} >
                                                <i className='feather icon-eye mx-1'/>
                                            </Button>
                                            <Button className="btn-icon btn-rounded" variant={'outline-warning'} >
                                                <i className='feather icon-edit mx-1'/>
                                            </Button>
                                            <Button className="btn-icon btn-rounded" variant={'outline-danger'} onClick={handleShow} >
                                                <i className='feather icon-trash mx-1'/>
                                            </Button>                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Dorkbot</td>
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant={'outline-success'} >
                                                <i className='feather icon-check mx-1'/>
                                            </Button>
                                        </td>
                                        <td></td>
                                        <td>2019-04-01T14:53:08Z</td>
                                        <td>2019-04-01T14:53:08Z</td>                                        
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant={'outline-primary'} >
                                                <i className='feather icon-eye mx-1'/>
                                            </Button>
                                            <Button className="btn-icon btn-rounded" variant={'outline-warning'} >
                                                <i className='feather icon-edit mx-1'/>
                                            </Button>
                                            <Button className="btn-icon btn-rounded" variant={'outline-danger'} onClick={handleShow} >
                                                <i className='feather icon-trash mx-1'/>
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Have I Been Pwned</td>
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant={'outline-danger'} >
                                                <i className='feather icon-slash mx-1'/>
                                            </Button>
                                        </td>
                                        <td></td>
                                        <td>2019-04-01T15:25:12Z</td>
                                        <td>2019-04-01T15:25:12Z</td>                                        
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant={'outline-primary'} >
                                                <i className='feather icon-eye mx-1'/>
                                            </Button>
                                            <Button className="btn-icon btn-rounded" variant={'outline-warning'} >
                                                <i className='feather icon-edit mx-1'/>
                                            </Button>
                                            <Button className="btn-icon btn-rounded" variant={'outline-danger'} onClick={handleShow} >
                                                <i className='feather icon-trash mx-1'/>
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Shadowserver</td>
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant={'outline-success'} >
                                                <i className='feather icon-check mx-1'/>
                                            </Button>
                                        </td>
                                        <td></td>
                                        <td>2019-03-22T16:21:24Z</td>
                                        <td>2019-03-22T16:21:24Z</td>                                       
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant={'outline-primary'} >
                                                <i className='feather icon-eye mx-1'/>
                                            </Button>
                                            <Button className="btn-icon btn-rounded" variant={'outline-warning'} >
                                                <i className='feather icon-edit mx-1'/>
                                            </Button>
                                            <Button className="btn-icon btn-rounded" variant={'outline-danger'} onClick={handleShow} >
                                                <i className='feather icon-trash mx-1'/>
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar fuente de informacion</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Corfirma la eliminación?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="outline-danger" onClick={handleClose}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default BootstrapTable;
