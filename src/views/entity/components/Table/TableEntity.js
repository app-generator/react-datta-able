import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Badge, Card, Form, Button, Table, Modal, CloseButton, Spinner } from 'react-bootstrap';
import ActiveButton from '../../../../components/Button/ActiveButton';
import CrudButton from '../../../../components/Button/CrudButton';
import { getEntity, deleteEntity, isActive } from '../../../../api/services/entities';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../../../components/Modal/ModalConfirm';

const TableEntity = ({callback, list, loading }) => {
    const [entity, setEntity] = useState('');
    const [error, setError] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [lastItem, setLastItem] = useState(null);
    const [created, setCreated] = useState(null);
    const [modified, setModified] = useState(null);
    const [state,setState] = useState(null);
    const [active,setActive] = useState(null);

    useEffect(() => {

    },[]);

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    }
    
    //Read Entity
    const showEntity = (key)=> {
        setId(key)
        setEntity('')
        getEntity(key)
        .then((response) => {
            setEntity(response.data)
            let datetime = response.data.created.split('T')
            setCreated(datetime[0] + ' ' + datetime[1].slice(0,8))
            datetime = response.data.modified.split('T');
            setModified(datetime[0] + ' ' + datetime[1].slice(0,8))
            setState(response.data.active)
            setModalShow(true)
        })
        .catch(setError);
    };

    //Remove Entity
    const Delete = (key, name) => {
        setLastItem(list.length === 1)
        setId(key)
        setName(name)
        setModalDelete(true)
    }
    
    const removeEntity = (key)=> {
        console.log('Elimna ultimo elemento? '+ lastItem)
        deleteEntity(key)
            .then((response) => {
                console.log(response);
                ////////////////////
                callback(`La entidad ${name} ha sido eliminada`, true, lastItem)
            })
            .catch((error) => {
                console.log(error)
                setError(error)
                callback(`La entidad ${name} NO ha sido eliminada`, false, false)
            })
            .finally(() => {
                setModalDelete(false)
            })
        };
    
    //Update Entity
    const pressActive = (name, active, key) => {
        setId(key)
        setName(name)
        setActive(active)
        setModalState(true)
    }

    const switchState = ()=> {
        let message = +active ? `La entidad ${name} ha sido desactivada` : `La entidad ${name} ha sido activada`;
        isActive(id, +!active)
        .then((response) => {
            console.log(response)
            
            callback(message, true, false)
        })
        .catch((error) => {
                console.log(error)
                setError(error)
                callback(message, false)
            })
            .finally(() => {
                setModalState(false)
                setModalShow(false)
            })
    };
    
    return (
            <React.Fragment>
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
                        {list.map((entity, index) => {
                            let url = entity.url.split('/')[(entity.url.split('/')).length-2];

                            return (
                                <tr key={url}>
                                    <th scope="row">{index+1}</th>
                                    <td>{entity.name}</td>
                                    <td>
                                        <ActiveButton active={entity.active} onClick={() => pressActive(entity.name, entity.active, url)} />
                                    </td>
                                    <td>{entity.created.slice(0,10)}</td>
                                    <td>{entity.modified.slice(0,10)}</td>
                                    <td>
                                        <CrudButton type='read' onClick={() => showEntity(url)} />
                                        <Link to={{pathname:'/entity/edit', state: entity, callback: callback}} >
                                            <CrudButton type='edit'/>
                                        </Link>
                                        <CrudButton type='delete' onClick={() => Delete(url, entity.name)} />
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
                                            <Link to={{pathname:'/entity/edit', state: entity}} >
                                                <CrudButton type='edit'/>
                                            </Link>
                                            <ActiveButton active={state} />
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
                                                <td>Fecha de creación</td>
                                                <td>
                                                    <Form.Control plaintext readOnly defaultValue={created} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Ultima actualización</td>
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
            
            <ModalConfirm type='delete' component='Entidad' name={name} showModal={modalDelete} onHide={() => setModalDelete(false)} ifConfirm={() => removeEntity(id)}/>

            <ModalConfirm type='editState' component='Entidad' name={name} state={active} showModal={modalState} onHide={() => setModalState(false)} ifConfirm={() => switchState(id,active)}/>

        </React.Fragment> 
  );
};

export default TableEntity;
