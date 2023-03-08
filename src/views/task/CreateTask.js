import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/navigation/navigation';
import { getAllTaxonomies } from '../../api/services/taxonomy'; 

const CreateTask = () => {

    const [taxonomies, setTaxonomies] = useState();
    const [error, setError] = useState(null);


    getAllTaxonomies()
    .then((response) => {
        setTaxonomies(response.data.results)
        console.log(response.data.results)
    })
    .catch((error)=>{
        setError(error)
    })


    return (
    <React.Fragment>
        <Row>
            <Navigation actualPosition="Crear Tarea" path="/task/tables" index ="Tarea"/>
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Header>

                    </Card.Header>
                    <Card.Body>

                    </Card.Body>
                    <Card.Footer >

                    </Card.Footer>
                </Card>
            {/*<Alert/>*/}
            
            </Col>
        </Row>
    </React.Fragment>
)}

export default CreateTask; 
