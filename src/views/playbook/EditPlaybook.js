import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap'; 
import { putPlaybook } from '../../api/services/playbooks';
import FormCreatePlaybook from '../playbook/components/FormCreatePlaybook';
import { getAllTaxonomies } from '../../api/services/taxonomies';
import ListTask from '../task/ListTask';
import Navigation from '../../components/Navigation/Navigation';
import Alert from '../../components/Alert/Alert';


const EditPlaybook = () => {
    const location = useLocation();
    const fromState = location.state;
    const [playbook, setPlaybook] = useState(fromState);

    const [url, setUrl] = useState(playbook.url);
    const [name, setName] = useState(playbook.name);
    const [taxonomy, setTaxonomy] = useState(playbook.taxonomy); 

    //Dropdown
    const [allTaxonomies, setAllTaxonomies] = useState([])
    
    //Alert
    const [showAlert, setShowAlert] = useState(false);

    useEffect(()=> {
        getAllTaxonomies()
            .then((response) => {
                console.log(response)
                //allTaxonomies
                let listAllTaxonomies = []
                response.map((taxonomyItem)=>{
                    listAllTaxonomies.push({value:taxonomyItem.url, label:taxonomyItem.name + ' (' + labelTaxonomy[taxonomyItem.type] + ')'})
                })
                setAllTaxonomies(listAllTaxonomies)
            })
            .catch((error)=>{
                console.log(error)
            })

        },[])

        const labelTaxonomy = {
        vulnerability : 'Vulnerabilidad',
        incident : 'Incidente',
    };


    const editPlaybook = () => {
        putPlaybook (url, name, taxonomy)
            .then()
            .catch(() => {
                setShowAlert(true)
                })
    };
   
    return (
    <React.Fragment>
        <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)}/>
        <Row>
            <Navigation actualPosition="Editar Playbook" path="/playbooks" index ="Playbook"/>
        </Row>

            <Row>
                <Col>
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
                    
                    <ListTask urlPlaybook={url} sectionAddTask={true}/>

                    <Button variant="primary" href="/playbooks">Volver</Button>
                </Col>
            </Row>
    </React.Fragment>
)}

export default EditPlaybook;    
