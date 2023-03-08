import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert/Alert';
import CrudButton from '../../components/Button/CrudButton';
import Navigation from '../../components/navigation/navigation';
import Search from '../../components/search/search';

const ListPlaybook = () => {

    const action = () => {
        console.log("llamada backend")
      }
    
    return (
    <React.Fragment>
        <Row>
            <Navigation actualPosition={'Playbook'}/>  
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Search type="playbook" action={action} />
                            <Col sm={12} lg={3}>
                            <Link to={{pathname:'/playbook/create'}} >
                                    <CrudButton type='create' name='Playbook' />
                                </Link>
                            </Col> 
                        </Row>
                    </Card.Header>
                    <Card.Body>

                    </Card.Body>
                    <Card.Footer >

                    </Card.Footer>
                </Card>
                <Alert/>
            </Col>
        </Row>
    </React.Fragment>
)}

export default ListPlaybook; 
