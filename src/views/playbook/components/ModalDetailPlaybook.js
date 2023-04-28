import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Table, Modal, CloseButton } from 'react-bootstrap';
import CrudButton from '../../../components/Button/CrudButton';
import { Link } from 'react-router-dom';
import FormGetName from '../../../components/Form/FormGetName';
import { getTask } from '../../../api/services/tasks';
import { getTaxonomy } from '../../../api/services/taxonomies';

const ModalDetailPlaybook = (props) => {
    
    const [created, setCreated] = useState('');
    const [modified, setModified] = useState('');

    useEffect(()=>{
        if(props.playbook){

            formatDate(props.playbook.created, setCreated)
            formatDate(props.playbook.modified, setModified)
        }
    },[props.playbook])

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
                                            <Card.Title as="h5">Playbook</Card.Title>
                                            <span className="d-block m-t-5">Detalle de playbook</span>
                                        </Col>
                                        <Col sm={12} lg={2}>                       
                                            <Link to={{pathname:'/playbooks/edit', state: props.playbook}} >
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
                                                            <FormGetName form={true} get={getTaxonomy} url={taxonomyItem} key={index} />
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
                                                            <FormGetName form={true} get={getTask} url={taskItem} key={index} />
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

export default ModalDetailPlaybook;