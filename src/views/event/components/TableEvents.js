import React,{ useState} from 'react'
import {
  Button,Card, Table , Modal, Row,Col, Form, CloseButton, Spinner
} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { deletePriority } from "../../../api/services/priorities";
import CrudButton from '../../../components/Button/CrudButton';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import PriorityButton from './PriorityButton'; 
import { getTaxonomy } from '../../../api/services/taxonomy';
import { getPriority } from '../../../api/services/priorities';
import { getTLPSpecific } from '../../../api/services/tlp';
import { getFeed } from '../../../api/services/feeds';
import { deleteEvent} from "../../../api/services/events";




const TableEvents = ({events, taxonomy, loading, loadingTaxonomy}) => {

    const [deleteName, setDeleteName] = useState()
    const [deleteUrl, setDeleteUrl] = useState()
    const [remove, setRemove] = useState()
    const [error, setError] = useState(null);
    const [event, setEvent] = useState({});
    const [modalShow, setModalShow] = useState(false);
    console.log(taxonomy)
    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    }
    
    const callback = (url ,setPriority) => {
        getTaxonomy(url)
        .then((response) => {
            console.log(response)
            setPriority(response.data)
        })
        .catch();
    }
    const callbackTlp = (url ,setPriority) => {
        getTLPSpecific(url)
        .then((response) => {
            console.log(response)
            setPriority(response.data)
        })
        .catch();
    }
    const callbackFeed = (url ,setPriority) => {
        getFeed(url)
        .then((response) => {
            console.log(response)
            setPriority(response.data)
        })
        .catch();
    }
    const callbackPriority = (url ,set) => {
        getPriority(url)
        .then((response) => {
            console.log(response)
            set(response.data)
        })
        .catch();
    }

    const modalDelete = (name, url)=>{
        setDeleteName(name)
        setDeleteUrl(url) 
        setRemove(true)
    }

    const handleDelete = () => {
        console.log(deleteUrl)
        deleteEvent(deleteUrl).then((response) => {
            console.log(response)
            callback(`El usuario ${deleteName} ha sido eliminado`, true)
        })
        .catch((error) => {
            console.log(error)
            setError(error)
            callback(`El usuario ${deleteName} NO ha sido eliminado`, false)
        })
        .finally(() => {
            setRemove(false)
        })
    }
    const showModalEvent = (event) => {
        setEvent(event)
        setModalShow(true)
       
      }
    
  return (
    <div>
         <Card>
        <Card.Body>
            <ul className="list-group my-4">
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fecha</th>
                            <th>TLP</th>
                            <th>Taxonomia</th>
                            <th>Fuente de Informacion</th>
                            <th>Opciones</th>
                        </tr>
                   </thead>
                    <tbody>
                    {events.map((event, index) => {
                        return (
                            <tr>
                                <th >{index + 1 }</th>
                                <td>{event.date ? event.date.slice(0,10): ""}</td>
                                
                                <td><PriorityButton url={event.tlp} callback={callbackTlp}/></td>
                                
                                <td><PriorityButton url={event.taxonomy} callback={callback}/></td>
                                
                                <td><PriorityButton url={event.feed} callback={callbackFeed}/></td>
                                
                                <td>
                                <CrudButton  type='read'  onClick={() => showModalEvent(event)} />
                                
                                <Link to={{pathname:"./edit-event", state: {event}}} >
                                    <CrudButton  type='edit' />
                                </Link>
                                    <CrudButton  type='delete' onClick={()=>modalDelete(event.name, event.url)} />
                                </td>
                                
                              </tr>
                              )
                        })}
        <ModalConfirm type='delete' component='Estado' name={deleteName} showModal={remove} onHide={() => setRemove(false)} ifConfirm={() => handleDelete(deleteUrl)}/> 

                    </tbody>
                </Table>
                      </ul>
                      <ModalConfirm type='delete' component='Estado' name={deleteName} showModal={remove} onHide={() => setRemove(false)} ifConfirm={() => handleDelete(deleteUrl)}/>    

<Modal size='lg' show={modalShow} onHide={() => setModalShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>            
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
                                        <Link to={{pathname:"./edit-user/", state: {event}}} >
                                            <CrudButton  type='edit' />
                                        </Link>
                                        <CloseButton aria-label='Cerrar' onClick={() => setModalShow(false)} />
                                    </Col>
                                </Row>         
                            </Card.Header>
                            <Card.Body>
                                <Table responsive >
                                    <tr>
                                        <td>Evidencia</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={ event.evidence} />
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Comentarios</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={ event.comments } />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Cidr</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={ event.cidr} />
                                        </td>
                                    </tr>
                                    
                                    
                                    <tr>
                                        <td>Dominio</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={event.domain } />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fecha</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={event.date ? event.date.slice(0,10) : ""} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Prioridad</td>
                                        <td>
                                        <PriorityButton url={event.priority} callback={callbackPriority}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tlp</td>
                                        <td>
                                            <PriorityButton url={event.tlp} callback={callbackTlp}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Taxonomia</td>
                                        <td>
                                            <PriorityButton url={event.taxonomy} callback={callback}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fuentes de informacion</td>
                                        <td>
                                        <PriorityButton url={event.feed} callback={callbackFeed}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Creado</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={event.created ? event.created.slice(0,10) : ""} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>modificado</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={event.modified ? event.modified.slice(0,10) : ""} />
                                        </td>
                                    </tr>
                                    
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col> 
                </Row>
            </Modal.Body>            
        </Modal>
                </Card.Body>  
     </Card>
    </div>
  )
}

export default TableEvents