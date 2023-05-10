import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Table, Modal, CloseButton } from 'react-bootstrap';
import CrudButton from '../../../components/Button/CrudButton';
import PriorityButton from '../../../components/Button/PriorityButton';

const ModalDetailTask = (props) => {
    
    const [created, setCreated] = useState('');
    const [modified, setModified] = useState('');

    const [row, setRow] = useState(1);

    useEffect(()=>{
        if(props.task){

            formatDate(props.task.created, setCreated)
            formatDate(props.task.modified, setModified)
            if (props.task.description!=null){
             setRow(props.task.description.length / 40)
            }    
        }
    },[props.task])


    const formatDate = (datetime, set) => {
        datetime = datetime.split('T')
        let format = datetime[0] + ' ' + datetime[1].slice(0,8); 
        set(format)
    }

    const textareaStyle = {
        resize:"none", 
        backgroundColor:"transparent", 
        border:"none", 
        boxShadow: "none"
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
                                            <Card.Title as="h5">Tarea</Card.Title>
                                            <span className="d-block m-t-5">Detalle de la tarea</span>
                                        </Col>
                                        <Col sm={12} lg={2}>                       
                                            {/*<Link to={{pathname:'/task/edit', state: props.task}} >
                                            </Link>*/}
                                                <CrudButton type='edit'/>
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
                                        {/*props.task.playbook ? 
                                            <tr>
                                                <td>Playbook</td>
                                                <td>
                                                    <FormGetName form={true} get={getPlaybook} url={props.task.playbook} />
                                                </td>
                                            </tr>
                                            : 
                                            <></>
                                    */}  
                                        {props.task.description ? 
                                            <tr>
                                                <td>Descripcion</td>
                                                <td>
                                                    <Form.Control plaintext readOnly value={props.task.description===null ? 'No tiene descripcion' : props.task.description} style={textareaStyle} as="textarea" rows={row}/>
                                                </td>
                                            </tr>
                                            : 
                                            <></>
                                        }
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
