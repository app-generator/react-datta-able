import React, { useState, useEffect } from 'react';
import {Button, Card, CloseButton, Col, Row, Form, Modal} from 'react-bootstrap';
import { getAllEntities } from '../../../api/services/entities';
import { getAllNetworks } from '../../../api/services/networks';
import CrudButton from '../../../components/Button/CrudButton';
import FormCreateContact from '../../contact/components/FormCreateContact';
import { postContact } from '../../../api/services/contacts';
import { validateSpace, validateCidr, validateURL, validateSpaces } from '../../../utils/validators'; 
import Alert from '../../../components/Alert/Alert';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import DropdownState from '../../../components/Dropdown/DropdownState';

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
    const [selectRol, setSelectRol] = useState('0');
    const [supportedPriority, setSupportedPriority] = useState('0');
    const [supportedContact, setSupportedContact] = useState('');
    const [supportedKey, setSupportedKey] = useState(null);
    const [selectType, setSelectType] = useState('0');

    useEffect(()=> {
        
        //selected contacts 
        let listDefaultContact = props.allContacts.filter(elemento => props.contacts.includes(elemento.value))
        .map(elemento => ({value: elemento.value, label: elemento.label}));
        setContactsValueLabel(listDefaultContact)
        
        getAllEntities()
            .then((response) => {
                setEntitiesOption(response.data.results)
                console.log(response.data.results)
            })
            .catch((error)=>{
                setError(error)
            })
    
        getAllNetworks()
            .then((response) => {
                setNetworksOption(response.data.results)
                console.log(response.data.results)
            })
            .catch((error)=>{
                setError(error)
            })
        
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
        console.log(props.allContacts);

    //Create Contact
    const createContact = () => { //refactorizar al FormContact

        postContact (supportedName, supportedContact, supportedKey, selectType, selectRol, supportedPriority)
        .then((response) => { 
            console.log(response)
            //window.location.href = "/contact/tables"
            props.setContactsCreated(response) //
            setModalCreate(false) //
        })
        .catch((error) => {
            setError(error)
            console.log(error)
        });    
    };

    return (
        <React.Fragment>
            {/*<Alert/>*/}
            <Form>
                <Row>
                    <Col sm={12} lg={12}>
                        <Form.Group controlId="Form.Network.Cidr">
                            <Form.Label>Cidr</Form.Label>
                            <Form.Control 
                                type="cidr" 
                                placeholder="CIDR" 
                                maxlength="18"
                                value={props.cidr} 
                                isValid={ validateCidr(props.cidr) && validateSpace(props.cidr) }
                                isInvalid={ !validateSpace(props.cidr) || !validateCidr(props.cidr) }
                                onChange={(e) => props.setCidr(e.target.value)}
                                />
                            {!props.cidr || validateCidr(props.cidr) ? "" : <div className="invalid-feedback">Ingrese un cidr valido</div>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={12}>
                        <Form.Group controlId="Form.Network.Type">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control
                                name="type"
                                type="choice"
                                as="select"
                                value={props.type}
                                onChange={(e) =>  props.setType(e.target.value)}
                                isInvalid={props.type === '0'}
                                isValid={props.type !== '0'}
                                >
                                    <option key={0} value='0'>Seleccione</option>
                                    <option key={1} value='internal'>Interna</option>
                                    <option key={2} value='external'>Externa</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={12}>
                        <Form.Group controlId="Form.Network.Domain">
                            <Form.Label>Dominio</Form.Label>
                            <Form.Control 
                                type="domain" 
                                placeholder="Dominio" 
                                maxlength="100"
                                value={ props.domain } 
                                isValid={ validateURL(props.domain) || validateSpaces(props.domain) }
                                isInvalid={ props.domain!='' && !validateURL(props.domain) }
                                onChange={ (e) => props.setDomain(e.target.value) } 
                            />
                            {props.domain!='' && !validateURL(props.domain) ? <div className="invalid-feedback">Ingrese caracteres validos</div> : ''}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={12}>
                        <Form.Group controlId="Form.Network.Parent">
                            <Form.Label>Red Padre</Form.Label>
                            <Form.Control
                                name="parent"
                                type="choice"
                                as="select"
                                value={props.parent}
                                onChange={(e) => props.setParent(e.target.value)}>
                                    {props.edit ? '' : <option key={0} value={null}> </option>}
                                    {networksOption.map((net, index) => {   
                                        return (
                                            <option key={index} value={net.cidr}>{net.cidr}</option>
                                        )})}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={12}>
                        <Form.Group controlId="Form.Network.Entity">
                            <Form.Label>Entidad Relacionada</Form.Label>
                            <Form.Control
                                name="entity"
                                type="choice"
                                as="select"
                                value={props.network_entity}
                                onChange={(e) => props.setNetwork_entity(e.target.value)}>
                                    {props.edit ? '' : <option key={0} value={null}> </option>}
                                    {entitiesOption.map((entityItem, index) => {                
                                        return (
                                            <option key={index} value={entityItem.value}>{entityItem.name}</option>
                                        );
                                    })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={12}>
                        <Form.Group controlId="Form.Network.Contacts.Multiselect">
                            <Form.Label>Contactos Relacionados</Form.Label>
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
                    <Col>
                        <CrudButton type='create' name='Contacto' onClick={() => setModalCreate(true)}/>
                    </Col>
                </Row>
                {props.edit ? 
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Estado</Form.Label>
                                <DropdownState state={props.active===1} setActive={props.setActive}></DropdownState>
                        </Form.Group>
                    </Col>
                </Row>
                :
                <></>}
                <Row>
                    <Col sm={12} lg={8} />
                    <Col>
                        <Form.Group>
                            { validateCidr(props.cidr) && (validateURL(props.domain) || props.domain==='') && 
                            (props.type != '0') && (props.contacts.length > 0) ? // 
                                <><Button variant="primary" onClick={props.ifConfirm } >Guardar</Button></>
                                : 
                                <><Button variant="primary" disabled>Guardar</Button></> 
                            }
                            <Button variant="primary" href="/network/tables">Cancelar</Button>
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
