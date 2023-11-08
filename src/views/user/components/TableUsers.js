import React,{ useState} from 'react'
import {Link} from 'react-router-dom'
import {
  Button,Card, Table , Modal, Row,Col, Form, Badge,CloseButton, Spinner
} from 'react-bootstrap';
import { deleteUser, isActive } from "../../../api/services/users";
import CrudButton from '../../../components/Button/CrudButton';
import ActiveButton from '../../../components/Button/ActiveButton';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import Alert from '../../../components/Alert/Alert';


function TableUsers({users, loading}) {
  const [remove, setRemove] = useState(false);
  const [deleteUsername, setDeleteUsername] = useState("");
  const [deleteUrl, setDeleteUrl] = useState("");
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState({});
  const [showState,setShowState] =useState(false);
  const [dataState,setDataState] =useState({});
  const [showAlert, setShowAlert] = useState(false)
  

  if (loading) {
    return (
        <Row className='justify-content-md-center'>
            <Spinner animation='border' variant='primary' size='sm' />
        </Row>
    );    
    }

  const handleDelete = () => {
    deleteUser(deleteUrl).then(() => {
        window.location.href = '/users';
      })
      .catch((error) => {
        setShowAlert(true)
        setError(error);
      })
     .finally(()=>{
        setRemove(false)
      })
  }

  const handleShow = (username, url) => {

    setDeleteUsername(username)
    setDeleteUrl(url) 
    setRemove(true)
   
  }

  const showModalUser = (user) => {
    setUser(user)
    console.log("algo")
    setModalShow(true)
   
  }

  const showModalChangeState = (url, username, active )=> {

      setDataState({url:url, username:username, state: active})
      setShowState(true)
    }
    const changeState=()=>{
        
        isActive(dataState.url, !dataState.state)
        .then(() => {
            window.location.href = '/users';
        })
        .catch((error) => {
            setError(error);
            setShowAlert(true)           
            })
        .finally(()=>{
            setShowState(false)
        })
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
                            <th>Nombre de usuario</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Estado</th>
                            <th>Ultimo login</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                       {users.map((user, index) => {
                        return (
                                    <tr>
                                        <th >{index + 1 }</th>
                                        <td>{user.username}</td>
                                        <td>{user.first_name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                        <ActiveButton active={user.is_active} onClick={() => showModalChangeState(user.url,user.username, user.is_active)} />
                                        </td>
                                        <td>{user.last_login ? user.last_login.slice(0,10)+" "+user.last_login.slice(11,19) : "No inicio sesion"}</td>
                                        <td>
                                        <CrudButton  type='read'  onClick={() => showModalUser(user) }/>
                                        <Link to={{pathname:"/users/edit", state: user}} >
                                            <CrudButton  type='edit' />
                                        </Link>
                                        <CrudButton  type='delete' onClick={()=>handleShow(user.username,user.url)} />    
                                        </td>
                                    </tr>
                              )
                            })}
            <ModalConfirm type='delete' component='Usuario' name={deleteUsername} showModal={remove} onHide={() => setRemove(false)} ifConfirm={() => handleDelete(deleteUrl)}/>    
            <ModalConfirm type='editState' component='Usuario' name={dataState.username} state={dataState.state} showModal={showState} onHide={() => setShowState(false)} ifConfirm={() => changeState()}/>
            <Modal size='lg' show={modalShow} onHide={() => setModalShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>            
            <Modal.Body>
                <Row>    
                    <Col>                 
                        <Card>
                            <Card.Header> 
                                <Row>
                                    <Col>
                                        <Card.Title as="h5">Usuario</Card.Title>
                                        <span className="d-block m-t-5">Detalle de usuario</span>
                                    </Col>
                                    <Col sm={12} lg={4}>                       
                                        <Link to={{pathname:"/users/edit", state: user}} >
                                            <CrudButton  type='edit' />
                                        </Link>
                                        <CloseButton aria-label='Cerrar' onClick={() => setModalShow(false)} />
                                    </Col>
                                </Row>         
                            </Card.Header>
                            <Card.Body>
                                <Table responsive >
                                    <tr>
                                        <td>Nombre de usuario</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={user.username} />
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Nombre</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={user.first_name } />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>activo</td>
                                        <td>
                                        <Button 
                                            className="btn-icon btn-rounded" 
                                            variant={user.is_active ? 'outline-success' : 'outline-danger'} 
                                            title={user.is_active ? 'Activo' : 'Inactivo'}>
                                                <i className={user.is_active ? 'feather icon-check-circle' : 'feather icon-alert-triangle'}/>
                                        </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ultimo inicio de cesion</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={user.last_login ? user.last_login.slice(0,10) : ""} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Informacion Relacionada</td>
                                        <td>  
                                            <Button size="sm" variant='light' className="text-capitalize">
                                            Casos asignados <Badge variant="light" className="ml-1"></Badge>
                                            </Button>
                                        </td>                        
                                    </tr>
                                    <tr>
                                        <td>Creación</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={user.created ? user.created.slice(0,10)+" "+user.created.slice(11,19) : ""} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Actulizacion</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={user.modified ? user.modified.slice(0,10)+" "+user.modified.slice(11,19) : ""} />
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
export default TableUsers