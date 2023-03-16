import React, { useState, useEffect } from 'react';
import {Button, Card, CloseButton, Col, Row, Form, Modal} from 'react-bootstrap';
import CrudButton from '../../../components/Button/CrudButton';
import { validateAlphanumeric, validateSpace } from '../../../utils/validators'; 
import Alert from '../../../components/Alert/Alert';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();


const FormCreatePlaybook = (props) => { 
    // props:  name setName taxonomy setTaxonomy taxonomiesOption ifConfirm
    
    const [error, setError] = useState(null)

    useEffect(()=> {
        
        },[props.taxonomiesOption])

    //Multiselect    
    const selectTaxonomies=(event)=>{ 
        props.setTaxonomy(
            event.map((e)=>{
                return e.value
            })
            )
        }

    return (
        <React.Fragment>
            {/*<Alert/>*/}
            <Form>
                <Row>
                    <Col sm={12} lg={12}>
                        <Form.Group controlId="Form.Playbook.Name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control 
                                type="name" 
                                placeholder="Ingrese nombre" 
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
                        <Form.Group controlId="Form.Playbook.Taxonomy.Multiselect">
                            <Form.Label>Taxonomias</Form.Label>
                            <Select
                                placeholder='Seleccione Taxonomias'
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                defaultValue={props.taxonomy}
                                onChange={selectTaxonomies}
                                options={props.taxonomiesOption}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={9} />
                    <Col>
                        <Form.Group>
                            { validateAlphanumeric(props.name) && (props.taxonomy.length > 0) ? // 
                                <><Button variant="primary" onClick={props.ifConfirm}>Crear</Button></>
                                : 
                                <><Button variant="primary" disabled>Crear</Button></> 
                            }
                            <Button variant="primary" href="/playbook/tables">Cancelar</Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </React.Fragment>
    );
};
            
export default FormCreatePlaybook;
