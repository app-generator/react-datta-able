import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap'; 
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/navigation/navigation';
import { postPlaybook } from '../../api/services/playbooks';
import FormCreatePlaybook from '../playbook/components/Form/FormCreatePlaybook';
import { getAllTaxonomies } from '../../api/services/taxonomy';
import ListTask from '../task/ListTask';

const CreatePlaybook = () => {

    const [name, setName] = useState('');
    const [taxonomy, setTaxonomy] = useState([]);
    
    //Renderizar
    const [taxonomiesOption, setTaxonomiesOption] = useState([])
    const [taxonomyCreated, setTaxonomyCreated] = useState(null)

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

        },[taxonomyCreated])

    const labelTaxonomy = {
        vulnerability : 'Vulnerabilidad',
        incident : 'Incidente',
    };

    const createPlaybook = () => {

        postPlaybook (name, taxonomy)
            .then((response) => { 
            console.log(response.data)
            console.log('create playbook - post .then')
            window.location.href = "/playbook/tables"
        })
        .catch((error) => {
            setError(error)
            console.log(error)
        })

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
                                ifConfirm={createPlaybook} 
                                taxonomiesOption={taxonomiesOption} 
                                setTaxonomyCreated={setTaxonomyCreated} />
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Tareas</Card.Title>
                            <span className="d-block m-t-5">Lista de Tareas</span>
                        </Card.Header>
                        <Card.Body>
                            <ListTask inCard={true} />
                        </Card.Body>
                    </Card>
                    {/*<Alert />*/}
                </Col>
            </Row>
    </React.Fragment>
)}

export default CreatePlaybook; 
