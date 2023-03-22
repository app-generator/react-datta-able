import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import { putCase } from '../../api/services/cases';
import FormCase from './components/FormCase';
import Navigation from '../../components/navigation/navigation';

const CreateCase = () => {
    const [url, setUrl] = useState(null) //

    const [date, setDate] = useState(null) //
    const [lifecycle, setLifecycle] = useState(null) //
    const [parent, setParent] = useState(null)
    const [priority, setPriority] = useState(null) //
    const [tlp, setTlp] = useState(null) //
    const [assigned, setAssigned] = useState(null)
    const [state, setState] = useState(null) //
    const [error, setError] = useState(null)

    //Edit
    const editCase = () => {
        putCase(url, date, lifecycle, parent, priority, tlp, assigned, state)
        .then((response) => { 
            console.log(response)
            //window.location.href = "/case/tables"
        })
        .catch((error) => {
            setError(error)
            console.log(error)
        });    
    };
       
    return (
        <React.Fragment>
            <Row>
                <Navigation actualPosition="Editar Caso" path="/case/tables" index ="Casos"/>
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Casos</Card.Title>
                            <span className="d-block m-t-5">Editar Caso</span>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={12} lg={12}>
                                    <FormCase 
                                        ifConfirm={editCase} edit={true} save='PUT'/>
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

export default CreateCase;
