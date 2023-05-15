import React from 'react';
import { useState } from 'react';
import { Row, Col, Badge, Card, Form, Button, Table, Modal, CloseButton, Spinner } from 'react-bootstrap';
import ActiveButton from '../../../components/Button/ActiveButton';
import CrudButton from '../../../components/Button/CrudButton';
import { getEntity, deleteEntity, isActive } from '../../../api/services/entities';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../../components/Modal/ModalConfirm';


const TableEntity = ({setIsModify, list, loading }) => {
    const [entity, setEntity] = useState('') 
    const [modalShow, setModalShow] = useState(false) 
    const [modalDelete, setModalDelete] = useState(false) 
    const [modalState, setModalState] = useState(false) 
    const [url, setUrl] = useState(null) 
    const [id, setId] = useState(null) 
    const [name, setName] = useState(null) 
    const [created, setCreated] = useState(null) 
    const [modified, setModified] = useState(null) 
    const [active,setActive] = useState(null) 

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    }
    
    //Read Entity
    const showEntity = (url)=> {
        setId(url.split('/')[(url.split('/')).length-2]);
        setUrl(url)
        setEntity('')
        getEntity(url)
        .then((response) => {
            setEntity(response.data)
            let datetime = response.data.created.split('T')
            setCreated(datetime[0] + ' ' + datetime[1].slice(0,8))
            datetime = response.data.modified.split('T');
            setModified(datetime[0] + ' ' + datetime[1].slice(0,8))
            setModalShow(true)
        })
        .catch((error)=>{
            console.log(error)
        })
    };

    // Remove Entity
    const Delete = (url, name) => {
        setUrl(url)
        setName(name)
        setModalDelete(true)
    }
    
    const removeEntity = (url, name)=> {
        deleteEntity(url, name)
            .then((response) => {
                setIsModify(response)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setModalDelete(false)
            })
        };
    
    //Update Entity
    const pressActive = (name, active, url) => {
        setUrl(url)
        setName(name)
        setActive(active)
        setModalState(true)
    }

    const switchState = (url, state, name)=> {
        isActive(url, !state, name)
            .then((response) => {
                console.log(response)
                setIsModify(response)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setModalState(false)
                setModalShow(false)
            })
    };
    
    return (
            <React.Fragment>
                <Table responsive hover className="text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Activo</th>
                            <th>Redes Asociadas</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((entity, index) => {

                            return (
                                <tr key={entity.url}>
                                    <th scope="row">{index+1}</th>
                                    <td>{entity.name}</td>
                                    <td>
                                        <ActiveButton active={entity.active} onClick={() => pressActive(entity.name, entity.active, entity.url)} />
                                    </td>
                                    <td>5</td>
                                    <td>
                                        <CrudButton type='read' onClick={() => showEntity(entity.url)} />
                                        <Link to={{pathname:'/entities/edit', state: entity}}> 
                                            <CrudButton type='edit'/>
                                        </Link>
                                        <CrudButton type='delete' onClick={() => Delete(entity.url, entity.name)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>

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
                                        <Col sm={12} lg={3}>                       
                                            <Link to={{pathname:'/entities/edit', state: entity}} >
                                                <CrudButton type='edit'/>
                                            </Link>
                                            <CloseButton aria-label='Cerrar' onClick={() => setModalShow(false)} />
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    <Table responsive >
                                        <tbody>
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
                                                    <Form.Control plaintext readOnly defaultValue={entity.name} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Activa</td>
                                                <td>
                                                    <ActiveButton active={entity.active} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Creación</td>
                                                <td>
                                                    <Form.Control plaintext readOnly defaultValue={created} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Actualización</td>
                                                <td>
                                                    <Form.Control plaintext readOnly defaultValue={modified} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Informacion Relacionada</td>
                                                <td>
                                                    <Button size="sm" variant='light' className="text-capitalize">
                                                        Redes <Badge variant="light" className="ml-1">4</Badge>
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col> 
                    </Row>
                </Modal.Body>
            </Modal>
            
            <ModalConfirm type='delete' component='Entidad' name={name} showModal={modalDelete} onHide={() => setModalDelete(false)} ifConfirm={() => removeEntity(url, name)}/>

            <ModalConfirm type='editState' component='Entidad' name={name} state={active} showModal={modalState} onHide={() => setModalState(false)} ifConfirm={() => switchState(url, active, name)}/>

        </React.Fragment> 
  );
};

export default TableEntity;
