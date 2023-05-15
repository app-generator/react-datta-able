import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/Navigation/Navigation'
import { validateName, validateDescription, validateType } from './components/ValidatorTaxonomy';
import { postTaxonomy, getAllTaxonomies } from '../../api/services/taxonomies';

const CreateTaxonomy = () => {
    const [type, setType] = useState("");
    const [name, setName] = useState("");    
    const [description, setDescription] = useState("");
    const [parent, setParent] = useState("");
    const [taxonomies, setTaxonomies] = useState([]);      
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false)    

    useEffect(() => {          
        getAllTaxonomies()
        .then((response) => {
            let listTaxonomies = []
            response.map((taxonomy) => {
                listTaxonomies.push({value:taxonomy.url, label:taxonomy.name})
            })
            setTaxonomies(listTaxonomies)
        })                          
    }, []);    
   

    const createTaxonomy = ()=> {
        let active = true
        postTaxonomy(type, name, description, active, parent)
        .then(() => {                       
            window.location.href = '/taxonomies';
        })
        .catch((error) => {
            setError(error);            
        })
        .finally(() => {
            setShowAlert(true) 
        })        
    };

    const resetShowAlert = () => {
        setShowAlert(false);
    }    


    return (
        <React.Fragment>
            <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>
            <Row>
                <Navigation actualPosition="Agregar taxonomia" path="/taxonomies" index ="Taxonomia"/>
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Taxonomia</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col sm={12} lg={4}>
                                        <Form.Group>
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control type="text" placeholder="Nombre" onChange={(e) => setName(e.target.value)} isValid={validateName(name)} isInvalid={!validateName(name)}/>
                                            {validateName(name) ? '' : <div className="invalid-feedback">Ingrese un nombre que contenga hasta 100 caracteres, solo letras y que no sea vacio</div>}
                                        </Form.Group>
                                    </Col>     
                                    <Col sm={12} lg={4}>
                                        <Form.Group>
                                            <Form.Label>Tipo</Form.Label>
                                            <Form.Control type="choice" as="select" value={type} onChange={(e) => setType(e.target.value)} isValid={validateType(type)} isInvalid={!validateType(type)} >                                                                     
                                                <option key={0} value=''>Seleccione</option>
                                                <option key={1} value='vulnerability'>Vulnerabilidad</option>
                                                <option key={2} value='incident'>Incidente</option>
                                            </Form.Control>
                                            {validateType(type) ? '' : <div className="invalid-feedback">Ingrese un tipo de taxonomia</div>} 
                                        </Form.Group>
                                    </Col>
                                    <Col sm={12} lg={4}>
                                            <Form.Group>
                                                <Form.Label>Padre</Form.Label>
                                                <Select options={taxonomies} onChange={(e) => setParent(e.value)} />
                                            </Form.Group>
                                    </Col>                           
                                </Row>
                                    <Row>
                                    <Col sm={12} lg={12}>
                                        <Form.Group> 
                                            <Form.Label>Descripcion</Form.Label>
                                            <Form.Control as="textarea" rows={3} placeholder="Descripcion" onChange={(e) => setDescription(e.target.value)}  isValid={validateDescription(description)} isInvalid={!validateDescription(description)} />
                                            {validateDescription(description) ? '' : <div className="invalid-feedback">Ingrese una descripcion que contenga hasta 250 caracteres y que no sea vacía</div>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group as={Col}>
                                    { validateType(type) && validateName(name) && validateDescription(description) ?
                                        <Button variant="primary" onClick={createTaxonomy}>Guardar</Button>                                    
                                        : 
                                        <Button variant="primary" disabled>Guardar</Button>                                    
                                    }
                                    <Button variant="info" href='/taxonomies'>Cancelar</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>                    
            </Row>           
        </React.Fragment>
    );
};

export default CreateTaxonomy;
