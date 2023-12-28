import React from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import { validateName } from '../../../utils/validators/entity';

const FormEntity = (props) => { // props: name, setName, ifConfirm, {edit:false | true -> active, setActive}
    const stateOptions = [
        {
            value : true,
            name : 'Activo'
        },
        {
            value : false,
            name : 'Inactivo'
        },
    ]

    return (
        <React.Fragment>
            <Form>
                <Row lg={12}>
                    <Col sm={12} lg={8}>
                        <Form.Group controlId="Form.Entity.Name">
                            <Form.Label>Nombre <b style={{color:"red"}}>*</b></Form.Label>
                            <Form.Control 
                                type="text"
                                name="name" 
                                placeholder="Nombre" 
                                value={props.name} 
                                onChange={(e) => props.setName(e.target.value)} 
                                isInvalid={!validateName(props.name)}                        
                            />
                            {validateName(props.name) ? '' : <div className="invalid-feedback">Ingrese un nombre que contenga hasta 100 caracteres, letras y/o numeros y que no sea vacio</div>}
                            
                        </Form.Group>
                    </Col>
                    {props.edit ? 
                    <Col sm={12} lg={4}>
                        <Form.Group controlId="Form.Contact.State.edit">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                name="edit"
                                type="choice"
                                as="select"
                                value={props.active}
                                onChange={(e) => props.setActive(e.target.value)}>
                                {stateOptions.map((item, index) => {                
                                    return (
                                        <option key={index} value={item.value}>{item.name}</option>
                                    );
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    :
                    <></>

                }
                </Row>

                {props.name !== "" && validateName(props.name) ? 
                     <><Button variant="primary" onClick={props.ifConfirm}>Guardar</Button></>
                    : 
                     <><Button variant="primary" disabled>Guardar</Button></>                    
                }
                    
                    <Button variant="primary" href="/entities">Cancelar</Button>
            </Form>
        </React.Fragment>
    );
};
            
export default FormEntity;
