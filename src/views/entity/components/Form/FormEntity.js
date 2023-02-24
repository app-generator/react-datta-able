import React from 'react';
import {Button, Form} from 'react-bootstrap';
import { validateAlphanumeric, validateSpace } from '../../../../components/Validator/validators'; 

const FormEntity = (props) => { // props: name, setName, ifConfirm

    return (
        <React.Fragment>
            <Form>
            <Form.Group controlId="Form.Entity.Name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                        type="nombre" 
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

                {!validateSpace(props.name) || !validateAlphanumeric(props.name) ? 
                    <><Button variant="primary" disabled>Guardar</Button></> 
                    : 
                    <><Button variant="primary" onClick={props.ifConfirm}>Guardar</Button></>}
                <Button variant="primary" href="/entity/tables">Cancelar</Button>
            </Form>
        </React.Fragment>
    );
};
            
export default FormEntity;
