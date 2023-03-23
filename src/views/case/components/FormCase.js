import React, { useEffect, useState } from 'react';
import {Button, Form, FormControl, Row} from 'react-bootstrap';
import { getPriorities } from '../../../api/services/priorities';
import { validateAlphanumeric, validateSpace } from '../../../utils/validators'

const FormCase = (props) => { // date, lifecycle, parent, , tlp, assigned, state, ifConfirm, save
// props: priority

const [prioritiesOption, setPrioritiesOption] = useState([])
const [error, setError] = useState(false)

    useEffect(()=> {

        getPriorities()
        .then((response) => {
            setPrioritiesOption(Object.values(response.data.results))
            console.log(response.data.results)
        })
        .catch((error)=>{
            setError(error)
        })

    },[])

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();
    let dateTime = date+' '+time;
     
    return (
        <React.Fragment>
            <Form>
                <Row>
                    <Form.Group controlId="Form.Case.Date">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control type="datetime-local" />
                    </Form.Group> 
                </Row>
                <Row>
                    <Form.Group controlId="Form.Case.Priority">
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
                                {prioritiesOption.map((priorityItem, index) => {                
                                    return (
                                        <option key={index} value={priorityItem.url}>{priorityItem.name}</option>
                                    );
                                })}
                            </Form.Control>
                            {props.priority ? '' : <div className="invalid-feedback">Seleccione la prioridad</div>}
                    </Form.Group>
                </Row>
                <Form.Group controlId="Form.Case.tlp">
                    <Form.Label>TLP</Form.Label>
                <Form.Control placeholder="TLP" />

                </Form.Group>
                <Form.Group controlId="Form.Case.Assigned">
                    <Form.Label>Asignado</Form.Label>
                <Form.Control placeholder="Asignado" />

                </Form.Group>
                <Form.Group controlId="Form.Case.State">
                    <Form.Label>Estado</Form.Label>
                <Form.Control placeholder="Estado" />

                </Form.Group>
                <Form.Group controlId="Form.Case.Lifecycle">
                    <Form.Label>Ciclo de vida</Form.Label>
                <Form.Control placeholder="Ciclo de vida" />

                </Form.Group>
                <Form.Group controlId="Form.Case.Comments">
                    <Form.Label>Comentarios</Form.Label>
                <Form.Control placeholder="Comentarios" />

                </Form.Group>
                <Form.Group controlId="Form.Case.Evidence">
                    <Form.Label>Evidencia</Form.Label>
                <Form.Control placeholder="Evidencia" />

                </Form.Group>
                <Form.Group controlId="Form.Case.Events">
                    <Form.Label>Eventos</Form.Label>
                <Form.Control placeholder="Eventos" />

                </Form.Group>
                <Form.Group controlId="Form.Case.Attention_date">
                    <Form.Label>Fecha de atencion</Form.Label>
                <Form.Control placeholder="Fecha de atencion" />

                </Form.Group>
                <Form.Group controlId="Form.Case.Solved_date">
                    <Form.Label>Fecha de resolucion</Form.Label>
                <Form.Control placeholder="Fecha de resolucion" />
                </Form.Group>
            {/*
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
                */}
            <Button onClick={props.ifConfirm}>{props.save}</Button>
            <Button variant="primary" href="/case/tables">Volver</Button>
            </Form>  
        </React.Fragment>
    );
};
            
export default FormCase;
