import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Collapse, Row } from 'react-bootstrap'; 
import Alert from '../../components/Alert/Alert';
import { postPlaybook, putPlaybook } from '../../api/services/playbooks';
import FormCreatePlaybook from '../playbook/components/FormCreatePlaybook';
import { getAllTaxonomies } from '../../api/services/taxonomies';
import ListTask from '../task/ListTask';
import Navigation from '../../components/Navigation/Navigation';

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

        },[sectionAddTask])

    const createPlaybook = () => {
        postPlaybook (name, taxonomy)
        .then((response) => { 
            console.log(response.data)
            
            setUrl(response.data.url) // y la url
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
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Playbook</Card.Title>
                            <span className="d-block m-t-5">Agregar Playbook</span>
                        </Card.Header>
                        <Card.Body>
                            <FormCreatePlaybook
                                name={name} setName={setName}
                                taxonomy={taxonomy} setTaxonomy={setTaxonomy} 
                                ifConfirm={!sectionAddTask ? createPlaybook : editPlaybook} 
                                allTaxonomies={allTaxonomies} 
                                save= {!sectionAddTask ? 'POST' : 'PUT'} />
                        </Card.Body>
                    </Card>

                    <ListTask urlPlaybook={url} sectionAddTask={sectionAddTask}/>

                    {/*<Alert />*/}
                </Col>
            </Row>
    </React.Fragment>
)}

export default CreatePlaybook; 
