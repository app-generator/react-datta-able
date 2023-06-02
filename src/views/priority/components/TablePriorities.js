import React,{ useState} from 'react'
import {
  Button,Card, Table , Modal, Row,Col, Form, CloseButton, Spinner
} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { deletePriority } from "../../../api/services/priorities";
import CrudButton from '../../../components/Button/CrudButton';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import Alert from '../../../components/Alert/Alert';


const TablePriorities = ({Priorities, loading}) => {
    const [remove, setRemove] = useState(false);
    const [deleteName, setDeleteName] = useState("");
    const [deleteUrl, setDeleteUrl] = useState("");
    const [error, setError] = useState(null);
    const [priority, setPriority] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false)

    const resetShowAlert = () => {
        setShowAlert(false);
    }
   
    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    }
  
    const handleShow = (name, url) => {

        setDeleteName(name)
        setDeleteUrl(url) 
        setRemove(true)
      }

    const handleDelete = () => {
        deletePriority(deleteUrl).then(() => {
            window.location.href = '/priorities';
          })
          .catch((error) => {
            setShowAlert(true)
            setError(error);
          })
    }
      const showModalPriority = (priority) => {

        setPriority(priority)
        setModalShow(true)
       
      }
  return (
   <div>
    <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>

            <ul className="list-group my-4">
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Fecha limite de respuesta</th>
                            <th>Fecha limite de resolucion </th>
                            <th>Opciones</th>
                        </tr>
                   </thead>
                    <tbody>
                       {Priorities.map((priority, index) => {
                        return (
                            <tr>
                                <th >{index + 1 }</th>
                                <td>{priority.name}</td>
                                <td>{priority.attend_time}</td>
                                <td>{priority.solve_time}</td>
                                
                                <td>
                                <CrudButton  type='read' onClick={() => {showModalPriority(priority)}} />
                                
                                <Link to={{pathname:"/priorities/edit", state: priority}} >
                                    <CrudButton  type='edit' />
                                </Link>
                                    <CrudButton  type='delete' onClick={()=>handleShow(priority.name, priority.url)} />
                                </td>
                                
                                    </tr>
                              )
                            })}
          <Modal size='lg' show={modalShow} onHide={() => setModalShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>            
            <Modal.Body>
                <Row>    
                    <Col>                 
                        <Card>
                            <Card.Header> 
                                <Row>
                                    <Col>
                                        <Card.Title as="h5">Prioridad</Card.Title>
                                        <span className="d-block m-t-5">Detalle de Prioridad</span>
                                    </Col>
                                    <Col sm={12} lg={4}>                       
                                    <Link to={{pathname:"/priorities/edit", state: priority}} >
                                        <CrudButton  type='edit' />
                                    </Link>
                                        <CloseButton aria-label='Cerrar' onClick={() => setModalShow(false)} />
                                    </Col>
                                </Row>         
                            </Card.Header>
                            <Card.Body>
                                <Table responsive > 
                                    <tr>
                                        <td>Nombre</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={priority.name} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fecha limite de respuesta</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={priority.attend_time} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fecha limite de resolucion</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={priority.solve_time} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Severidad</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={priority.severity} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Creación</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={priority.created ? priority.created.slice(0,10)+" "+priority.created.slice(11,19) : ""} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Actulizacion</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={priority.modified ? priority.modified.slice(0,10)+" "+priority.modified.slice(11,19) : ""} />
                                        </td>
                                    </tr>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col> 
                </Row>
            </Modal.Body>            
        </Modal>
        <ModalConfirm type='delete' component='Prioridad' name={deleteName} showModal={remove} onHide={() => setRemove(false)} ifConfirm={() => handleDelete(deleteUrl)}/>    
                            </tbody>
                        </Table>
                      </ul>
               
  </div>
                        )
}

export default TablePriorities