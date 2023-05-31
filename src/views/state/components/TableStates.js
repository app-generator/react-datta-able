import React,{ useState} from 'react'
import {
    Button,Card, Table , Modal, Row,Col, Form, Badge,CloseButton, Spinner
  } from 'react-bootstrap';
import CrudButton from '../../../components/Button/CrudButton';
import {Link} from 'react-router-dom'
import ActiveButton from '../../../components/Button/ActiveButton';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import { deleteState, isActive } from "../../../api/services/states";
import Alert from '../../../components/Alert/Alert';
import CallBackendByName from '../../../components/CallBackendByName'; 
import { getState } from "../../../api/services/states";


const TableStates = ({states, callback, loading}) => {
    const [deleteName, setDeleteName] = useState()
    const [deleteUrl, setDeleteUrl] = useState()
    const [remove, setRemove] = useState()
    const [error, setError] = useState(null);
    const [dataState,setDataState] = useState({})
    const [showState, setShowState] = useState()
    const [state, setState] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false)

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    }

    const modalDelete = (name, url)=>{
        setDeleteName(name)
        setDeleteUrl(url) 
        setRemove(true)

    }
    const handleDelete = () => {
        deleteState(deleteUrl).then(() => {
            window.location.href = '/states';
          })
          .catch((error) => {
            setShowAlert(true)
            setError(error);
          })
         .finally(()=>{
            setRemove(false)
          })
    }
    const modalChangeState = (url, name, active) =>{
      
        setDataState({url:url, name:name, state: active})
        setShowState(true)
    }
    const callbackState = (url ,setPriority) => {
        getState(url)
        .then((response) => {
            console.log(response)
            setPriority(response.data)
        })
        .catch();
    }
    const changeState=()=>{
        
        isActive(dataState.url, +!dataState.state)
        .then(() => {
            window.location.href = '/states';
        })
        .catch((error) => {
            setShowAlert(true)
            setError(error);           
          })
        .finally(()=>{
            setShowState(false)
        })
        /*.then((response) => {
            console.log(response)
            
            callback(message, true)
        })
        .catch((error) => {
                console.log(error)
                setError(error)
                callback(message, false)
            })
            .finally(() => {
                setShowState(false)
            })*/
    }
    const showModalState = (state) => {
        setState(state)
        setModalShow(true)   
    }
    const resetShowAlert = () => {
        setShowAlert(false);
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
                                <th>Estado</th>
                                <th>Atendido</th>
                                <th>Resuelto</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {states.map((state, index) => {
                            return (
                                        <tr>
                                            <th >{index + 1 }</th>
                                            <td>{state.name}</td>
                                            <td>
                                            <ActiveButton active={state.active} onClick={() => modalChangeState(state.url, state.name, state.active)} />
                                            </td>
                                            <td>{state.attended ? "Verdadero": "Falso"} </td>
                                            
                                            <td>{state.solved ? "Verdadero": "Falso"}</td>
                                            
                                        
                                            <td>
                                            <CrudButton  type='read' onClick={() => showModalState(state) }/>
                                            <Link to={{pathname:"/states/edit", state: state}} >
                                                <CrudButton  type='edit' />
                                            </Link>
                                            <CrudButton  type='delete' onClick={()=>modalDelete(state.name, state.url)} />
                                            </td>
                                        </tr>
                                    )
                                })}

                        <ModalConfirm type='delete' component='Estado' name={deleteName} showModal={remove} onHide={() => setRemove(false)} ifConfirm={() => handleDelete(deleteUrl)}/>    
<ModalConfirm type='editState' component='Estado' name={dataState.name} state={dataState.state} showModal={showState} onHide={() => setShowState(false)} ifConfirm={() => changeState()}/>
<Modal size='lg' show={modalShow} onHide={() => setModalShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>            
            <Modal.Body>
                <Row>    
                    <Col>                 
                        <Card>
                            <Card.Header> 
                                <Row>
                                    <Col>
                                        <Card.Title as="h5">Estado</Card.Title>
                                        <span className="d-block m-t-5">Detalle de Estado</span>
                                    </Col>
                                    <Col sm={12} lg={4}>                       
                                        <Link to={{pathname:"/states/edit", state: state}} >
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
                                            <Form.Control plaintext readOnly defaultValue={state.name} />
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Atendido</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={state.attended } />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Resuelto</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={state.solved} />
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>activo</td>
                                        <td>
                                        <Button 
                                            className="btn-icon btn-rounded" 
                                            variant={state.active ? 'outline-success' : 'outline-danger'} 
                                            title={state.active ? 'Activo' : 'Inactivo'}>
                                                <i className={state.active ? 'feather icon-check-circle' : 'feather icon-alert-triangle'}/>
                                        </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Descripcion</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={state.description } />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Hijos</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={ 
                                                state.children}/>
                                                {/* 
                                                state.children.length >0 ? state.children.map((url) => {
                                                    return  (<CallBackendByName url={url} callback={callbackState}/>)
                                                    }):"No tiene hijos"
                                                */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Creación</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={state.created ? state.created.slice(0,10)+" "+state.created.slice(11,19) : ""} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Actualización</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={state.modified ? state.modified.slice(0,10)+" "+ state.modified.slice(11,19): ""} />
                                        </td>
                                    </tr>
                                    
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col> 
                </Row>
            </Modal.Body>            
        </Modal>

                        </tbody>
                    </Table>
                </ul>
           
    </div>
  )
}
export default TableStates