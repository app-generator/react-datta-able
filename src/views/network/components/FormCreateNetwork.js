import React, { useState, useEffect } from 'react';
import {Button, Card, CloseButton, Col, Row, Form, Modal} from 'react-bootstrap';
import { getAllEntities } from '../../../api/services/entities';
import { getAllNetworks } from '../../../api/services/networks';
import CrudButton from '../../../components/Button/CrudButton';
import FormCreateContact from '../../contact/components/FormCreateContact';
import { postContact } from '../../../api/services/contacts';
import { validateSelect, validateNetworkCIDR, validateNetworkDomain, validateUnrequiredInput } from '../../../utils/validators/network';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import DropdownState from '../../../components/Dropdown/DropdownState';
import Alert from '../../../components/Alert/Alert';
import { postStringIdentifier } from "../../../api/services/stringIdentifier";


const animatedComponents = makeAnimated();

const FormCreateNetwork = (props) => { 
    // props: ifConfirm children setChildren cidr setCidr domain setDomain active setActive 
    // type setType parent setParent network_entity setNetwork_entity contacts setContactss 
    // {edit:false | true -> active, setActive} !!allContacts
    
    //Dropdown
    const [entitiesOption, setEntitiesOption] = useState([])
    const [networksOption, setNetworksOption] = useState([])
    const [error, setError] = useState(null)

    //Multiselect
    const [contactsValueLabel, setContactsValueLabel] = useState([])

    //Create Contact
    const [modalCreate, setModalCreate] = useState(false)
    const [supportedName, setSupportedName] = useState('');
    const [selectRol, setSelectRol] = useState('');
    const [supportedPriority, setSupportedPriority] = useState('');
    const [supportedContact, setSupportedContact] = useState('');
    const [supportedKey, setSupportedKey] = useState(null);
    const [selectType, setSelectType] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    //Alert
    const [showAlert, setShowAlert] = useState(false);

    useEffect(()=> {
                
        getAllEntities()
            .then((response) => {
                setEntitiesOption(response)
                console.log(response)
            })
            .catch((error)=>{
                setError(error)
            })
    
        getAllNetworks()
            .then((response) => {
                setNetworksOption(response)
                console.log(response)
            })
            .catch((error)=>{
                setError(error)
            })
        
        },[])

    useEffect(()=> {
    
        //selected contacts 
        let listDefaultContact = props.allContacts.filter(elemento => props.contacts.includes(elemento.value))
        .map(elemento => ({value: elemento.value, label: elemento.label}));
        setContactsValueLabel(listDefaultContact)
        
        },[props.contacts, props.allContacts])

    //Multiselect    
    const selectContacts=(event)=>{ 
        props.setContacts(
            event.map((e)=>{
                return e.value
            })
            )
        }
    
        console.log(contactsValueLabel);
        console.log(props.network_entity);

    const completeFieldStringIdentifier=(event)=>{ 
    
        if (event.target.value !==""){ 
            postStringIdentifier(event.target.value).then((response) => { 
                setShowErrorMessage(response.data.artifact_type === "OTHER" || response.data.artifact_type === "EMAIL")        
            })
            .catch((error) => {
                setError(error)
            }).finally(() => {
                console.log("finalizo")
            })   
        }

        if (event.target.value === "" ){
            setShowErrorMessage(false)//para que no aparesca en rojo si esta esta el input vacio en el formulario
        }   
        props.setAddress_value(event.target.value)
    }

    //Create Contact
    const createContact = () => { //refactorizar al FormContact

        postContact (supportedName, supportedContact, supportedKey, selectType, selectRol, supportedPriority)
        .then((response) => { 
            console.log(response)
            props.setContactsCreated(response) //
            setModalCreate(false) //
        })
        .catch((error) => {
            setError(error)
            console.log(error)
        })
        .finally(()=> {
            setShowAlert(true);
        });
    };

    return (
        <React.Fragment>
            <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)} component="contact"/>
            <Form>
                <Row>
                    <Col sm={12} lg={4}>
                        <Form.Group controlId="Form.Network.Type">
                            <Form.Label>Tipo <b style={{color:"red"}}>*</b></Form.Label>
                            <Form.Control
                                name="type"
                                type="choice"
                                as="select"
                                value={props.type}
                                onChange={(e) =>  props.setType(e.target.value)}>
                                <option key={0} value=''>Seleccione</option>
                                <option key={1} value='internal'>Interna</option>
                                <option key={2} value='external'>Externa</option>                                
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={12} lg={4}>
                        <Form.Group controlId="Form.Network.Entity">
                            <Form.Label>Entidad</Form.Label>
                            <Form.Control
                                name="entity"
                                type="choice"
                                as="select"
                                value={props.network_entity}
                                onChange={(e) => props.setNetwork_entity(e.target.value)}>
                                    {props.edit ? '' : <option key={0} value={null}>Seleccione una entidad </option>}
                                    {entitiesOption.map((entityItem, index) => {                
                                         
                                        return (
                                           
                                            <option key={index} value={entityItem.url}>{entityItem.name}</option>
                                        );
                                    })}
                            </Form.Control>
                        </Form.Group>                        
                    </Col>
                </Row>

                <Row>
                    <Col sm={12} lg={8}>
                        <Form.Label>CIDR o Domino<b style={{color:"red"}}>*</b></Form.Label>
                        <Form.Group controlId="formGridAddress1">
                        <Form.Control 
                            placeholder="Ingrese IPv4,IPv6, Nombre de domino o Email" 
                            maxlength="150" 
                            onChange={(e)=>completeFieldStringIdentifier(e)}
                            value ={props.address_value} 
                            isInvalid={showErrorMessage }
                            name="address_value"/>
                            {showErrorMessage    ?  <div className="invalid-feedback"> Debe ingresar IPv4,IPv6 o Nombre de domino </div>  : "" }
                        </Form.Group> 
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={8}>
                        <Form.Group controlId="Form.Network.Contacts.Multiselect">
                            <Form.Label>Contactos <b style={{color:"red"}}>*</b></Form.Label>
                            <Select
                                value={contactsValueLabel}
                                placeholder='Seleccione Contactos'
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                onChange={selectContacts}
                                options={props.allContacts}
                                />
                        </Form.Group>
                    </Col>
               
                </Row>
                <Row>
                <Col sm={12} lg={4}>
                        <CrudButton type='create' name='Contacto' onClick={() => setModalCreate(true)}/>
                    </Col>
                </Row>
                {props.edit ? 
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Estado</Form.Label>
                                <DropdownState state={props.active} setActive={props.setActive}></DropdownState>
                        </Form.Group>
                    </Col>
                </Row>
                :
                <></>}
                
                <Row>
                    <Col>
                        <Form.Group>
                            {props.address_value !== "" && !showErrorMessage && validateSelect(props.type) && (props.contacts.length > 0) ?  
                                <><Button variant="primary" onClick={props.ifConfirm } >Guardar</Button></>
                                : 
                                <><Button variant="primary" disabled>Guardar</Button></> //disabled
                            }
                            <Button variant="primary" href="/networks">Cancelar</Button>
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
                                            <Card.Title as="h5">Contactos</Card.Title>
                                            <span className="d-block m-t-5">Crear contacto</span>
                                        </Col>
                                        <Col sm={12} lg={2}>                       
                                            <CloseButton aria-label='Cerrar' onClick={() => setModalCreate(false)} />
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                <FormCreateContact 
                                    name={supportedName} setName= {setSupportedName} 
                                    role={selectRol} setRole={setSelectRol} 
                                    priority={supportedPriority} setPriority={setSupportedPriority} 
                                    type={selectType} setType={setSelectType} 
                                    contact={supportedContact} setContact={setSupportedContact} 
                                    keypgp={supportedKey} setKey={setSupportedKey} 
                                    ifConfirm={createContact} ifCancel={() => setModalCreate(false)} />
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
