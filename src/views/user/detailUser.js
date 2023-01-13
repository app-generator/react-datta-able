import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown,
     Badge, Breadcrumb,  Table } from 'react-bootstrap';
import {Link} from 'react-router-dom'


const DetailUser = () => {


    
    return (
        <>
          <h3 className="title-theme-color">Detalle de un usuario </h3>
             

        <Row>
                <Breadcrumb>
                <Breadcrumb.Item href="./app/dashboard/default">
                        <i className="feather icon-home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="./list-user">
                        <i className="fas fa-network-wired" /> Usuarios
                    </Breadcrumb.Item>
                    <Breadcrumb.Item as={Link} to="#" active>
                        Detalle
                    </Breadcrumb.Item>
                </Breadcrumb>    
            </Row>
            <Row>    
                <Col>                 
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col>
                                <Card.Title as="h5">Usuario</Card.Title>
                                <span className="d-block m-t-5">Detalle</span>
                                </Col>
                                <Col>                       
                                    <Button title='Editar' className="btn-icon btn-rounded" variant='outline-warning' href='/add-user'>
                                        <i className='fas fa-edit'/>
                                    </Button>
                                    <Button title='Activo' className="btn-icon btn-rounded" variant='outline-success' >
                                        <i className='feather icon-check-circle'/>
                                    </Button>
                                </Col>
                            </Row>         
                        </Card.Header>
                        <Card.Body>
                            <Table responsive >
                                    <tr>
                                        <td>Id del sistema</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={1} />
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Nombre de Usuario</td>
                                        <td>
                                            {/*</tr><Form.Control plaintext readOnly defaultValue={entity.results[0].name} /> */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Nombre</td>
                                        <td>
                                            {/*</tr><Form.Control plaintext readOnly defaultValue={entity.results[0].name} /> */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ultima vez que inicio cesion</td>
                                        <td>
                                            {/*<Form.Control plaintext readOnly defaultValue={entity.results[0].created} />*/}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Creado el</td>
                                        <td>
                                            {/*<Form.Control plaintext readOnly defaultValue={entity.results[0].created} />*/}
                                        </td>
                                    </tr>
                                    <tr>
                                    <td>Ultima actualización</td>
                                        <td>
                                            {/*<Form.Control plaintext readOnly defaultValue={entity.results[0].modified} />*/}
                                        </td>
                                    </tr>
                                    <tr>
                                    <td>Informacion Relacionada</td>
                                        <td>
                                        <Button size="sm" variant='light' className="text-capitalize">
                                            Incidentes
                                            <Badge variant="light" className="ml-1">4</Badge>
                                        </Button>

                                        
                                        <Button size="sm" variant='light' className="text-capitalize">
                                                Incidentes asignados
                                        <Badge variant="light" className="ml-1">4</Badge>
                                        </Button>

                                        </td>
                                        
                                        
                                        
                                        
                                    </tr>

                            </Table>
                        </Card.Body>
                    </Card>
                    <Button variant="primary" href='/list-user'>Volver</Button>
                </Col> 
            </Row>

            
        </>
    )
}

export default DetailUser