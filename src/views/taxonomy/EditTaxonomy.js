import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import DropdownState from '../../components/Dropdown/DropdownState'
import { useLocation } from "react-router-dom";
import Select from 'react-select';
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/Navigation/Navigation'
import { validateName, validateDescription, validateType, validateUnrequiredInput } from '../../utils/validators/taxonomy';
import { putTaxonomy, getTaxonomy, getAllTaxonomies } from '../../api/services/taxonomies';


const EditTaxonomy = () => {
    const location = useLocation();
    const fromState = location.state;
    const [taxonomy, setTaxonomy] = useState(fromState);  

    const [type, setType] = useState(taxonomy.type);
    const [name, setName] = useState(taxonomy.name);    
    const [description, setDescription] = useState(taxonomy.description);
    const [parent, setParent] = useState(taxonomy.parent);
    const [active, setActive] = useState(+taxonomy.active);
    const [taxonomies, setTaxonomies] = useState([]);      
    const [currentParent, setCurrentParent] = useState("")
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false) 

    useEffect(() => {                 
        getAllTaxonomies()
        .then((response) => {
            let listTaxonomies = []
            listTaxonomies.push({value:"", label:"Sin padre"})
            response.map((taxonomy) => {
                listTaxonomies.push({value:taxonomy.url, label:taxonomy.name})
            })
            setTaxonomies(listTaxonomies)             
        })    
        
        { (parent != undefined) ?
            getTaxonomy(parent)
            .then((response) => {
                setCurrentParent(response.data.name)                
            })          
            : setCurrentParent("Sin padre")    
        }          
    }, []);      
    

    const editTaxonomy = ()=> {        
        putTaxonomy(taxonomy.url, type, name, description, active, parent)
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
                <Navigation actualPosition="Editar taxonomia" path="/taxonomies" index ="Taxonomia"/> 
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
                                            <Form.Label>Nombre <b style={{color:"red"}}>*</b></Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                defaultValue={taxonomy.name} 
                                                onChange={(e) => setName(e.target.value)} 
                                                isInvalid={!validateName(name)}
                                            />
                                            {validateName(name) ? '' : <div className="invalid-feedback">Ingrese un nombre que contenga hasta 100 caracteres, solo letras y que no sea vacio</div>}
                                        </Form.Group>
                                    </Col>
                                    <Col sm={12} lg={1}>
                                        <Form.Group>
                                            <Form.Label>Estado</Form.Label>
                                            <DropdownState state={taxonomy.active} setActive={setActive}></DropdownState>
                                        </Form.Group>
                                    </Col>                                    
                                    <Col sm={12} lg={3}>
                                        <Form.Group>
                                            <Form.Label>Tipo <b style={{color:"red"}}>*</b></Form.Label>
                                            <Form.Control 
                                                type="choice" as="select" 
                                                value={type} 
                                                onChange={(e) => setType(e.target.value)} 
                                                isInvalid={!validateType(type)} 
                                            >                                                                     
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
                                            <Select options={taxonomies} onChange={(e) => setParent(e.value)} placeholder={currentParent} />
                                        </Form.Group>
                                    </Col>                                    
                                </Row>
                                <Row>                                
                                    <Col sm={12} lg={12}>
                                        <Form.Group>
                                            <Form.Label>Descripcion</Form.Label>
                                            <Form.Control 
                                                as="textarea" 
                                                rows={3} 
                                                defaultValue={taxonomy.description} 
                                                onChange={(e) => setDescription(e.target.value)}  
                                                isInvalid={(validateUnrequiredInput(description)) ? !validateDescription(description) : false} 
                                            />
                                            {validateDescription(description) ? '' : <div className="invalid-feedback">Ingrese una descripcion que contenga hasta 250 caracteres y que no sea vacía</div>}
                                        </Form.Group>
                                    </Col>
                                </Row>                               
                                <Form.Group as={Col}>
                                    { validateType(type) && validateName(name) ?
                                        <Button variant="primary" onClick={editTaxonomy}>Guardar</Button>                                    
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

export default EditTaxonomy;
