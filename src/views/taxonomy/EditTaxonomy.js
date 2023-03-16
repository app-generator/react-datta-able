import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import DropdownState from '../taxonomy/components/DropdownState';
import { useLocation } from "react-router-dom";
import { putTaxonomy, getAllTaxonomies } from '../../api/services/taxonomies';
import { validateName, validateDescription } from './components/ValidatorTaxonomy';
import Navigation from '../../components/Navigation/Navigation'

const EditTaxonomy = () => {
    const location = useLocation();
    const taxonomy = location.state.taxonomy;

    const[slug, setSlug] = useState (taxonomy.slug);
    const [type, setType] = useState(taxonomy.type);
    const [name, setName] = useState(taxonomy.name);    
    const [description, setDescription] = useState(taxonomy.description);
    const [parent, setParent] = useState(taxonomy.parent);
    const [active, setActive] = useState(+taxonomy.active);
    const [taxonomies, setTaxonomies] = useState([]);      


    const [error, setError] = useState(null);

    useEffect(() => {  
       
        getAllTaxonomies().then((response) => {setTaxonomies(response)})    
               
    }, []);  

    const editTaxonomy = ()=> {        
        putTaxonomy(taxonomy.url, slug, type, name, description, active, parent).then((response) => {
            console.log(response);            
            window.location.href = '/app/taxonomies';
        })
        .catch((error) => {
            setError(error);            
        })        
    };


    return (
        <React.Fragment>
            <Row>
                <Navigation actualPosition="Editar taxonomia" path="/app/taxonomies" index ="Taxonomia"/> 
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Taxonomia</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group as={Col}>
                                    <Form.Label>Tipo</Form.Label>
                                    <Form.Control type="choice" as="select" value={type} onChange={(e) => setType(e.target.value)} isInvalid={type === ''} isValid={type !== ''} >
                                        <option key={0} value=''>Seleccione</option>
                                        <option key={1} value='vulnerability'>Vulnerabilidad</option>
                                        <option key={2} value='incident'>Incidente</option>
                                    </Form.Control>
                                </Form.Group>
                                                                
                                <Form.Group as={Col}>
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" defaultValue={taxonomy.name} onChange={(e) => setName(e.target.value)} isValid={validateName(name)} isInvalid={!validateName(name)}/>
                                    {validateName(name) ? '' : <div className="invalid-feedback">Ingrese un nombre que contenga hasta 100 caracteres, solo letras y que no sea vacio</div>}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Descripcion</Form.Label>
                                    <Form.Control as="textarea" rows={3} defaultValue={taxonomy.description} onChange={(e) => setDescription(e.target.value)}  isValid={validateDescription(description)} isInvalid={!validateDescription(description)} />
                                    {validateDescription(description) ? '' : <div className="invalid-feedback">Ingrese una descripcion que contenga hasta 250 caracteres y que no sea vacía</div>}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Estado</Form.Label>
                                    <DropdownState state={taxonomy.active} setActive={setActive}></DropdownState>
                                </Form.Group> 
                               
                                <Form.Group as={Col}>
                                    <Form.Label>Padre</Form.Label>
                                    <Form.Control type="choice" as="select" value={parent} onChange={(e) => setParent(e.target.value)} isInvalid={parent === ''} isValid={parent !== ''} >
                                        <option key={0} value=''>Seleccione</option>
                                            {taxonomies.sort((a, b) => (a.name < b.name ? -1 : 1)).map((taxonomy, i) => (
                                                <option  key={i+1} value={taxonomy.url} > {taxonomy.name} </option>
                                            ))} 
                                    </Form.Control>
                                </Form.Group>
                      

                                { validateName(name) && validateDescription(description) ?
                                    <Button variant="primary" onClick={editTaxonomy}>Guardar</Button>                                    
                                    : 
                                    <Button variant="primary" disabled>Guardar</Button>                                    
                                }                                 

                                <Button variant="info" href='/app/taxonomies'>Cancelar</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>                    
            </Row>           
        </React.Fragment>
    );
};

export default EditTaxonomy;
