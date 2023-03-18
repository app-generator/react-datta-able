import React, { useEffect } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';
import { validateAlphanumeric, validateSpace } from '../../../utils/validators'; 
import Alert from '../../../components/Alert/Alert';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();

const FormCreatePlaybook = (props) => { 
    // props:  ifConfirm name setName taxonomy setTaxonomy allTaxonomies
    //taxonomiesDefaultValue: las del playbook 
    
    useEffect(()=> {

    }
        ,[props.taxonomy])

    //Multiselect    
    const selectTaxonomies=(event)=>{ 
        props.setTaxonomy(
            event.map((e)=>{
                return e.value
                //return e.value + e.label
            })
            )
        }

console.log('props.taxonomy: '+ props.taxonomy)
console.log('props.allTaxonomies: '+ props.allTaxonomies)
const defaultValue = [{value: 'nombre', label: 'label'}, {value: 'nombre2', label: 'label2'}]
console.log('defaultValue: '+ defaultValue)

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
                                defaultValue={props.taxonomy} //defaultValue
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
