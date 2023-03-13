import React, { useState, useEffect } from 'react';
import {Button, Card, CloseButton, Col, Row, Form, Modal} from 'react-bootstrap';
import CrudButton from '../../../../components/Button/CrudButton';
import { validateAlphanumeric, validateSpace } from '../../../../components/Validator/validators'; 
import Alert from '../../../../components/Alert/Alert';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();


const FormCreateNetwork = (props) => { 
    // props: ifConfirm name setName taxonomy setTaxonomy taxonomiesOption setTaxonomyCreated
    
    const [error, setError] = useState(null)

    //Create Taxonomy
    const [modalCreate, setModalCreate] = useState(false)

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

    //Create Taxonomy
    const createTaxonomy = () => { 
        console.log('CREAR TAXONOMIA')
        props.setTaxonomyCreated('response') //
        setModalCreate(false) //
    };


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
                                hasValue={props.taxonomy}
                                onChange={selectTaxonomies}
                                options={props.taxonomiesOption}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={9}>
                        <CrudButton type='create' name='Taxonomia' onClick={() => setModalCreate(true)}/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={9} />
                    <Col>
                        <Form.Group>
                            { validateAlphanumeric(props.name) && (props.taxonomy.length > 0) ? // 
                                <><Button variant="primary" onClick={props.ifConfirm}>Guardar</Button></>
                                : 
                                <><Button variant="primary" disabled>Guardar</Button></> 
                            }
                            <Button variant="primary" href="/playbook/tables">Cancelar</Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            
            <Modal size='lg' show={modalCreate} onHide={() => setModalCreate(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                        <Row>    
                            <Col>                 
                                <Card>
                                <Card.Header> 
                                    <Row>
                                        <Col>
                                            <Card.Title as="h5">Taxonomias</Card.Title>
                                            <span className="d-block m-t-5">Crear taxonomia</span>
                                        </Col>
                                        <Col sm={12} lg={2}>                       
                                            <CloseButton aria-label='Cerrar' onClick={() => setModalCreate(false)} />
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    <Button onClick={createTaxonomy}>CREAR TAXONOMIA</Button>
                                </Card.Body>
                            </Card>
                        </Col> 
                    </Row>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};
            
export default FormCreateNetwork;
