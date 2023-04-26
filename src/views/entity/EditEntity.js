import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import { putEntity } from '../../api/services/entities';
import FormEntity from './components/FormEntity';
import Navigation from '../../components/Navigation/Navigation';

const EditEntity = () => {
    const entity = useLocation().state;
    const [name, setName] = useState(entity.name);
    const [active, setActive] = useState(entity.active);
    const [error, setError] = useState(null);

    //Update
    const editEntity = () => {
        putEntity(entity.url, name, active)
        .then((response) => { 
            window.location.href = "/entities"
        })
        .catch((error) => {
            setError(error)
        });    
    };

    return (
        <React.Fragment>          
            <Row>
                <Navigation actualPosition="Editar Entidad" path="/entities" index ="Entidades"/>
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Entidades</Card.Title>
                            <span className="d-block m-t-5">Editar Entidad</span>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={12} >
                                    <FormEntity 
                                        name={name} setName={setName} 
                                        active={active} setActive={setActive}
                                        ifConfirm={editEntity} edit={true} />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default EditEntity;
