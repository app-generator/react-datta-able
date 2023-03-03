import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Table, Modal, CloseButton } from 'react-bootstrap';
import CrudButton from '../../../../components/Button/CrudButton';
import { Link } from 'react-router-dom';

const ModalDetailNetwork = (props) => {
    
    useEffect(()=>{

    },[])

    const formatDate = (datetime, set) => {
        datetime = datetime.split('T')
        set(datetime[0] + ' ' + datetime[1].slice(0,8))
    }

    return (
        <React.Fragment>
            <Modal size='lg' show={props.show} onHide={props.onHide} aria-labelledby="contained-modal-title-vcenter" centered>
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
                                            <Link to={{pathname:'/network/edit', state: props.network}} >
                                                <CrudButton type='edit'/>
                                            </Link>
                                            <CloseButton aria-label='Cerrar' onClick={props.onHide} />
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    <Table responsive >
                                    <tbody>
                                        {props.network.cidr ? 
                                            <tr>
                                                <td>CIDR</td>
                                                <td>
                                                    <Form.Control plaintext readOnly defaultValue={props.network.cidr} />
                                                </td>
                                            </tr>
                                            : 
                                            <></>
                                        }
                                        {props.network.domain ? 
                                            <tr>
                                                <td>Dominio</td>
                                                <td>
                                                    <Form.Control plaintext readOnly defaultValue={props.network.domain} />
                                                </td>
                                            </tr>
                                            : 
                                            <></>
                                        }
                                        {props.network.parent ? 
                                            <tr>
                                                <td>Red Padre</td>
                                                <td>
                                                    <Form.Control plaintext readOnly defaultValue={props.network.parent} />
                                                </td>
                                            </tr>
                                            : 
                                            <></>
                                        }
                                        {props.network.children && props.network.children.length > 1  ? 
                                            <tr>
                                                <td>Redes Hijas</td>
                                                <td>
                                                    {Object.values(props.network.children).map((net, index)=>{
                                                        return (
                                                            <Form.Control plaintext readOnly defaultValue={net} key={index} />
                                                        )})
                                                    }
                                                </td>
                                            </tr>
                                            : 
                                            <></>
                                        }
                                        {props.network.contacts && props.network.contacts.length > 1  ? 
                                            <tr>
                                                <td>Contactos Relacionados</td>
                                                <td>
                                                    {Object.values(props.network.contacts).map((contactItem, index)=>{
                                                        return (
                                                            <Form.Control plaintext readOnly defaultValue={contactItem}  key={index} />
                                                        )})
                                                    }
                                                </td>
                                            </tr>
                                            : 
                                            <></>
                                        }
                                        <tr>
                                            <td>Fecha de creación</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={props.network.created} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ultima actualización</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={props.network.modified} />
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
        </React.Fragment>
    )
}

export default ModalDetailNetwork;