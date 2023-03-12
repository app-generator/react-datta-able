import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Breadcrumb } from 'react-bootstrap';
import DropdownState from '../taxonomy/components/DropdownState';
import { postTaxonomy } from '../../api/services/taxonomy';
import { validateName, validateDescription } from './components/ValidatorTaxonomy';
import { getTaxonomies } from '../../api/services/taxonomy';

const NewTaxonomy = () => {

    const[slug, setSlug] = useState ("");
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [active, setActive] = useState(1);
    const [description, setDescription] = useState("");
    const [parent, setParent] = useState("");
    const [taxonomies, setTaxonomies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);   


    const [error, setError] = useState(null);

    useEffect(() => {        
        getAllTaxonomies(currentPage)       
        
    }, []);    

    const getAllTaxonomies = (currentPage)=> {
       getTaxonomies(currentPage)
       .then((response) => {
            setTaxonomies(response.data.results)  
            setCurrentPage(currentPage++) 
            getAllTaxonomies(currentPage)
        })              
    };

    const createTaxonomy = ()=> {
        postTaxonomy(slug, type, name, description, active, parent).then((response) => {
            console.log(response);            
            window.location.href = '/app/taxonomy';
        })
        .catch((error) => {
            setError(error);            
        })        
    };


    return (
        <React.Fragment>
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href='/app/dhasboard/default'>
                        <i className="fas fa-home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href='/app/taxonomy'>
                        Taxonomia
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href='#' active>
                        <b>Crear taxonomia</b> 
                    </Breadcrumb.Item>
                </Breadcrumb>    
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
                                    <Form.Control type="text" placeholder="Nombre" onChange={(e) => setName(e.target.value)} isValid={validateName(name)} isInvalid={!validateName(name)}/>
                                    {validateName(name) ? '' : <div className="invalid-feedback">Ingrese un nombre que contenga hasta 100 caracteres, solo letras y que no sea vacio</div>}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Descripcion</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Descripcion" onChange={(e) => setDescription(e.target.value)}  isValid={validateDescription(description)} isInvalid={!validateDescription(description)} />
                                    {validateDescription(description) ? '' : <div className="invalid-feedback">Ingrese una descripcion que contenga hasta 250 caracteres y que no sea vacía</div>}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Estado Inicial</Form.Label>
                                    <DropdownState state={active} setActive={setActive}></DropdownState>
                                </Form.Group>        

                                <Form.Group as={Col}>
                                    <Form.Label>Padre</Form.Label>
                                    <Form.Control type="choice" as="select" value={parent} onChange={(e) => setParent(e.target.value)} isInvalid={parent === ''} isValid={parent !== ''} >
                                        <option key={0} value=''>Seleccione</option>
                                            {taxonomies.map((taxonomy, i) => (
                                                <option  key={i+1} value={taxonomy.url} > {taxonomy.name} </option>
                                            ))} 
                                    </Form.Control>
                                </Form.Group>
                      

                                { validateName(name) && validateDescription(description) ?
                                    <Button variant="primary" onClick={createTaxonomy}>Guardar</Button>                                    
                                    : 
                                    <Button variant="primary" disabled>Guardar</Button>                                    
                                }                                 

                                <Button variant="info" href='/app/taxonomy'>Cancelar</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>                    
            </Row>           
        </React.Fragment>
    );
};

export default NewTaxonomy;
