import React,{useState} from 'react'
import { Row, Card, Form, Button,Col } from 'react-bootstrap'
import { validateFieldText, validateNumber} from '../../../utils/validators';
import FormArtifactsSelect from './FormArtifactsSelect';


const FormArtifact = (props) => {
    const typeOptions = [
        {
            value : '0',
            name : 'Seleccione una opcion'
        },
        {
            value : 'ip',
            name : 'Ip'
        },
        {
            value : 'domain',
            name : 'Domain'
        },
        {
            value : 'fqdn',
            name : 'Fqdn'
        },
        {
            value : 'url',
            name : 'Url'
        },
        {
            value : 'mail',
            name : 'Mail'
        },        
        {
            value : 'hash',
            name : 'Hash'
        },
        {
            value : 'file',
            name : 'File'
        },
        {
            value : 'other',
            name : 'Other'
        },
        {
            value : 'user-agent',
            name : 'User-agent'
        },
        {
            value : 'autonomous-system',
            name : 'Autonomous-system'
        }
    ]
    const [validArtifact, setValidArtifact] = useState(false) 
    const activateBooton = ()=>{
        
        return false
    }
  return (
    <div>
        <Card.Body>
            <Form>    
                <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control  
                            name="type" 
                            type="choice"
                            as="select" 
                            value ={props.type} 
                            onChange={(e)=>props.setType(e.target.value)} 
                            isInvalid={props.type === "-1"}
                            isValid={props.type !== "-1"}>
                         
                            {typeOptions.map((t) => {
                                return(<option value={t.value}> {t.name} </option>)
                            })}
                            
                        </Form.Control>
                </Form.Group>
                {/* <FormContactSelectUsername selectedType={props.type} 
                            contact={props.contact} setContact={props.setContact}
                            setValidContact={setValidContact} />*/}

                <FormArtifactsSelect 
                        value={props.value} setValue={props.setValue}
                        type={props.type} 
                        setValidArtifact={setValidArtifact}/>

                
                {activateBooton() ?  
                <><Button variant="primary" disabled>Guardar</Button></> 
                : 
                <><Button variant="primary" onClick={props.ifConfirm} >Guardar</Button></>
                }
                <Button variant="primary" onClick={props.ifCancel}>Cancelar</Button>
            </Form>
        </Card.Body>
        {/*<Row>
                    <Col lg={4}>
                        <Form.Group controlId="Form.Contact.Type">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control
                                name="type"
                                type="choice"
                                as="select"
                                value={props.type}
                                isInvalid={props.type == '0'}
                                isValid={props.type !== '0'}
                                onChange={(e) =>  props.setType(e.target.value)}>
                                {typeOptions.map((typeItem, index) => {                
                                    return (
                                        <option key={index} value={typeItem.value}>{typeItem.name}</option>
                                    );
                                })}
                            </Form.Control>
                            {props.type ? '' : <div className="invalid-feedback">Seleccione el tipo de contacto</div>}
                        </Form.Group>
                    </Col>
                    <Col lg={8}>
                        <FormContactSelectUsername selectedType={props.type} 
                            contact={props.contact} setContact={props.setContact}
                            setValidContact={setValidContact} />
                    </Col>
                            </Row>*/}
    </div>
  )
}

export default FormArtifact