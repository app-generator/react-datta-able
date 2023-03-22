import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Table, Modal, CloseButton, Spinner } from 'react-bootstrap';
import CrudButton from '../../../components/Button/CrudButton';
import { getCase, deleteCase } from '../../../api/services/cases';
import { getPriorities } from '../../../api/services/priorities';
import { getTLP } from '../../../api/services/tlp';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import BadgeItem from '../../../components/Button/BadgeItem';

const TableCase = ({callback, list, loading }) => {
    
    const [cases, setCases] = useState('') 
    const [error, setError] = useState(null) 

    const [modalShow, setModalShow] = useState(false) 
    const [modalDelete, setModalDelete] = useState(false) 
    const [lastItem, setLastItem] = useState(null) 

    const [url, setUrl] = useState(null) 
    const [id, setId] = useState(null) 
    const [date, setDate] = useState(null) 


    const [prioritiesOption, setPrioritiesOption] = useState([]) //op 1
    const [prioritiesOption2, setPrioritiesOption2] = useState([]) //op 2
    const [tlpOption, setTlpOption] = useState({}) 

    useEffect(() => {

        getPriorities()
            .then((response) => {
                console.log(response.data.results)
                //op 1
                setPrioritiesOption(response.data.results)

                //op 2
                let priorityOp = {}
                response.data.results.map((item) => {
                    priorityOp[item.url] = {name: item.name, color: item.color}
                })
                setPrioritiesOption2(priorityOp)
            })
            .catch((error)=>{
                setError(error)
            })
        
            getTLP()
            .then((response) => {
                console.log(response.data.results)
                let tlpOp = {}
                response.data.results.map((item) => {
                    tlpOp[item.url] = {name: item.name, color: item.color}
                })
                setTlpOption(tlpOp)
            })
            .catch((error)=>{
                setError(error)
            })

    },[]);

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    }
    
    //Read Case
    const showCase = (url)=> {
        setId(url.split('/')[(url.split('/')).length-2]);
        setUrl(url)
        setCases('')
        getCase(url)
        .then((response) => {
            console.log(response.data)
            setCases(response.data)
            let datetime = response.data.date.split('T')
            setDate(datetime[0] + ' ' + datetime[1].slice(0,8))
            setModalShow(true)
        })
        .catch(setError);
    };

    //Remove Case
    const Delete = (url) => {
        setLastItem(list.length === 1)
        setUrl(url)
        setModalDelete(true)
    }
    
    const removeCase = (url)=> {
        console.log('Elimna ultimo elemento? '+ lastItem)
        deleteCase(url)
            .then((response) => {
                console.log(response);
                callback(lastItem)
            })
            .catch((error) => {
                console.log(error)
                setError(error)
                callback(false)
            })
            .finally(() => {
                setModalDelete(false)
            })
        };
    
    return (
            <React.Fragment>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Fecha</th>
                            <th>Prioridad</th>
                            <th>TLP</th>
                            <th>Estado</th>
                            <th>Asignado</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((caseItem, index) => {
                            let datetime = caseItem.date.split('T');
                            let fecha = datetime[0] + ' ' + datetime[1].slice(0,8)
                            let idItem = caseItem.url.split('/')[(caseItem.url.split('/')).length-2] 
                            return (
                                list &&
                                <tr key={caseItem.url}>
                                    <th scope="row">{idItem}</th>
                                    <td>{fecha}</td>
                                    <td>
                                        <BadgeItem item={prioritiesOption2[caseItem.priority]}/>
                                    </td>
                                    <td>
                                        <BadgeItem item={tlpOption[caseItem.tlp]}/>
                                    </td>
                                    <td>{caseItem.state}</td>
                                    <td>{caseItem.assigned ? caseItem.assigned : 'Aun no fue asignado'}</td>
                                    <td>
                                        <CrudButton type='read' onClick={() => showCase(caseItem.url)} />
                                        <Link to={{pathname:'/case/edit', state: caseItem, callback: callback}} >
                                            <CrudButton type='edit'/>
                                        </Link>
                                        <CrudButton type='delete' onClick={() => Delete(caseItem.url)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>

                <Modal size='lg' show={modalShow} onHide={() => setModalShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>            
                <Modal.Body>
                    <Row>    
                        <Col>                 
                            <Card>
                                <Card.Header> 
                                    <Row>
                                        <Col>
                                            <Card.Title as="h5">Casos</Card.Title>
                                            <span className="d-block m-t-5">Detalle del caso</span>
                                        </Col>
                                        <Col sm={12} lg={3}>                       
                                            <Link to={{pathname:'/case/edit', state:cases}} >
                                                <CrudButton type='edit'/>
                                            </Link>
                                            <CloseButton aria-label='Cerrar' onClick={() => setModalShow(false)} />
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    <Table responsive >
                                        <tbody>
                                            <tr>
                                                <td>Id del sistema</td>
                                                <td>
                                                    <Form.Control plaintext readOnly defaultValue={id} />
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Fecha</td>
                                                <td>
                                                    <Form.Control plaintext readOnly defaultValue={date} />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>Prioridad</td>
                                                <td>
                                                    <BadgeItem item={prioritiesOption2[cases.priority]}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>TLP</td>
                                                <td>
                                                    <BadgeItem item={tlpOption[cases.tlp]}/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col> 
                    </Row>
                </Modal.Body>
            </Modal>
            
            <ModalConfirm type='delete' component='Caso' name='el caso' showModal={modalDelete} onHide={() => setModalDelete(false)} ifConfirm={() => removeCase(url)}/>

        </React.Fragment> 
  );
};

export default TableCase;
