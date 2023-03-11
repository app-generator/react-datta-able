import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/navigation/navigation';
import FormCreateTask from './components/Form/FormCreateTask';
import { postTask } from '../../api/services/tasks';

const CreateTask = () => {

    const [name, setName] = useState(''); //required
    const [priority, setPriority] = useState('0'); //required
    const [playbook, setPlaybook] = useState('0'); //required
    const [description, setDescription] = useState(null);
    const [error, setError] = useState(null);

    const createTask = () => { //refactorizar al FormContact

        postTask (name, description, priority, playbook)
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
                        <span className="d-block m-t-5">Agregar Tarea</span>
                    </Card.Header>
                    <Card.Body>
                        <FormCreateTask 
                            name={name} setName= {setName} 
                            priority={priority} setPriority={setPriority} 
                            description={description} setDescription={setDescription} 
                            playbook={playbook} setPlaybook={setPlaybook} 
                            ifConfirm={createTask} ifCancel={() => window.location.href = "/task/tables"} />
                    </Card.Body>
                    <Card.Footer >

                    </Card.Footer>
                </Card>
            {/*<Alert/>*/}
            </Col>
        </Row>
    </React.Fragment>
)}

export default CreateTask; 
