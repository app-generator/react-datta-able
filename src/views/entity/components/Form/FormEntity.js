import React from 'react';
import {Button, Form} from 'react-bootstrap';
import { validateAlphanumeric } from '../../../user/validators' 

const FormEntity = (props) => { // props: name, setName, ifConfirm

    return (
        <React.Fragment>
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                        value={props.name} 
                        onChange={(e) => props.setName(e.target.value)} 
                        isInvalid={props.name === '' || !validateAlphanumeric(props.name)}
                        isValid={props.name !== '' && validateAlphanumeric(props.name)}
                        type="nombre" 
                        placeholder="Nombre" 
                        maxLength="255"/>
                    {props.name!=='' ? '' : <div className="invalid-feedback">Ingrese nombre</div>}
                    {!props.name || validateAlphanumeric(props.name) ? "" : <div className="invalid-feedback">Ingrese caracteres validos</div>}
                </Form.Group>

                {props.name === '' || !validateAlphanumeric(props.name) ? 
                    <><Button variant="primary" disabled>Guardar</Button></> 
                    : 
                    <><Button variant="primary" onClick={props.ifConfirm}>Guardar</Button></>}
                <Button variant="primary" href="/entity/tables">Cancelar</Button>
            </Form>
        </React.Fragment>
    );
};
            
export default FormEntity;
