import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/Navigation/Navigation';
import { useLocation } from 'react-router-dom';
import GetUserName from './components/GetUserName';
import { getUser } from '../../api/services/users';
import BadgeItem from '../../components/Button/BadgeItem';

const ReadCase = () => { 
    //attend_date: por defecto +3horas 

    const caseItem = useLocation().item;
    const prioritiesOption = useLocation().priority;
    const tlpOption = useLocation().tlp;
    const stateOption = useLocation().state;

    const [id, setId] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState(null)

    useEffect (() => {
        
        if(caseItem) {
            let idItem = caseItem.url.split('/')[(caseItem.url.split('/')).length-2]
            setId(idItem)
            let datetime = caseItem.date.split('T');
            setDate(datetime[0] + ' ' + datetime[1].slice(0,8))
        }
        
    }, []) 

    return (
        caseItem &&
        <React.Fragment>
            <Row>
                <Navigation actualPosition="Detalle" path="/case/tables" index ="Casos"/>
            </Row>
            <Row>
                <Col sm={12}>
                    <Card> 
                        <Card.Header>
                            <Card.Title as="h5">Casos</Card.Title>
                            <span className="d-block m-t-5">Detalle del caso</span>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive >
                                <tbody>
                                    <tr>
                                        <td>Id del sistema</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={id} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fecha (date)</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={date} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Prioridad</td>
                                        <td>
                                            <BadgeItem item={prioritiesOption[caseItem.priority]}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>TLP</td>
                                        <td>
                                            <BadgeItem item={tlpOption[caseItem.tlp]}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Asignado</td>
                                    {caseItem.assigned ? 
                                        <td>
                                            <GetUserName form={true} get={getUser} url={caseItem.assigned} />
                                        </td>
                                        :
                                        <td>
                                            Sin asignar
                                        </td> 
                                    }
                                    </tr>
                                    <tr>
                                        <td>Estado</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={stateOption[caseItem.state].name} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ciclo de vida</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={caseItem.lifecycle} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Comentarios</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={caseItem.comments.map(item => {
                                                <tr>item</tr>
                                            })} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Evidencia</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={caseItem.evidence.map(item => {
                                                <tr>item</tr>
                                            })} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Eventos</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={caseItem.events.map(item => {
                                                <tr>{item}</tr>
                                            })} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fecha de atencion (attend_date)</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={caseItem.attend_date} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fecha de resolucion (solve_date)</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={caseItem.solve_date} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fecha de creacion (create)</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={caseItem.created} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fecha de modificacion (modified)</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={caseItem.modified} />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer className="text-right">
                            <Button variant="primary" href="/case/tables">Volver</Button>
                        </Card.Footer>
                    </Card>
                {/*<Alert/>*/}
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ReadCase;
