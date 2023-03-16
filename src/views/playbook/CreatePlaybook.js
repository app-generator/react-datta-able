import React, { useState, useEffect } from 'react';
import { Card, Col, Collapse, Row } from 'react-bootstrap'; 
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/navigation/navigation';
import { postPlaybook } from '../../api/services/playbooks';
import FormCreatePlaybook from '../playbook/components/FormCreatePlaybook';
import { getAllTaxonomies } from '../../api/services/taxonomy';
import ListTask from '../task/ListTask';
import CardPlaybookCreated from './components/CardPlaybookCreated';

const CreatePlaybook = () => {

    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [taxonomy, setTaxonomy] = useState([]);
    
    //Renderizar
    const [taxonomiesOption, setTaxonomiesOption] = useState([]) //lista con formato para multiselect value, label

    //Collapse
    const [sectionAddTask, setSectionAddTask] = useState(false);

    const [playbookCreated, setPlaybookCreated] = useState(null) //el pb que se creo

    const [error, setError] = useState(null);

    useEffect(()=> {

        getAllTaxonomies()
            .then((response) => {
                let listTaxonomies = []
                response.data.results.map((taxonomyItem)=>{
                    listTaxonomies.push({value:taxonomyItem.url, label:taxonomyItem.name + ' (' + labelTaxonomy[taxonomyItem.type] + ')'})
                })
                setTaxonomiesOption(listTaxonomies)
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
            setPlaybookCreated(response.data) //guardo el playbook
            setUrl(response.data.url) // y la url
            console.log('create playbook - Abrir Tareas')
            setSectionAddTask(true)
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
                                        taxonomiesOption={taxonomiesOption} />
                                </Card.Body>
                            </Card>
                        </div>
                    </Collapse>

                        <CardPlaybookCreated playbook={playbookCreated} sectionAddTask={sectionAddTask} />

                    
                        <ListTask urlPlaybook={url} sectionAddTask={sectionAddTask}/>

                    {/*<Alert />*/}
                </Col>
            </Row>
    </React.Fragment>
)}

export default CreatePlaybook; 
