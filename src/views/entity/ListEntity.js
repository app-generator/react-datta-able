import React from 'react';
import { Row, Col, Card, Button, Table, Modal, Breadcrumb } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import AddButton from './elements/AddButton';

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
                                        <Button className="btn-icon btn-rounded" variant='outline-primary' title='Detalle' href='/entity/show'>
                                            <i className='fas fa-eye'/>
                                        </Button>
                                        <Button className="btn-icon btn-rounded" variant='outline-warning' title='Editar' href='/entity/edit'>
                                            <i className='fas fa-edit'/>
                                        </Button>
                                        <Button className="btn-icon btn-rounded" variant='outline-danger' title='Eliminar' onClick={() => setModalShow(true)}>
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
        <Modal show={modalShow} onHide={() => setModalShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Entidad</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Corfirma la eliminación?</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={() => setModalShow(false)}>
                    Cancelar
                </Button>
                <Button variant="outline-danger" onClick={() => setModalShow(false)}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    </React.Fragment>
)}
export default ListEntity