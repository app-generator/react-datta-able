import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap'; 
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/navigation/navigation';
import { postPlaybook } from '../../api/services/playbooks';
import FormCreatePlaybook from '../playbook/components/Form/FormCreatePlaybook';
import { getAllTaxonomies } from '../../api/services/taxonomy';

const CreatePlaybook = () => {

    const [name, setName] = useState('');
    const [taxonomy, setTaxonomy] = useState([]);
    const [taxonomiesOption, setTaxonomiesOption] = useState([])
    //Renderizar
    const [taxonomyCreated, setTaxonomyCreated] = useState(null)

    const [error, setError] = useState(null);

    useEffect(()=> {

        getAllTaxonomies()
            .then((response) => {
                setTaxonomiesOption(response.data.results)
                console.log(response.data.results)
            })
            .catch((error)=>{
                setError(error)
            })

        },[taxonomyCreated])



    const createPlaybook = () => {

        postPlaybook (name, taxonomy)
            .then((response) => { 
            console.log(response)
            console.log('create playbook - post .then')
            //window.location.href = "/playbook/tables"
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
                                taxonomiesOption={taxonomiesOption} setTaxonomyCreated={setTaxonomyCreated}
                                ifConfirm={createPlaybook} />
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Tareas</Card.Title>
                            <span className="d-block m-t-5">Lista de Tareas</span>
                        </Card.Header>
                    </Card>
                    {/*<Alert />*/}
                </Col>
            </Row>
    </React.Fragment>
)}

export default CreatePlaybook; 
