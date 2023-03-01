import React,{ useState} from 'react'
import {Link} from 'react-router-dom'
import {
  Button,Card, Table , Modal, Row,Col, Form, Badge,CloseButton, Spinner
} from 'react-bootstrap';
import { deleteUser, isActive } from "../../../api/services/users";
import CrudButton from '../../../components/Button/CrudButton';
import ActiveButton from '../../../components/Button/ActiveButton';
import ModalConfirm from '../../../components/Modal/ModalConfirm';

function TableUsers({users, callback, loading}) {
  const [show, setShow] = useState(false);
  const [remove, setRemove] = useState(false);
  const [username, setUsername] = useState("");
  const [deleteUrl, setDeleteUrl] = useState("");
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState({});
  const [showState,setShowState] =useState(false);
  const [dataState,setDataState] =useState({});
  const titulo={true:"Esta seguro de que desea inabilitar el usuario", false:"Esta seguro de que desea volver a habilitar el usuario"}
  const bottonModalstate={true:"Inhabilitar", false:"Activar"}

  if (loading) {
    return (
        <Row className='justify-content-md-center'>
            <Spinner animation='border' variant='primary' size='sm' />
        </Row>
    );    
    }
  const handleDelete = () => {
    deleteUser(deleteUrl).then((response) => {
        callback(`El usuario ${username} ha sido eliminado`, true)
    })
    .catch((error) => {
        setError(error)
        callback(`El usuario ${username} NO ha sido eliminado`, false)
    })
    .finally(() => {
        setRemove(false)
    })
  }

  const modalDeleteUser = (username, url) => {

    setUsername(username)
    setDeleteUrl(url) 
    setRemove(true)
   
  }

  const showModalUser = (user) => {

    setUser(user)
    setModalShow(true)
   
  }

  const showModalChangeState = (url, username, active )=> {
      
      setDataState({url:url, username:username, state: active})
      setShowState(true)
    }
    const changeState=()=>{
        
        let message = +dataState.state ? `El usuario ${dataState.username} ha sido desactivado` : `El usuario ${dataState.username} ha sido activado`;
        isActive(dataState.url, !dataState.state)
        .then((response) => {
            callback(message, true)
        })
        .catch((error) => {
                setError(error)
                callback(message, false)
            })
            .finally(() => {
                setShowState(false)
                setModalShow(false)
            })
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
                                        <ActiveButton active={+user.is_active} onClick={() => showModalChangeState(user.url,user.username, user.is_active)} />
                                        </td>
                                        <td>{user.last_login ? user.last_login.slice(0,10) : ""}</td>
                                        <td>
                                        <CrudButton  type='read' onClick={() => showModalUser(user) }/>
                                        <Link to={{pathname:"./edit-user/", state: {user}}} >
                                            <CrudButton  type='edit' />
                                        </Link>
                                        <CrudButton  type='delete' onClick={()=>modalDeleteUser(user.username,user.url)} />
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
                                        <Card.Title as="h5">Usuario</Card.Title>
                                        <span className="d-block m-t-5">Detalle de usuario</span>
                                    </Col>
                                    <Col sm={12} lg={4}>                       
                                        <Link to={{pathname:"./edit-user/", state: {user}}} >
                                            <CrudButton  type='edit' />
                                        </Link>
                                        <ActiveButton active={+user.is_active} onClick={() => showModalChangeState(user.url,user.username, user.is_active)} />
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
                                        <td>Creado el</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={user.date_joined ? user.date_joined.slice(0,10) : ""} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ultima Actulizacion</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue="" />
                                        </td>
                                    </tr>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col> 
                </Row>
            </Modal.Body>            
        </Modal>
        <ModalConfirm type='delete' component='Entidad' name={username} showModal={remove} onHide={() => setRemove(false)} ifConfirm={() => handleDelete(deleteUrl)}/>
        <ModalConfirm type='editState' component='Entidad' name={username} state={dataState.state} showModal={showState} onHide={() => setShowState(false)} ifConfirm={() => changeState(dataState.url, dataState.state)}/>
                            </tbody>
                        </Table>
                      </ul>
                </Card.Body>           
     </Card>
  </div>   
  )
}
export default TableUsers