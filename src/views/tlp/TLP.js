import React from 'react';
import { Row, Col, Card, Table, Button, Breadcrumb } from 'react-bootstrap';

const ListFeeds = () => {    
    return (
        <React.Fragment>
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href='/app/dhasboard/default'>
                        <i className="fas fa-home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href='#'>
                        Protocolo de Semaforo
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
                                <Col>
                                    <React.Fragment>
                                        <div id="main-search" className='open'>
                                            <div className="input-group">
                                                <input type="text" id="m-search" className="form-control" placeholder="Buscar protocolo de semaforo . . ." />
                                                <span className="search-btn btn btn-primary" >
                                                    <i className="fas fa-search " />
                                                </span>
                                            </div>
                                        </div>
                                    </React.Fragment>                           
                                </Col>                                  
                            </Row>                                                                           
                        </Card.Header>
                        <Card.Body>                            
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Informacion</th>
                                        <th>Descripcion</th>
                                        <th>Creado</th>
                                        <th>Modificado</th>                                        
                                        <th>Ver</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td><p class="p-3 mb-2 bg-dark text-white">White</p></td>
                                        <td>TLP:WHITE</td>
                                        <td>Disclosure is not limited.</td>
                                        <td>2019-04-08T11:41:41Z</td>
                                        <td>2019-04-08T11:41:41Z</td>                                        
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant={'outline-primary'} href="./feeds/view" >
                                                <i className='fas fa-eye mx-1'/>
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                    <th scope="row">2</th>
                                        <td><p p class="p-3 mb-2 bg-success text-white">Green</p></td>
                                        <td>TLP:GREEN</td>
                                        <td>Limited disclosure, restricted to the community.</td>
                                        <td>2019-04-08T11:41:41Z</td>
                                        <td>2019-04-08T11:41:41Z</td>                                        
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant={'outline-primary'} href="./feeds/view" >
                                                <i className='fas fa-eye mx-1'/>
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td><p class="p-3 mb-2 bg-warning text-dark">Amber</p></td>
                                        <td>TLP:AMBER</td>
                                        <td>Limited disclosure, restricted to participants organizations.</td>
                                        <td>2019-04-08T11:41:41Z</td>
                                        <td>2019-04-08T11:41:41Z</td>                                        
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant={'outline-primary'} href="./feeds/view" >
                                                <i className='fas fa-eye mx-1'/>
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                    <th scope="row">4</th>
                                        <td><p class="p-3 mb-2 bg-danger text-white">Red</p></td>
                                        <td>TLP:RED</td>
                                        <td>Not for disclosure, restricted to participants only.</td>
                                        <td>2019-04-08T11:41:41Z</td>
                                        <td>2019-04-08T11:41:41Z</td>                                        
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant={'outline-primary'} href="./feeds/view" >
                                                <i className='fas fa-eye mx-1'/>
                                            </Button>
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