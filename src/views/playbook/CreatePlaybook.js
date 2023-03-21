import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Collapse, Row } from 'react-bootstrap'; 
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/navigation/navigation';
import { postPlaybook, putPlaybook } from '../../api/services/playbooks';
import FormCreatePlaybook from '../playbook/components/FormCreatePlaybook';
import { getAllTaxonomies } from '../../api/services/taxonomy';
import ListTask from '../task/ListTask';

const CreatePlaybook = () => {

    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [taxonomy, setTaxonomy] = useState([]);
    
    //Renderizar
    const [allTaxonomies, setTaxonomies] = useState([]) //lista con formato para multiselect value, label

    //Collapse
    const [sectionAddTask, setSectionAddTask] = useState(false);

    const [error, setError] = useState(null);

    useEffect(()=> {

        getAllTaxonomies()
            .then((response) => {
                let listTaxonomies = []
                response.data.results.map((taxonomyItem)=>{
                    listTaxonomies.push({value:taxonomyItem.url, label:taxonomyItem.name + ' (' + labelTaxonomy[taxonomyItem.type] + ')'})
                })
                setTaxonomies(listTaxonomies)
                console.log(response.data.results)
            })
            .catch((error)=>{
                setError(error)
            })

        },[])

    const createPlaybook = () => {
        postPlaybook (name, taxonomy)
        .then((response) => { 
            console.log(response.data)
            
            setUrl(response.data.url) // y la url
            console.log('create playbook - Abrir Tareas')
            setSectionAddTask(true)
        })
        .catch((error) => {
            setError(error)
            console.log(error)
        })
    };

    const editPlaybook = () => {
        putPlaybook (url, name, taxonomy)
            .then((response) => { 
            console.log(response)
            
            console.log('edit playbook - post .then')
        })
        .catch((error) => {
            setError(error)
            console.log(error)
        })
    };

    const labelTaxonomy = {
        vulnerability : 'Vulnerabilidad',
        incident : 'Incidente',
    };

    return (
    <React.Fragment>
        <Row>
            <Navigation actualPosition="Agregar Playbook" path="/playbook/tables" index ="Playbook"/>
        </Row>
            <Row>
                <Col sm={12}>
                    <Collapse in={!sectionAddTask}>
                        <div id="basic-collapse">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h5">Playbook</Card.Title>
                                    <span className="d-block m-t-5">Agregar Playbook</span>
                                </Card.Header>
                                <Card.Body>
                                    <FormCreatePlaybook
                                        name={name} setName={setName}
                                        taxonomy={taxonomy} setTaxonomy={setTaxonomy} 
                                        ifConfirm={createPlaybook} 
                                        allTaxonomies={allTaxonomies} 
                                        save='POST' />
                                </Card.Body>
                            </Card>
                        </div>
                    </Collapse>

                    <Collapse in={sectionAddTask}>
                        <div id="basic-collapse">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h5">Playbook</Card.Title>
                                    <span className="d-block m-t-5">Editar Playbook</span>
                                </Card.Header>
                                <Card.Body>
                                    <FormCreatePlaybook
                                        name={name} setName={setName}
                                        taxonomy={taxonomy} setTaxonomy={setTaxonomy} 
                                        ifConfirm={editPlaybook} 
                                        allTaxonomies={allTaxonomies}
                                        save='PUT' />
                                </Card.Body>
                            </Card>
                        </div>
                    </Collapse>

                    <ListTask urlPlaybook={url} sectionAddTask={sectionAddTask}/>

                    {/*<Alert />*/}
                    <Button variant="primary" href="/playbook/tables">Volver</Button>

                </Col>
            </Row>
    </React.Fragment>
)}

export default CreatePlaybook; 
