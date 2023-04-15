import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { postEntity } from '../../api/services/entities';
import FormEntity from './components/FormEntity';
import Navigation from '../../components/Navigation/Navigation';

const CreateEntity = () => {
    const [name, setName] = useState('')
    const active = 1; //se crea activo por defecto
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
        postEntity(name, slug, active)
        .then((response) => { 
            window.location.href = "/entity/tables"
        })
        .catch((error) => {
            setError(error)
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
                                    <FormEntity 
                                        name={name} setName={setName} 
                                        ifConfirm={addEntity} edit={false} />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CreateEntity;
