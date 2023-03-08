import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Table, Modal, CloseButton } from 'react-bootstrap';
import CrudButton from '../../../../components/Button/CrudButton';
import { Link } from 'react-router-dom';
import FormCidr from '../Form/FormCidr';
import FormContact from '../Form/FormContact';

const ModalDetailNetwork = (props) => {
    
    const [created, setCreated] = useState('');
    const [modified, setModified] = useState('');

    useEffect(()=>{

        setCreated(props.network.created)
        setModified(props.network.modified)

    },[props.network])

    const formatDate = (datetime, set) => {
        datetime = datetime.split('T')
        let format = datetime[0] + ' ' + datetime[1].slice(0,8); 
        set(format)
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
                                        <tr>
                                            <td>Estado</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={props.network.active ? 'Activa' : 'Inactiva'} />
                                            </td>
                                        </tr>
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
                                                    <FormCidr url={props.network.parent} />
                                                </td>
                                            </tr>
                                            : 
                                            <></>
                                        }
                                        {props.network.children && props.network.children.length > 0  ? 
                                            <tr>
                                                <td>Subredes</td>
                                                <td>
                                                    {Object.values(props.network.children).map((net, index)=>{
                                                        return (
                                                            <FormCidr url={net} key={index}/>
                                                        )})
                                                    }
                                                </td>
                                            </tr>
                                            : 
                                            <></>
                                        }
                                        {props.network.contacts && props.network.contacts.length > 0  ? 
                                            <tr>
                                                <td>Contactos Relacionados</td>
                                                <td>
                                                    {Object.values(props.network.contacts).map((contactItem, index)=>{
                                                        return (
                                                            <FormContact url={contactItem}  key={index} />
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
                                                <Form.Control plaintext readOnly defaultValue={created} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ultima actualización</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={modified} />
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