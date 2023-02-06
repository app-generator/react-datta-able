import React from 'react';
import { Row, Col, Badge, Breadcrumb, Card, Form, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const ShowEntity = () => {
    const entity = {
        "count": 4,
        "next": null,
        "previous": null,
        "results": [
            {
                "url": "http://localhost:8000/api/entity/19626/",
                "created": "2020-04-16T13:09:25Z",
                "modified": "2020-04-16T13:09:25Z",
                "name": "Universidad Nacional de La Plata",
                "slug": "universidad_nacional_de_la_plata",
                "active": 1
            }
        ]
    };
    let array = entity.results[0].url.split('/');
    let a = array.length;
    let id = array[a-2];
    
    

    return (
        <React.Fragment>          
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item as={Link} to="#">
                        <i className="fas fa-network-wired" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item as={Link} to='/entity/tables'>
                        Entidades 
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
                                <Card.Title as="h5">Entidades</Card.Title>
                                <span className="d-block m-t-5">Detalle</span>
                                </Col>
                                <Col>                       
                                    <Button title='Editar' className="btn-icon btn-rounded" variant='outline-warning' href='/entity/edit'>
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
                                            <Form.Control plaintext readOnly defaultValue={id} />
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Nombre</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={entity.results[0].name} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fecha de creación</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={entity.results[0].created} />
                                        </td>
                                    </tr>
                                    <tr>
                                    <td>Ultima actualización</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={entity.results[0].modified} />
                                        </td>
                                    </tr>
                                    <tr>
                                    <td>Informacion Relacionada</td>
                                        <td>
                                        <Button size="sm" variant='light' className="text-capitalize">
                                            Network
                                            <Badge variant="light" className="ml-1">4</Badge>
                                        </Button>
                                        </td>
                                    </tr>

                            </Table>
                        </Card.Body>
                    </Card>
                    <Button variant="primary" href="/entity/tables">Volver</Button>
                </Col> 
            </Row>
        </React.Fragment>
    );
}
export default ShowEntity;
