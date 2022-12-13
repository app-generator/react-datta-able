import React, { useState } from 'react';
import { Row, Col, Card, Table, Button, Modal, Breadcrumb } from 'react-bootstrap';
import AddButton from './components/AddButton';
import Search from './components/Search';



const ListFeeds = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <React.Fragment>
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href='/app/dhasboard/default'>
                        <i className="fas fa-home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href='#'>
                        Fuentes de Informacion
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href='#' active>
                        Listado 
                    </Breadcrumb.Item>
                </Breadcrumb>    
            </Row>
            <Row>
                <Col>             
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col sm={12} lg={9}>
                                    <Search></Search>                            
                                </Col> 
                                <Col sm={12} lg={3}>
                                    <AddButton></AddButton>                            
                                </Col>  
                            </Row>                                                                           
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
                                            <Button className="btn-icon btn-rounded" variant={'outline-success'} >
                                                <i className='fas fa-check mx-1'/>
                                            </Button>                                            
                                        </td>
                                        <td></td>
                                        <td>2019-04-08T11:41:41Z</td>
                                        <td>2019-04-08T11:41:41Z</td>                                        
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant={'outline-primary'} href="./feeds/view" >
                                                <i className='fas fa-eye mx-1'/>
                                            </Button>
                                            <Button className="btn-icon btn-rounded" variant={'outline-warning'} href="./feeds/edit" >
                                                <i className='fas fa-edit mx-1'/>
                                            </Button>
                                            <Button className="btn-icon btn-rounded" variant={'outline-danger'} onClick={handleShow} >
                                                <i className='fas fa-trash-alt mx-1'/>
                                            </Button>                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Dorkbot</td>
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant={'outline-success'} >
                                                <i className='fas fa-check mx-1'/>
                                            </Button>
                                        </td>
                                        <td></td>
                                        <td>2019-04-01T14:53:08Z</td>
                                        <td>2019-04-01T14:53:08Z</td>                                        
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant={'outline-primary'} href="./feeds/view" >
                                                <i className='fas fa-eye mx-1'/>
                                            </Button>
                                            <Button className="btn-icon btn-rounded" variant={'outline-warning'}  href="./feeds/edit" >
                                                <i className='fas fa-edit mx-1'/>
                                            </Button>
                                            <Button className="btn-icon btn-rounded" variant={'outline-danger'} onClick={handleShow} >
                                                <i className='fas fa-trash-alt mx-1'/>
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Have I Been Pwned</td>
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant={'outline-danger'} >
                                                <i className='fas fa-ban mx-1'/>
                                            </Button>
                                        </td>
                                        <td></td>
                                        <td>2019-04-01T15:25:12Z</td>
                                        <td>2019-04-01T15:25:12Z</td>                                        
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant={'outline-primary'} href="./feeds/view" >
                                                <i className='fas fa-eye mx-1'/>
                                            </Button>
                                            <Button className="btn-icon btn-rounded" variant={'outline-warning'} href="./feeds/edit" >
                                                <i className='fas fa-edit mx-1'/>
                                            </Button>
                                            <Button className="btn-icon btn-rounded" variant={'outline-danger'} onClick={handleShow} >
                                                <i className='fas fa-trash-alt mx-1'/>
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Shadowserver</td>
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant={'outline-success'} >
                                                <i className='fas fa-check mx-1'/>
                                            </Button>
                                        </td>
                                        <td></td>
                                        <td>2019-03-22T16:21:24Z</td>
                                        <td>2019-03-22T16:21:24Z</td>                                       
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant={'outline-primary'} href="./feeds/view" >
                                                <i className='fas fa-eye mx-1'/>
                                            </Button>
                                            <Button className="btn-icon btn-rounded" variant={'outline-warning'} href="./feeds/edit" >
                                                <i className='fas fa-edit mx-1'/>
                                            </Button>
                                            <Button className="btn-icon btn-rounded" variant={'outline-danger'} onClick={handleShow} >
                                                <i className='fas fa-trash-alt mx-1'/>
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
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

export default ListFeeds;
