import React, { useState, useEffect } from 'react';
import { Button, Card, CloseButton, Col, Collapse, Modal, Row, Table} from 'react-bootstrap';
import { getPlaybook } from '../../api/services/playbooks';
import Alert from '../../components/Alert/Alert';
import CrudButton from '../../components/Button/CrudButton';
import FormCreateTask from './components/FormCreateTask';
import { postTask } from '../../api/services/tasks';
import RowTask from './components/RowTask';

const ListTask = (props) => { 

    const [tasks, setTasks] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    //Create Task
    const [modalCreate, setModalCreate] = useState(false)
    const [name, setName] = useState(''); //required
    const [priority, setPriority] = useState('0'); //required
    const [description, setDescription] = useState('');
    
    //Si table task elimina una tarea
    const [taskCreated, setTaskCreated] = useState(null);
    const [taskDeleted, setTaskDeleted] = useState(null);
    const [taskUpdated, setTaskUpdated] = useState(null);

    const [playbook, setPlaybook] = useState(null); //required

    useEffect( ()=> {
        getPlaybook(props.urlPlaybook)
        .then((response) => {
            setPlaybook(response.data)
            setTasks(response.data.tasks)
            console.log(response.data.tasks)
        })
        .catch(setError);

    }, [ taskCreated, taskUpdated, taskDeleted ]) //si hago un post o delete

    if (error) {
        console.log(error);
        return <p>Ups! Se produjo un error al buscar las tareas.</p>
    }

    const createTask = () => { //refactorizar al FormContact

        postTask (name, description, priority, props.urlPlaybook)
            .then((response) => { 
                console.log(response)
                console.log('se creo una tarea')
                setTaskCreated(response)
                setName('')
                setPriority('0')
                setDescription('')
                setModalCreate(false)
            })
            .catch((error) => {
                setError(error)
                console.log(error)
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
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>Prioridad</th>
                                            <th>Descripcion</th>
                                            <th>Accion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks ? tasks.map((urlTask, index) => {
                                            return (
                                                <RowTask url={urlTask} id={index+1} taskDeleted={taskDeleted} setTaskDeleted={setTaskDeleted} setTaskUpdated={setTaskUpdated} />)
                                            }) : <></>
                                        }
                                    </tbody>
                                </Table>
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
