import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import { postEntity } from '../../api/services/entities';
import FormEntity from './components/Form/FormEntity';
import Navigation from '../../components/navigation/navigation';

const CreateEntity = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(null)

    const slugify = (str) => {
        return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '_')
      .replace(/^-+|-+$/g, '')
    }

    //Create
    const addEntity = () => {
        let slug = slugify(name);
        postEntity(name, slug, 1)
        .then((response) => { 
            console.log(response)
            window.location.href = "/entity/tables"
        })
        .catch((error) => {
            setError(error)
            console.log(error)
        });    
    };
       
    return (
        <React.Fragment>
            <Row>
                <Navigation actualPosition="Crear Entidad" path="/entity/tables" index ="Entidades"/>
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Entidades</Card.Title>
                            <span className="d-block m-t-5">Agregar Entidad</span>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={12} lg={12}>
                                    <FormEntity name={name} setName={setName} ifConfirm={addEntity}/>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Alert/>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CreateEntity;
