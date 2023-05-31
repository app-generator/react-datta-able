import React, { useEffect, useState } from 'react';
import { Button, Card, CloseButton, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import Navigation from '../../components/Navigation/Navigation';
import { useLocation } from 'react-router-dom';
import GetUserName from './components/GetUserName';
import { getUser } from '../../api/services/users';
import BadgeItem from '../../components/Button/BadgeItem';
import { getImage } from '../../api/services/cases';
import ViewFiles from './components/ViewFiles';

const ReadCase = () => { 
    //attend_date: por defecto +3horas 

    const caseItem = useLocation().item;
    const prioritiesOption = useLocation().priority;
    const tlpOption = useLocation().tlp;
    const stateOption = useLocation().state;

    const [id, setId] = useState('');
    const [date, setDate] = useState('');
    const [attend_date, setAttend_Date] = useState('');
    const [solve_date, setSolve_Date] = useState('');
    const [created, setCreated] = useState('');
    const [modified, setModified] = useState('');
    const [error, setError] = useState(null)

    const [modalShowEvent, setModalShowEvent] = useState(false);
    const [modalShowEvidence, setModalShowEvidence] = useState(false);
    
    const [image, setImage] = useState(null);
    
    useEffect (() => {
        
        if(caseItem) {
            let idItem = caseItem.url.split('/')[(caseItem.url.split('/')).length-2]
            setId(idItem)

            let datetime = caseItem.created.split('T');
            setCreated(datetime[0] + ' ' + datetime[1].slice(0,8))
            datetime = caseItem.modified.split('T');
            setModified(datetime[0] + ' ' + datetime[1].slice(0,8))

            if(caseItem.date){
                let datetime = caseItem.date.split('T');
                setDate(datetime[0] + ' ' + datetime[1].slice(0,8))
            }
            if(caseItem.attend_date){
                let datetime = caseItem.attend_date.split('T');
                setAttend_Date(datetime[0] + ' ' + datetime[1].slice(0,8))
            }
            if(caseItem.solve_date){
                let datetime = caseItem.solve_date.split('T');
                setSolve_Date(datetime[0] + ' ' + datetime[1].slice(0,8))
            }
    }
}, []) 

    return (
        caseItem &&
        <React.Fragment>
            <Row>
                <Navigation actualPosition="Detalle" path="/cases/view" index ="Casos"/>
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Principal</Card.Title>
                        </Card.Header>
                        <Card.Body> 
                             <Table responsive >
                                <tbody>
                                    <tr>
                                        <td>Id del sistema</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={id} />
                                        </td>
                                        <td>Prioridad</td>
                                        <td>
                                            <BadgeItem item={prioritiesOption[caseItem.priority]}/>
                                        </td>
                                        <td>TLP</td>
                                        <td>
                                            <BadgeItem item={tlpOption[caseItem.tlp]}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ciclo de vida</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={caseItem.lifecycle} />
                                        </td>
                                        <td>Estado</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={stateOption[caseItem.state].name} />
                                        </td>
                                        <td>Asignado</td>
                                        {caseItem.assigned ? 
                                        <td>
                                            <GetUserName form={true} get={getUser} url={caseItem.assigned} />
                                        </td>
                                        :
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue='Sin asignar' />
                                        </td> 
                                    }
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Fechas</Card.Title>
                        </Card.Header>
                        <Card.Body> 
                            <Table responsive >
                                <tbody>
                                    <tr>
                                        <td>date?</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={date} />
                                        </td>
                                        <td>Atencion</td>
                                        {caseItem.attend_date ? 
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={attend_date} />
                                        </td>
                                        :
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue='No atendido' />
                                        </td> 
                                    }
                                        
                                        <td>Resolucion</td>
                                        {caseItem.solve_date ? 
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={solve_date} />
                                        </td>
                                        :
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue='No resuelto' />
                                        </td> 
                                    }
                                    </tr>
                                    <tr>
                                        <td>Creacion</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={created} />
                                        </td>
                                        <td>Modificacion</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={modified} />
                                        </td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    {caseItem.evidence.length > 0 
                    ?
                    <Card>
                        <Card.Header>    
                            <Card.Title as="h5">Evidencias</Card.Title>              
                        </Card.Header>
                        <Card.Body>
                            {caseItem.evidence.map((url, index) => {
                                console.log(url)
                                return  (<ViewFiles url={url} index={index+1}  />)
                            })}
                        </Card.Body>
                    </Card>
                    : <></>}

                    {caseItem.events.length > 0 ?
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Eventos</Card.Title>
                            </Card.Header>
                            <Card.Body> 
                                <Row>
                                    <Col sm={6} lg={3}>Link</Col>
                                    <Col><Form.Control plaintext readOnly defaultValue={caseItem.events}/></Col>
                                    <Col sm={6} lg={2}>
                                        <Button 
                                            size="sm"
                                            className='text-capitalize'
                                            variant='light'
                                            title='Ir'
                                            onClick={() => setModalShowEvent(true)}>
                                            <i class="fas fa-external-link-alt"/>
                                        </Button> 
                                    </Col>
                                </Row>
                            </Card.Body> 
                        </Card>
                        :<></>}
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Informacion Adicional</Card.Title>
                            </Card.Header>
                            <Card.Body> 
                                <Row>
                                    <Col sm={6} lg={3}>
                                        Comentarios
                                    </Col>
                                    <Col>
                                        <Form.Control plaintext readOnly defaultValue={caseItem.comments} />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        {caseItem.children.length > 0 ?                        
                            <Card>
                            <Card.Header>
                                <Card.Title as="h5">Children</Card.Title>
                            </Card.Header>
                            <Card.Body> 
                                <Row>
                                    <Col sm={6} lg={3}>Children</Col>
                                    <Col>
                                        <Form.Control plaintext readOnly defaultValue={caseItem.children}/>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    :<></>}
                    <Button variant="primary" href="/cases">Volver</Button>
                </Col>
            </Row>
            
            <Modal size='lg' show={modalShowEvent} onHide={() => setModalShowEvent(false)} aria-labelledby="contained-modal-title-vcenter" centered>            
                <Modal.Body>
                    <Row>    
                        <Col>                 
                            <Card>
                                <Card.Header> 
                                    <Row>
                                        <Col>
                                            <Card.Title as="h5">Evento</Card.Title>
                                            <span className="d-block m-t-5">Detalle de Evento</span>
                                        </Col>
                                        <Col sm={12} lg={4}>                       
                                            <CloseButton aria-label='Cerrar' onClick={() => setModalShowEvent(false)} />
                                        </Col>
                                    </Row>         
                                </Card.Header>
                                <Card.Body>Informacion del evento</Card.Body>
                            </Card>
                        </Col> 
                    </Row>
                </Modal.Body>            
            </Modal>
            <Modal size='lg' show={modalShowEvidence} onHide={() => setModalShowEvidence(false)} aria-labelledby="contained-modal-title-vcenter" centered>            
                <Modal.Body>
                    <Row>    
                        <Col>                 
                            <Card>
                                <Card.Header> 
                                    <Row>
                                        <Col>
                                            <Card.Title as="h5">Evidencias</Card.Title>
                                            <span className="d-block m-t-5">Detalle de Evidencias</span>
                                        </Col>
                                        <Col sm={12} lg={4}>                       
                                            <CloseButton aria-label='Cerrar' onClick={() => setModalShowEvidence(false)} />
                                        </Col>
                                    </Row>         
                                </Card.Header>
                                <Card.Body>Informacion de la evidencia</Card.Body>
                            </Card>
                        </Col> 
                    </Row>
                </Modal.Body>            
            </Modal>

        </React.Fragment>
    );
};

export default ReadCase;
