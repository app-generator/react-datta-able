import React, { useEffect, useState } from 'react';
import {Button, Col, Row, Form} from 'react-bootstrap';
import { getPriorities } from '../../../../api/services/priorities';
import { getAllPlaybooks } from '../../../../api/services/playbooks';
import { validateSpace, validateAlphanumeric } from '../../../../components/Validator/validators'; 

// props: name, setName, priority, setPriority, playbook, setPlaybook,
// description, setDescription, ifConfirm, ifCancel 

const FormCreateTask = (props) => { 

    //Dropdowns
    const [playbookOption, setPlaybookOption] = useState([])
    const [priorityOption, setPriorityOption] = useState([])
    
    //Renderizar
    const [playbookCreated, setPlaybookCreated] = useState('') //si se pueden crear playbooks desde esta vista
    
    const [error, setError] = useState(false)

    useEffect(()=> {

        getPriorities()
            .then((response) => {
                setPriorityOption(Object.values(response.data.results))
                console.log(response.data.results)
            })
            .catch((error)=>{
                setError(error)
            })

        getAllPlaybooks()
            .then((response) => {
                setPlaybookOption(Object.values(response.data.results))
                console.log(response.data.results)
            })
            .catch((error)=>{
                setError(error)
            })

        },[playbookCreated])
    
    return (
        <React.Fragment>
            <Form>
                <Row>
                    <Col sm={12} lg={12}>
                        <Form.Group controlId="Form.Task.Playbook" >
                            <Form.Label>Playbook</Form.Label>
                            <Form.Control plaintext readOnly defaultValue={props.playbook.url}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={12}>
                        <Form.Group controlId="Form.Task.Name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control 
                                placeholder="Nombre" 
                                maxlength="100"
                                value={props.name} 
                                onChange={(e) => props.setName(e.target.value)} 
                                isInvalid={!validateAlphanumeric(props.name) || !validateSpace(props.name)}
                                isValid={validateAlphanumeric(props.name) && validateSpace(props.name)}
                                />
                            {validateSpace(props.name) ? '' : <div className="invalid-feedback">Ingrese nombre</div>}
                            {!props.name || validateAlphanumeric(props.name) ? "" : <div className="invalid-feedback">Ingrese caracteres validos</div>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={12}>
                        <Form.Group controlId="Form.Task.Priority" >
                            <Form.Label>Prioridad</Form.Label>
                            <Form.Control
                                name="priority"
                                type="choice"                                            
                                as="select"
                                value={props.priority}
                                isInvalid={props.priority == '0'}
                                isValid={props.priority !== '0'}
                                onChange={(e) =>  props.setPriority(e.target.value)}>
                                <option value='0'>Seleccione</option>
                                {priorityOption.map((priorityItem, index) => {                
                                    return (
                                        <option key={index} value={priorityItem.url}>{priorityItem.name}</option>
                                    );
                                })}
                            </Form.Control>
                            {props.priority ? '' : <div className="invalid-feedback">Seleccione la prioridad</div>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={12}>
                        <Form.Group controlId="Form.Task.Description" >
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                placeholder="Descripcion" 
                                maxlength="250"
                                rows={4} 
                                value={props.description} 
                                onChange={(e) => props.setDescription(e.target.value)}  
                                />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Form.Group>
                        {(!validateSpace(props.name) || !validateAlphanumeric(props.name) 
                        || (props.priority == '0' ) ) ? 
                        <><Button variant="primary" disabled>Guardar</Button></> 
                        : 
                            <><Button variant="primary" onClick={props.ifConfirm} >Guardar</Button></>
                        }
                            <Button variant="primary" onClick={props.ifCancel}>Cancelar</Button>
                    </Form.Group>
                </Row>
            </Form>
        </React.Fragment>
    );
};
            
export default FormCreateTask;
