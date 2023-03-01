import React, { useState } from 'react';
import { Row, Col, Badge, Card, Form, Button, Table, Modal, CloseButton, Spinner } from 'react-bootstrap';
import CrudButton from '../../../../components/Button/CrudButton';
import { getNetwork, deleteNetwork, isActive } from '../../../../api/services/networks';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../../../components/Modal/ModalConfirm';
import ActiveButton from '../../../../components/Button/ActiveButton';

const TableNetwork = ({callback, list, loading }) => {
    const [network, setNetwork] = useState('')
    const [error, setError] = useState(null)

    const [modalShow, setModalShow] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [modalState, setModalState] = useState(false);

    const [url, setUrl] = useState(null)
    const [cidr, setCidr] = useState(null)
    const [active,setActive] = useState(null);

    const [lastItem, setLastItem] = useState(null);

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    } 

    //Read Network
    const showNetwork = (url)=> {
        setUrl(url)
        setNetwork('')
        getNetwork(url)
        .then((response) => {
            setNetwork(response.data)
            setModalShow(true)
        })
        .catch(setError);
    };

    //Update Network
    const pressActive = (cidr, active, url) => {
        setUrl(url)
        setCidr(cidr)
        setActive(active)
        setModalState(true)
    }
    const switchState = ()=> {
        isActive(url, !active)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
                setError(error)
            })
            .finally(() => {
                callback(false)
                setModalState(false)
                setModalShow(false)
            })
    };

    //Remove Network
    const Delete = (url) => {
        setLastItem(list.length === 1)
        setUrl(url);
        setModalDelete(true)
    }

    const removeNetwork = (url)=> {
        deleteNetwork(url)
            .then((response) => {
                console.log(response)
                callback(lastItem)
            })
            .catch((error) => {
                console.log(error)
                setError(error)
                callback(false) //error si no se puede eliminar el ultimo
            })
            .finally(() => {
                setModalDelete(false)
            })
    };

    if (error) {
        console.log(error);
        return <p>Ups! Se produjo un error al buscar la red.</p>
    }

    return (
            <React.Fragment>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>CIDR</th>
                            <th>Dominio</th>
                            <th>Activo</th>
                            <th>Tipo</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((network, index) => {
                            return (
                                <tr key={network.url}>
                                <th scope="row">{index+1}</th>
                                <td>{network.cidr}</td>
                                <td>{network.domain}</td>
                                <td>
                                    <ActiveButton active={network.active} onClick={() => pressActive(network.domain, network.active, network.url)} />
                                </td>
                                <td>{network.type}</td>
                                <td>
                                    <CrudButton type='read' onClick={() => showNetwork(network.url)} />
                                    <Link to={{pathname:'/network/edit', state: network}} >
                                        <CrudButton type='edit'/>
                                    </Link>
                                    <CrudButton type='delete' onClick={() => Delete(network.url)} />
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
                                            <Card.Title as="h5">Redes</Card.Title>
                                            <span className="d-block m-t-5">Detalle de red</span>
                                        </Col>
                                        <Col sm={12} lg={2}>                       
                                            <Link to={{pathname:'/network/edit', state: network}} >
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
                                                <Form.Control plaintext readOnly defaultValue={network.cidr} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Nombre</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={network.cidr} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Rol</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={network.cidr} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Item</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={network.cidr} />
                                            </td>
                                        </tr>
                                        {network.cidr ? 
                                            <tr>
                                                <td>Llave pública</td>
                                                <td>
                                                    <Form.Control plaintext readOnly defaultValue={network.cidr} />
                                                </td>
                                            </tr>
                                            : 
                                            <></>
                                        }
                                        <tr>
                                            <td>Informacion Relacionada</td>
                                            <td>
                                                
                                            </td>
                                        </tr> 
                                        <tr>
                                            <td>Fecha de creación</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={network.cidr} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ultima actualización</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={network.cidr} />
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
            <ModalConfirm type='delete' component='Red' name={cidr} showModal={modalDelete} onHide={() => setModalDelete(false)} ifConfirm={() => removeNetwork(url)}/>
            <ModalConfirm type='editState' component='Red' name={cidr} state={active} showModal={modalState} onHide={() => setModalState(false)} ifConfirm={() => switchState(url, active)}/>

        </React.Fragment> 
  );
};

export default TableNetwork;
