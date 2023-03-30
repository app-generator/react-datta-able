import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';
import { validateAlphanumeric, validateSpace } from '../../../utils/validators'; 
import Alert from '../../../components/Alert/Alert';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();

const FormCreatePlaybook = (props) => { 
    // props:  ifConfirm name setName taxonomy setTaxonomy allTaxonomies save
    const [taxonomiesDefaultValue, setTaxonomiesDefaultValue] = useState([])

    useEffect(()=> {
                //selected taxonomies: value-label
                let listDefaultTaxonomies = props.allTaxonomies.filter(elemento => props.taxonomy.includes(elemento.value))
                .map(elemento => ({value: elemento.value, label: elemento.label}));
                setTaxonomiesDefaultValue(listDefaultTaxonomies)
    }
        ,[props.allTaxonomies, props.taxonomy])

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
                                value={taxonomiesDefaultValue}
                                placeholder='Seleccione Taxonomias'
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                onChange={selectTaxonomies}
                                options={props.allTaxonomies}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={10} />
                    <Col>
                        <Form.Group>
                            { validateAlphanumeric(props.name) && (props.taxonomy.length > 0) ? // 
                                <><Button variant="primary" onClick={props.ifConfirm}>{props.save}</Button></>
                                : 
                                <><Button variant="primary" disabled>{props.save}</Button></> 
                            }
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </React.Fragment>
    );
};
            
export default FormCreatePlaybook;
