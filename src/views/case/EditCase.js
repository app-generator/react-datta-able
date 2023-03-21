import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import { putEntity } from '../../api/services/entities';
import FormEntity from './components/FormCase';
import Navigation from '../../components/navigation/navigation';

const EditCase = () => {
    const entity = useLocation().state;
    const [name, setName] = useState(entity.name);
    const [active, setActive] = useState(entity.active);
    const [error, setError] = useState(null);

    const slugify = (str) => {
        return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '_')
      .replace(/^-+|-+$/g, '')
    }

    //Update
    const editCase = () => {
        let slug = slugify(name); //backend
        putEntity(entity.url, name, slug, active)
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
                <Navigation actualPosition="Editar Entidad" path="/entity/tables" index ="Entidades"/>
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
                                        ifConfirm={editCase} edit={true} />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                {/*<Alert/>*/}
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default EditCase;
