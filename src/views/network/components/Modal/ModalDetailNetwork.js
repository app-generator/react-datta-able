import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Table, Modal, CloseButton } from 'react-bootstrap';
import CrudButton from '../../../../components/Button/CrudButton';
import { Link } from 'react-router-dom';

const ModalDetailNetwork = (props) => {
    const [contacts, setContacts] = useState([''])
    const [children, setChildren] = useState([''])

    useEffect(()=>{
    setChildren(props.network.children)
    setContacts(props.network.contacts)

    },[props.network])

console.log(typeof contacts)


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
                                                <td>parent</td>
                                                <td>
                                                    <Form.Control plaintext readOnly defaultValue={props.network.parent} />
                                                </td>
                                            </tr>
                                            : 
                                            <></>
                                        }
                                        <tr>
                                            <td>Subred</td>
                                            <td>{children}</td>
                                        </tr>
                                        <tr>
                                            <td>Contactos</td>
                                            <td>{contacts}</td>
                                        </tr>
                                        {/*children.length > 0 ?
                                            children.map((net, index) => {
                                                <tr>
                                                    <td>Subred</td>
                                                    <td key={index}>{net}</td>
                                                    
                                                </tr>
                                            })
                                        :
                                        <></>
                                        */}
                                        {/*contacts.length > 0 ?
                                            contacts.map((contact) => {
                                                <tr>
                                                    <td>Contactos</td>
                                                    <td>{contact}</td>
                                                </tr>
                                            })
                                        :
                                        <></>
                                        */}
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