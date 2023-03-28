import React, { useEffect, useState } from 'react';
import {Button, Form, FormControl, Row} from 'react-bootstrap';
import { getPriorities } from '../../../api/services/priorities';
import { getTLP } from '../../../api/services/tlp';
import { getUsers } from '../../../api/services/users';
import { getState, getStates } from '../../../api/services/states';
import { validateAlphanumeric, validateSpace } from '../../../utils/validators'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const FormCase = (props) => { 
// props: ifConfirm, save, date, setDate, lifecycle, setLifecycle, priority, setPriority, tlp, setTlp
// state, setState
// put: commentarios, 
// evidencia (fran) artefacto?, solve_date, attend_date, eventos

//select
const [allPriorities, setPrioritiesOption] = useState([])
const [allTlp, setAllTlp] = useState([])
const [allUsers, setAllUsers] = useState([])
const [allStates, setAllStates] = useState([])
const [supportedStates, setsupportedStates] = useState([]) // state.children
const [eventsValueLabel, setEventsValueLabel] = useState([])
const [error, setError] = useState(false)


    useEffect(()=> {
        
        getStates()
            .then((response) => {
                setAllStates(response.data.results)
                console.log(response.data.results)
                if(props.edit) { //supportedStates
                    //supported states para el state actual
                    getState(props.state)
                    .then((response) => {
                        console.log('suported states')
                        console.log('response.date.children' + response.date.children)
                        let listSupportedStates = allStates.filter(item =>response.date.children.includes(item.url));
                        listSupportedStates.push(props.state)
                        console.log('listSupportedStates' + listSupportedStates)
                        setsupportedStates(listSupportedStates)
            
                    })
                    .catch((error)=>{
                        setError(error)
                    })
                
                }
            })
            .catch((error)=>{
                setError(error)
            })



        getPriorities()
        .then((response) => {
            setPrioritiesOption(Object.values(response.data.results))
            console.log(response.data.results)
        })
        .catch((error)=>{
            setError(error)
        })

        getTLP()
        .then((response) => {
            setAllTlp(response.data.results)
            console.log(response.data.results)
        })
        .catch((error)=>{
            setError(error)
        })

        getUsers()
        .then((response) => {
            setAllUsers(response.data.results)
            console.log(response.data.results)
        })
        .catch((error)=>{
            setError(error)
        })

        //selected events 
        let listDefaultEvents = props.allEvents.filter(elemento => props.events.includes(elemento.value))
        .map(elemento => ({value: elemento.value, label: elemento.label}));
        setEventsValueLabel(listDefaultEvents)

    },[])

    const allLifecycles = [
        {
            value: "manual",
            display_name: "Manual"
        },
        {
            value: "auto",
            display_name: "Auto"
        },
        {
            value: "auto_open",
            display_name: "Auto open"
        },
        {
            value: "auto_close",
            display_name: "Auto close"
        }
    ]
    
    console.log(props.state);

    //Multiselect    
    const selectEvents=(event)=>{ 
        props.setEvents(
            event.map((e)=>{
                return e.value 
            })
            )
        }

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();
    let dateTime = date+' '+time;
     
    return (
        <React.Fragment>
            <Form>
                <Form.Group controlId="Form.Case.Date">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control type="datetime-local" //2023-03-24T01:40:14.181622Z 
                        value={props.date} //yyyy-mm-ddThh:mm
                        min="2000-01-01T00:00" max="2030-01-01T00:00" 
                        isInvalid={props.date == null}
                        isValid={props.date !== null}
                        onChange={(e) =>  props.setDate(e.target.value)}/>
                </Form.Group> 

                <Form.Group controlId="Form.Case.Lifecycle">
                    <Form.Label>Ciclo de vida</Form.Label>
                        <Form.Control
                            name="lifecycle"
                            type="choice"                                            
                            as="select"
                            value={props.lifecycle}
                            isInvalid={props.lifecycle == '0'}
                            isValid={props.lifecycle !== '0'}
                            onChange={(e) =>  props.setLifecycle(e.target.value)}>
                            <option value='0'>Seleccione</option>
                            {allLifecycles.map((lifecycleItem, index) => {                
                                return (
                                    <option key={index} value={lifecycleItem.value}>{lifecycleItem.display_name}</option>
                                );
                            })}
                        </Form.Control>
                        {props.lifecycle ? '' : <div className="invalid-feedback">Seleccione el ciclo de vida</div>}
                </Form.Group>

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
                            {allPriorities.map((priorityItem, index) => {                
                                return (
                                    <option key={index} value={priorityItem.url}>{priorityItem.name}</option>
                                );
                            })}
                        </Form.Control>
                        {props.priority ? '' : <div className="invalid-feedback">Seleccione la prioridad</div>}
                </Form.Group>

                <Form.Group controlId="Form.Case.Tlp">
                    <Form.Label>TLP</Form.Label>
                        <Form.Control
                            name="tlp"
                            type="choice"                                            
                            as="select"
                            value={props.tlp}
                            isInvalid={props.tlp == '0'}
                            isValid={props.tlp !== '0'}
                            onChange={(e) =>  props.setTlp(e.target.value)}>
                            <option value='0'>Seleccione</option>
                            {allTlp.map((tlpItem, index) => {                
                                return (
                                    <option key={index} value={tlpItem.url}>{tlpItem.name}</option>
                                );
                            })}
                        </Form.Control>
                        {props.tlp ? '' : <div className="invalid-feedback">Seleccione</div>}
                </Form.Group>

                <Form.Group controlId="Form.Case.Assigned">
                    <Form.Label>Asignado</Form.Label>
                        <Form.Control
                            name="assigned"
                            type="choice"                                            
                            as="select"
                            value={props.assigned}
                            onChange={(e) =>  props.setAssigned(e.target.value)}>
                            <option value={null}>Sin designar</option>
                            {allUsers.map((userItem, index) => {                
                                return (
                                    <option key={index} value={userItem.url}>{userItem.username}</option>
                                );
                            })}
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId="Form.Case.State">
                    <Form.Label>Estado</Form.Label>
                        <Form.Control
                            name="state"
                            type="choice"                                            
                            as="select"
                            value={props.state}
                            isInvalid={props.state == '0'}
                            isValid={props.state !== '0'}
                            onChange={(e) =>  props.setState(e.target.value)}>
                            <option value='0'>Seleccione</option>
                            {props.edit ?
                            supportedStates.map((stateItem, index) => {                
                                return (
                                    <option key={index} value={stateItem.url}>{stateItem.name}</option>
                                );
                            })
                        :
                        
                        
                        allStates.map((stateItem, index) => {                
                            return (
                                <option key={index} value={stateItem.url}>{stateItem.name}</option>
                            );
                        })}
                        </Form.Control>
                        {props.state ? '' : <div className="invalid-feedback">Seleccione el estado</div>}
                </Form.Group>

                <Form.Group controlId="Form.Case.Comments">
                    <Form.Label>Comentarios ???</Form.Label>
                <Form.Control placeholder="Comentarios" />
                </Form.Group>

                <Form.Group controlId="Form.Case.Evidences">
                    <Form.Label>Evidencias ???</Form.Label>
                <Form.Control placeholder="Evidencias" />
                </Form.Group>

                <Form.Group controlId="Form.Case.Events.Multiselect">
                    <Form.Label>Eventos</Form.Label>
                        <Select
                            value={eventsValueLabel}
                            placeholder='Seleccione Eventos'
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            onChange={selectEvents}
                            options={props.allEvents}
                        />
                    </Form.Group>

                <Form.Group controlId="Form.Case.Attend_date">
                    <Form.Label>Fecha de atencion</Form.Label>
                    <Form.Control type="datetime-local"
                        value={props.attend_date} //yyyy-mm-ddThh:mm
                        min="2000-01-01T00:00" max="2030-01-01T00:00" 
                        onChange={(e) =>  props.setAttend_date(e.target.value)}/>
                </Form.Group> 

                <Form.Group controlId="Form.Case.Solve_date">
                    <Form.Label>Fecha de resolucion</Form.Label>
                    <Form.Control type="datetime-local"
                        value={props.solve_date} //yyyy-mm-ddThh:mm
                        min="2000-01-01T00:00" max="2030-01-01T00:00" 
                        onChange={(e) =>  props.setSolve_date(e.target.value)}/>
                </Form.Group> 
                {!props.date || !props.lifecycle || !props.priority || !props.tlp || !props.state ? 
                    <><Button variant="primary" disabled>{props.save}</Button></> 
                    : 
                    <><Button variant="primary" onClick={props.ifConfirm}>{props.save}</Button></>}
                <Button variant="primary" href="/case/tables">Cancelar</Button>
            </Form>  
        </React.Fragment>
    );
};
            
export default FormCase;
