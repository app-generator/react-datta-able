import React from 'react';
import { Row, Col, Card, Table, Button, Breadcrumb } from 'react-bootstrap';
import AddButton from './components/AddButton';
import Search from './components/Search';
import ViewButtonModal from './components/ViewButtonModal';
import DeleteButtonModal from './components/DeleteButtonModal';


const ListFeeds = () => {    
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
                                            <Button title='Activo' className="btn-icon btn-rounded" variant={'outline-success'} >
                                                <i className='fas fa-check mx-1'/>
                                            </Button>                                            
                                        </td>
                                        <td></td>
                                        <td>2019-04-08T11:41:41Z</td>
                                        <td>2019-04-08T11:41:41Z</td>                                        
                                        <td>
                                            <ViewButtonModal></ViewButtonModal>
                                            <Button title='Editar' className="btn-icon btn-rounded" variant={'outline-warning'} href="./feeds/edit" >
                                                <i className='fas fa-edit mx-1'/>
                                            </Button>
                                            <DeleteButtonModal></DeleteButtonModal>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Dorkbot</td>
                                        <td>
                                            <Button title='Activo' className="btn-icon btn-rounded" variant={'outline-success'} >
                                                <i className='fas fa-check mx-1'/>
                                            </Button>
                                        </td>
                                        <td></td>
                                        <td>2019-04-01T14:53:08Z</td>
                                        <td>2019-04-01T14:53:08Z</td>                                        
                                        <td>
                                            <ViewButtonModal></ViewButtonModal>
                                            <Button title='Editar' className="btn-icon btn-rounded" variant={'outline-warning'}  href="./feeds/edit" >
                                                <i className='fas fa-edit mx-1'/>
                                            </Button>
                                            <DeleteButtonModal></DeleteButtonModal>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Have I Been Pwned</td>
                                        <td>
                                            <Button title='Inactivo' className="btn-icon btn-rounded" variant={'outline-danger'} >
                                                <i className='fas fa-ban mx-1'/>
                                            </Button>
                                        </td>
                                        <td></td>
                                        <td>2019-04-01T15:25:12Z</td>
                                        <td>2019-04-01T15:25:12Z</td>                                        
                                        <td>
                                            <ViewButtonModal></ViewButtonModal>
                                            <Button title='Editar' className="btn-icon btn-rounded" variant={'outline-warning'} href="./feeds/edit" >
                                                <i className='fas fa-edit mx-1'/>
                                            </Button>
                                            <DeleteButtonModal></DeleteButtonModal>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Shadowserver</td>
                                        <td>
                                            <Button title='Activo' className="btn-icon btn-rounded" variant={'outline-success'} >
                                                <i className='fas fa-check mx-1'/>
                                            </Button>
                                        </td>
                                        <td></td>
                                        <td>2019-03-22T16:21:24Z</td>
                                        <td>2019-03-22T16:21:24Z</td>                                       
                                        <td>
                                            <ViewButtonModal></ViewButtonModal>
                                            <Button title='Editar' className="btn-icon btn-rounded" variant={'outline-warning'} href="./feeds/edit" >
                                                <i className='fas fa-edit mx-1'/>
                                            </Button>
                                            <DeleteButtonModal></DeleteButtonModal>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>            
        </React.Fragment>
    );
};

export default ListFeeds;
