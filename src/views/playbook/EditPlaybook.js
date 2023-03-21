import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap'; 
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/navigation/navigation';
import { putPlaybook } from '../../api/services/playbooks';
import FormCreatePlaybook from '../playbook/components/FormCreatePlaybook';
import { getAllTaxonomies } from '../../api/services/taxonomy';
import ListTask from '../task/ListTask';

const EditPlaybook = () => {

    const playbook = useLocation().state;

    const [url, setUrl] = useState(playbook.url);
    const [name, setName] = useState(playbook.name);
    const [taxonomy, setTaxonomy] = useState(playbook.taxonomy); //enviar con el formato value, label

    //Dropdown
    const [allTaxonomies, setAllTaxonomies] = useState([])
    const [taxonomiesDefaultValue, setTaxonomiesDefaultValue] = useState([])
    const [indexes, setIndexes] = useState([]);

    const [error, setError] = useState(null);

    useEffect(()=> {

        getAllTaxonomies()
            .then((response) => {
                //allTaxonomies
                let listAllTaxonomies = []
                response.data.results.map((taxonomyItem)=>{
                    listAllTaxonomies.push({value:taxonomyItem.url, label:taxonomyItem.name + ' (' + labelTaxonomy[taxonomyItem.type] + ')'})
                })
                setAllTaxonomies(listAllTaxonomies)
                
                //selected taxonomies 
                let listDefaultTaxonomies = listAllTaxonomies.filter(elemento => taxonomy.includes(elemento.value))
                .map(elemento => ({value: elemento.value, label: elemento.label}));
                setTaxonomiesDefaultValue(listDefaultTaxonomies)
/*               
                //index de taxonomias seleccionadas
                const indexOfTaxonomiesSelected = getIndex(listAllTaxonomies, taxonomy);
                setIndexes(indexOfTaxonomiesSelected); 

                let listaIndex = [];
                indexOfTaxonomiesSelected.map((index)=>{
                    listaIndex.push(listAllTaxonomies[index])
                })
                setTaxonomiesDefaultValue(listaIndex)
*/
                console.log(response.data.results)
            })
            .catch((error)=>{
                setError(error)
            })

        },[])

        const getIndex = (allTaxonomies, selectedTaxonomies) => {
            return selectedTaxonomies.map((url) => allTaxonomies.findIndex((tax) => tax.value === url));
        }

        const labelTaxonomy = {
        vulnerability : 'Vulnerabilidad',
        incident : 'Incidente',
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
   
    return (
    <React.Fragment>
        <Row>
            <Navigation actualPosition="Editar Playbook" path="/playbook/tables" index ="Playbook"/>
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
                                taxonomy={taxonomiesDefaultValue} setTaxonomy={setTaxonomiesDefaultValue} 
                                ifConfirm={editPlaybook} 
                                allTaxonomies={allTaxonomies}
                                save='PUT' />
                        </Card.Body>
                    </Card>
                    
                    <ListTask urlPlaybook={url} sectionAddTask={true}/>

                    {/*<Alert />*/}
                    <Button variant="primary" href="/playbook/tables">Volver</Button>
                </Col>
            </Row>
    </React.Fragment>
)}

export default EditPlaybook;    
