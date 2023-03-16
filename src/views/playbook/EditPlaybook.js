import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap'; 
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/navigation/navigation';
import { putPlaybook } from '../../api/services/playbooks';
import FormCreatePlaybook from '../playbook/components/FormCreatePlaybook';
import { getAllTaxonomies } from '../../api/services/taxonomy';

const EditPlaybook = () => {

    const playbook = useLocation().state;

    const [url, setUrl] = useState(playbook.url);
    const [name, setName] = useState(playbook.name);
    const [taxonomy, setTaxonomy] = useState(playbook.taxonomy);

    //Dropdown
    const [taxonomiesOption, setTaxonomiesOption] = useState([])
    //Renderizar
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

        },[])

    const labelTaxonomy = {
        vulnerability : 'Vulnerabilidad',
        incident : 'Incidente',
    };

    const editPlaybook = () => {

        putPlaybook (url, name, taxonomy)
            .then((response) => { 
            console.log(response)
            console.log('edit playbook - post .then')
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
            <Navigation actualPosition="Editar Playbook" path="/playbook/tables" index ="Playbook"/>
        </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Playbook</Card.Title>
                            <span className="d-block m-t-5">Editar Playbook</span>
                        </Card.Header>
                        <Card.Body>
                             <FormCreatePlaybook
                                name={name} setName={setName}
                                taxonomy={taxonomy} setTaxonomy={setTaxonomy} 
                                taxonomiesOption={taxonomiesOption}
                                ifConfirm={editPlaybook} />
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

export default EditPlaybook; 
