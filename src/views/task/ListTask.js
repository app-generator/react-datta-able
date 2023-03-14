import React, { useState, useEffect } from 'react';
import { Button, Card, CloseButton, Col, Collapse, Row, Modal} from 'react-bootstrap';
import { getAllTasks } from '../../api/services/tasks';
import Alert from '../../components/Alert/Alert';
import CrudButton from '../../components/Button/CrudButton';
import TableTask from './components/Table/TableTask';
import FormCreateTask from './components/Form/FormCreateTask';
import { postTask } from '../../api/services/tasks';


const ListTask = (props) => { 

    const [tasks, setTasks] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    //Create Task
    const [modalCreate, setModalCreate] = useState(false)
    const [name, setName] = useState(''); //required
    const [priority, setPriority] = useState('0'); //required
    const [playbook, setPlaybook] = useState('0'); //required
    const [description, setDescription] = useState(null);

    useEffect( ()=> {

        getAllTasks()
            .then((response) => {
                setTasks(response.data.results);
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })

        setPlaybook({url: 'url', name: 'playbook'})
    }, [])

    if (error) {
        console.log(error);
        return <p>Ups! Se produjo un error al buscar los contactos.</p>
    }

    const createTask = () => { //refactorizar al FormContact

        postTask (name, description, priority, playbook)
            .then((response) => { 
                console.log(response)
            })
            .catch((error) => {
                setError(error)
                console.log(error)
            })
            .finally(() => {
                setModalCreate(true)
            })
    };

    return (
    <React.Fragment>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col sm={12} lg={9}>
                                <Card.Title as="h5">Tareas</Card.Title>
                                <span className="d-block m-t-5">Lista de Tareas</span>
                            </Col>
                            <Col sm={12} lg={3}>
                                {props.sectionAddTask ? 
                                <CrudButton type='create' name='Tarea' onClick={() => setModalCreate(true)} />
                                :
                                <><Button variant="outline-primary" disabled>Agregar Tarea</Button></> 
                                }
                            </Col>
                        </Row>
                    </Card.Header>

                    <Collapse in={props.sectionAddTask}>
                        <div id="basic-collapse">
                            <Card.Body>
                                <TableTask list={tasks} loading={loading} />
                                {/*
                                <Row>
                                    <Col sm={12} lg={9} />
                                    <Col sm={12} lg={3}>
                                        <CrudButton type='create' name='Tarea' onClick={() => setModalCreate(true)} />
                                    </Col> 
                                </Row>
                                    */}
                            </Card.Body>
                        </div>
                    </Collapse>
                </Card>
            {/*<Alert/>*/}
            </Col>
        </Row>

        <Modal size='lg' show={modalCreate} onHide={() => setModalCreate(false)} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
                <Row>    
                    <Col>                 
                        <Card>
                        <Card.Header> 
                                <Row>
                                    <Col>
                                        <Card.Title as="h5">Tareas</Card.Title>
                                        <span className="d-block m-t-5">Crear tarea</span>
                                    </Col>
                                    <Col sm={12} lg={2}>                       
                                        <CloseButton aria-label='Cerrar' onClick={() => setModalCreate(false)} />
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                            <FormCreateTask 
                                name={name} setName= {setName} 
                                priority={priority} setPriority={setPriority} 
                                description={description} setDescription={setDescription} 
                                playbook={playbook}
                                ifConfirm={createTask} ifCancel={() => setModalCreate(false)} />
                            </Card.Body>
                        </Card>
                    </Col> 
                </Row>
            </Modal.Body>
        </Modal>
    </React.Fragment>
)}

export default ListTask; 
