import React, { useEffect } from 'react';
import { Row, Col, Card, Form, Table, Modal, CloseButton } from 'react-bootstrap';
import CrudButton from '../../../../components/Button/CrudButton';
import { Link } from 'react-router-dom';
import PriorityButton from '../../../../components/Button/PriorityButton';
import FormGetName from '../../../../components/Form/FormGetName';
import { getPlaybook } from '../../../../api/services/playbooks';

const ModalDetailTask = (props) => {
    
    useEffect(()=>{

    },[])

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
                                            <Card.Title as="h5">Tarea</Card.Title>
                                            <span className="d-block m-t-5">Detalle de la tarea</span>
                                        </Col>
                                        <Col sm={12} lg={2}>                       
                                            <Link to={{pathname:'/task/edit', state: props.task}} >
                                                <CrudButton type='edit'/>
                                            </Link>
                                            <CloseButton aria-label='Cerrar' onClick={props.onHide} />
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    <Table responsive >
                                    <tbody>
                                        {props.task.name ? 
                                            <tr>
                                                <td>Nombre</td>
                                                <td>
                                                    <Form.Control plaintext readOnly defaultValue={props.task.name} />
                                                </td>
                                            </tr>
                                            : 
                                            <></>
                                        } 
                                        {props.task.priority ? 
                                            <tr>
                                                <td>Prioridad</td>
                                                <td>
                                                    <PriorityButton url={props.task.priority} />
                                                </td>
                                            </tr>
                                            : 
                                            <></>
                                        } 
                                        {props.task.playbook ? 
                                            <tr>
                                                <td>Playbook</td>
                                                <td>
                                                    <FormGetName form={true} get={getPlaybook} url={props.task.playbook} />
                                                </td>
                                            </tr>
                                            : 
                                            <></>
                                        }  
                                        {props.task.description ? 
                                            <tr>
                                                <td>Descripcion</td>
                                                <td>
                                                    <Form.Control plaintext readOnly defaultValue={props.task.description} />
                                                </td>
                                            </tr>
                                            : 
                                            <></>
                                        }
                                        <tr>
                                            <td>Fecha de creación</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={props.task.created} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ultima actualización</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={props.task.modified} />
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

export default ModalDetailTask;