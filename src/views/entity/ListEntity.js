import React from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import ActionButton from './elements/ActionButton';
import AddButton from './elements/AddButton';
import Search from './elements/Search';
import StateButton from './elements/StateButton';

const listEntity = () => {    

    return (
        <React.Fragment>
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
                                        <th>Creado</th>
                                        <th>Modificado</th>
                                        <th>Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>@mdo</td>
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant='outline-success' title='Activo'>
                                                <i className='feather icon-check-circle'/>
                                            </Button>
                                        </td>
                                        <td>22/10/2022</td>
                                        <td>22/11/2022</td>
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant='outline-primary' title='Detalle' href='/entity/show'>
                                                <i className='fas fa-eye'/>
                                            </Button>
                                            <Button className="btn-icon btn-rounded" variant='outline-warning' title='Editar' href='/entity/edit'>
                                                <i className='fas fa-edit'/>
                                            </Button>
                                            <Button className="btn-icon btn-rounded" variant='outline-danger' title='Eliminar'>
                                                <i className='fas fa-trash-alt'/>
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>@mdo</td>
                                        <td><StateButton></StateButton></td>
                                        <td>22/10/2022</td>
                                        <td>22/11/2022</td>
                                        <td><ActionButton></ActionButton></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>@mdo</td>
                                        <td><StateButton></StateButton></td>
                                        <td>22/10/2022</td>
                                        <td>22/11/2022</td>
                                        <td><ActionButton></ActionButton></td>
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

export default listEntity;
