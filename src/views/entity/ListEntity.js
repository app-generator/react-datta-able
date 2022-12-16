import React from 'react';
import { Row, Col, Badge, Breadcrumb, Card, Form, Button, Table, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import AddButton from './elements/AddButton';
import CloseButton from 'react-bootstrap/CloseButton';

const ListEntity = () => {
    const url = 'https://www.cultura.gob.ar/api/v2.0/museos/'

    const [data, setData] = useState([])
    const showData = async () => {
        const response = await fetch(url)
        const json = await response.json()
        setData(json.results)
    } 

    //valores ingresados
    const [search, setSearch] = useState("");
    const searcher = (e) => {
        setSearch(e.target.value) //actualizar
        console.log(e.target)    
        }

    //filtro
    let show = []
    if (!search) {
        show = data
    } else {
        show = data.filter( (item) => 
            item.nombre.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

    useEffect( ()=> {
        showData()
    }, [])

    // modal delete
    const [modalShow, setModalShow] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);

    const entity = {
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "url": "http://localhost:8000/api/entity/19627/",
            "created": "2022-12-11T22:10:15.281136Z",
            "modified": "2022-12-11T22:10:15.281136Z",
            "name": "UNLP2",
            "slug": "unlp2",
            "active": 0
        },
        {
            "url": "http://localhost:8000/api/entity/19626/",
            "created": "2020-04-16T13:09:25Z",
            "modified": "2020-04-16T13:09:25Z",
            "name": "Universidad Nacional de La Plata",
            "slug": "universidad_nacional_de_la_plata",
            "active": 1
        }
    ]
}
    let array = entity.results[0].url.split('/');
    let a = array.length;
    let id = array[a-2];

return (
    <React.Fragment>
        <Row>
            <Breadcrumb>
                <Breadcrumb.Item href="./app/dashboard/default">
                    <i className="feather icon-home" />
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <i className="fas fa-network-wired" /> 
                    <b>Entidades</b>
                </Breadcrumb.Item>
            </Breadcrumb>    
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col sm={12} lg={9}>
                                <div id="main-search" className='open'>
                                    <div className="input-group">
                                        <input value={search} onChange={searcher} type="text" id="m-search" className="form-control" placeholder="Buscar entidad . . ." />
                                        <span className="search-btn btn btn-primary">
                                            <i className="feather icon-search " />
                                        </span>
                                    </div>
                                </div>
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
                                {show.map((museo, index) => {
                                    return (
                                        /*console.log(data),*/
                                        <tr key={museo.id}>
                                        <th scope="row">{index +1}</th>
                                        <td>{museo.nombre}</td>
                                        <td>
                                        <Button className="btn-icon btn-rounded" variant='outline-success' title='Activo'>
                                            <i className='feather icon-check-circle'/>
                                        </Button>
                                        </td>
                                        <td>{museo.direccion}</td>
                                        <td>{museo.telefono}</td>
                                        <td>
                                        <Button className="btn-icon btn-rounded" variant='outline-primary' title='Detalle' onClick={() => setModalShow(true)}>
                                            <i className='fas fa-eye'/>
                                        </Button>
                                        <Button className="btn-icon btn-rounded" variant='outline-warning' title='Editar' href='/entity/edit'>
                                            <i className='fas fa-edit'/>
                                        </Button>
                                        <Button className="btn-icon btn-rounded" variant='outline-danger' title='Eliminar' onClick={() => setModalDelete(true)}>
                                            <i className='fas fa-trash-alt'/>
                                        </Button>
                                    </td>
                                    </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

{/*Show Modal*/}
        <Modal size='lg' show={modalShow} onHide={() => setModalShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>            
            <Modal.Body>
                <Row>    
                    <Col>                 
                        <Card>
                            <Card.Header> 
                                <Row>
                                    <Col>
                                        <Card.Title as="h5">Entidades</Card.Title>
                                        <span className="d-block m-t-5">Detalle de entidad</span>
                                    </Col>
                                    <Col sm={12} lg={4}>                       
                                        <Button title='Editar' className="btn-icon btn-rounded" variant='outline-warning' href='/entity/edit'>
                                            <i className='fas fa-edit'/>
                                        </Button>
                                        <Button title='Activo' className="btn-icon btn-rounded" variant='outline-success' >
                                            <i className='feather icon-check-circle'/>
                                        </Button>
                                    
                                        <CloseButton aria-label='Cerrar' onClick={() => setModalShow(false)} />
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
                    </Col> 
                </Row>
            </Modal.Body>            
        </Modal>

{/*Delete Modal*/}
        <Modal show={modalDelete} onHide={() => setModalDelete(false)} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Entidad</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Corfirma la eliminación?</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={() => setModalDelete(false)}>
                    Cancelar
                </Button>
                <Button variant="outline-danger" onClick={() => setModalDelete(false)}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    </React.Fragment>
)}
export default ListEntity