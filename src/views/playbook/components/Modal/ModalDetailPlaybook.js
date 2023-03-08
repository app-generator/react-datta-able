import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Table, Modal, CloseButton } from 'react-bootstrap';
import CrudButton from '../../../../components/Button/CrudButton';
import { Link } from 'react-router-dom';
import FormTaxonomy from '../Form/FormTaxonomy'; 

const ModalDetailPlaybook = (props) => {
    
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
                                            <Card.Title as="h5">Playbook</Card.Title>
                                            <span className="d-block m-t-5">Detalle de playbook</span>
                                        </Col>
                                        <Col sm={12} lg={2}>                       
                                            <Link to={{pathname:'/playbook/edit', state: props.playbook}} >
                                                <CrudButton type='edit'/>
                                            </Link>
                                            <CloseButton aria-label='Cerrar' onClick={props.onHide} />
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    <Table responsive >
                                    <tbody>
                                        {props.playbook.name ? 
                                            <tr>
                                                <td>Nombre</td>
                                                <td>
                                                    <Form.Control plaintext readOnly defaultValue={props.playbook.name} />
                                                </td>
                                            </tr>
                                            : 
                                            <></>
                                        }                                     
                                        {props.playbook.taxonomy && props.playbook.taxonomy.length > 0  ? 
                                            <tr>
                                                <td>Taxonomias</td>
                                                <td>
                                                    {Object.values(props.playbook.taxonomy).map((taxonomyItem, index)=>{
                                                        return (
                                                            <FormTaxonomy url={taxonomyItem} key={index} />
                                                        )})
                                                    }
                                                </td>
                                            </tr>
                                            : 
                                            <></>
                                        }
                                        {props.playbook.tasks && props.playbook.tasks.length > 0  ? 
                                            <tr>
                                                <td>Tareas</td>
                                                <td>
                                                    {Object.values(props.playbook.tasks).map((taskItem, index)=>{
                                                        return (
                                                            <FormTaxonomy url={taskItem} key={index} />
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
                                                <Form.Control plaintext readOnly defaultValue={props.playbook.created} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ultima actualización</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={props.playbook.modified} />
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

export default ModalDetailPlaybook;