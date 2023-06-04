import React from 'react';
import {Button, Form} from 'react-bootstrap';
import DropdownState from '../../../components/Dropdown/DropdownState';
import { validateName } from './ValidatorEntity';

const FormEntity = (props) => { // props: name, setName, ifConfirm, {edit:false | true -> active, setActive}
    
    return (
        <React.Fragment>
            <Form>
                <Form.Group controlId="Form.Entity.Name">
                    <Form.Label>Nombre <b style={{color:"red"}}>*</b></Form.Label>
                    <Form.Control 
                        type="text"
                        name="name" 
                        placeholder="Nombre" 
                        maxlength="100"
                        value={props.name} 
                        onChange={(e) => props.setName(e.target.value)} 
                        isInvalid={!validateName(props.name)}
                        isValid={validateName(props.name)}
                    />
                    {validateName(props.name) ? '' : <div className="invalid-feedback">Ingrese un nombre que contenga hasta 100 caracteres, letras y/o numeros y que no sea vacio</div>}
                </Form.Group>
                {props.edit ? 
                    <Form.Group>
                        <Form.Label>Estado</Form.Label>
                        <DropdownState state={props.active} setActive={props.setActive}></DropdownState>
                    </Form.Group>
                :
                <></>}

                {!validateName(props.name) ? 
                    <><Button variant="primary" disabled>Guardar</Button></> 
                    : 
                    <><Button variant="primary" onClick={props.ifConfirm}>Guardar</Button></>}
                <Button variant="primary" href="/entities">Cancelar</Button>
            </Form>
        </React.Fragment>
    );
};
            
export default FormEntity;
