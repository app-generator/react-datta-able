import React from 'react';
import {Button, Form} from 'react-bootstrap';
import DropdownState from '../../../components/Dropdown/DropdownState';
import { validateAlphanumeric, validateSpace } from '../../../utils/validators'

const FormEntity = (props) => { // props: name, setName, ifConfirm, {edit:false | true -> active, setActive}
    {/*
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí podrías enviar los datos del formulario a una API o servidor
    console.log(formData);
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="formMessage">
        <Form.Label>Mensaje</Form.Label>
        <Form.Control as="textarea" rows={3} name="message" value={formData.message} onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">Enviar</Button>
    </Form>
  );
}

*/}
    return (
        <React.Fragment>
            <Form>
                <Form.Group controlId="Form.Entity.Name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                        type="text"
                        name="name" 
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
                {props.edit ? 
                    <Form.Group>
                        <Form.Label>Estado</Form.Label>
                        <DropdownState state={props.active} setActive={props.setActive}></DropdownState>
                    </Form.Group>
                :
                <></>}

                {!validateSpace(props.name) || !validateAlphanumeric(props.name) ? 
                    <><Button variant="primary" disabled>Guardar</Button></> 
                    : 
                    <><Button variant="primary" onClick={props.ifConfirm}>Guardar</Button></>}
                <Button variant="primary" href="/entities">Cancelar</Button>
            </Form>
        </React.Fragment>
    );
};
            
export default FormEntity;
