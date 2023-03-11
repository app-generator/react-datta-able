import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/navigation/navigation';
import FormCreateTask from './components/Form/FormCreateTask';
import { putTask } from '../../api/services/tasks';

const EditTask = () => {

    const task = useLocation().state;

    const [url, setUrl] = useState(task.url); //required
    const [name, setName] = useState(task.name); //required
    const [priority, setPriority] = useState(task.priority); //required
    const [playbook, setPlaybook] = useState(task.playbook); //required
    const [description, setDescription] = useState(task.description);
    const [error, setError] = useState(null);

    const editTask = () => { //refactorizar al FormContact

        putTask (url, name, description, priority, playbook)
            .then((response) => { 
                console.log(response)
                window.location.href = "/task/tables"
            })
            .catch((error) => {
                setError(error)
                console.log(error)
            });    
    };

    return (
    <React.Fragment>
        <Row>
            <Navigation actualPosition="Crear Tarea" path="/task/tables" index ="Tarea"/>
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Tarea</Card.Title>
                        <span className="d-block m-t-5">Editar Tarea</span>
                    </Card.Header>
                    <Card.Body>
                        <FormCreateTask 
                            name={name} setName= {setName} 
                            priority={priority} setPriority={setPriority} 
                            description={description} setDescription={setDescription} 
                            playbook={playbook} setPlaybook={setPlaybook} 
                            ifConfirm={editTask} ifCancel={() => window.location.href = "/task/tables"} />
                    </Card.Body>
                    <Card.Footer >

                    </Card.Footer>
                </Card>
            {/*<Alert/>*/}
            </Col>
        </Row>
    </React.Fragment>
)}

export default EditTask; 
