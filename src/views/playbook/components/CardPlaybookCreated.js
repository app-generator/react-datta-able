import React, { useEffect } from 'react';
import { Card, Col, Collapse, Form, Table, Row } from 'react-bootstrap';
import FormGetName from '../../../components/Form/FormGetName';
import { getTaxonomy } from '../../../api/services/taxonomy';

const CardPlaybookCreated = (props) => { //playbook, sectionAddTask

    useEffect(()=>{},[props.playbook])

    return (
        props.playbook &&
        <React.Fragment>
            <Collapse in={props.sectionAddTask}>
                <div id="basic-collapse">
                    <Card>
                        <Card.Header> 
                            <Row>
                                <Col>
                                    <Card.Title as="h5">Playbook</Card.Title>
                                    <span className="d-block m-t-5">Datos del playbook creado</span>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive >
                                <tbody>
                                    {props.playbook.name ? 
                                        <tr>
                                            <td>Nombre</td>
                                            <td>
                                                <Form.Control plaintext readOnly defaultValue={props.playbook.name} />
                                            </td>
                                        </tr>
                                        : 
                                        <></>
                                    }
                                    {props.playbook.taxonomy && props.playbook.taxonomy.length > 0  ? 
                                            <tr>
                                                <td>Taxonomias</td>
                                                <td>
                                                    {Object.values(props.playbook.taxonomy).map((taxonomyItem, index)=>{
                                                        return (
                                                            <FormGetName form={true} get={getTaxonomy} url={taxonomyItem} key={index} />
                                                            )})
                                                        }
                                                </td>
                                            </tr>
                                            : 
                                            <></>
                                        }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
            </Collapse>
        </React.Fragment> 
  );
};

export default CardPlaybookCreated;
