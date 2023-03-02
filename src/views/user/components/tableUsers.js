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
  const [remove, setRemove] = useState(false);
  const [show, setShow] = useState(false);
  const [deleteUsername, setDeleteUsername] = useState("");
  const [deleteUrl, setDeleteUrl] = useState("");
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [showUser, setShowUser] = useState({});
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
        console.log(response)
        callback(`El usuario ${deleteUsername} ha sido eliminado`, true)
    })
    .catch((error) => {
        console.log(error)
        setError(error)
        callback(`El usuario ${deleteUsername} NO ha sido eliminado`, false)
    })
    .finally(() => {
        setRemove(false)
    })
  }

  const handleShow = (username, url) => {

    setDeleteUsername(username)
    setDeleteUrl(url) 
    setRemove(true)
   
  }

  const showModalUser = (user) => {

    setShowUser(user)
    setModalShow(true)
   
  }

  const showModalChangeState = (url, username, active )=> {
      console.log(active)
      setDataState({url:url, username:username, state: active})
      setShowState(true)
    }
    const changeState=()=>{
        
        console.log(dataState.state)
        let message = +dataState.state ? `El usuario ${dataState.username} ha sido desactivado` : `El usuario ${dataState.username} ha sido activado`;
        isActive(dataState.url, !dataState.state)
        .then((response) => {
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
                setModalShow(false)
            })
    }
    
    const handleCloseState = () => {
        setShowState(false) 
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
                            <th>Creado</th>
                            <th>Actualizado</th>
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
                                        
                                        <td>{user.date_joined ? user.date_joined.slice(0,10) : ""}</td>
                                        <td>11/09/2022</td>
                                        <td>
                                        <CrudButton  type='read' onClick={() => showModalUser(user) }/>
                                
                                        <Link to={{pathname:"./edit-user/", state: {user}}} >
                                            <CrudButton  type='edit' />
                                        </Link>
                                        
                                        <CrudButton  type='delete' onClick={()=>handleShow(user.username,user.url)} />
                                            
                                        </td>
                            
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
                                        <Button title='Editar' className="btn-icon btn-rounded" variant='outline-warning' href='/entity/edit'>
                                            <i className='fas fa-edit'/>
                                        </Button>
                                        <Button 
                                            className="btn-icon btn-rounded" 
                                            variant={showUser.is_active ? 'outline-success' : 'outline-danger'} 
                                            title={showUser.is_active ? 'Activo' : 'Inactivo'}
                                            onClick="">
                                           <i className={user.is_active ? 'feather icon-check-circle' : 'feather icon-alert-triangle'}/>
                                        </Button>

                                        <CloseButton aria-label='Cerrar' onClick={() => setModalShow(false)} />
                                    </Col>
                                </Row>         
                            </Card.Header>
                            <Card.Body>
                                <Table responsive >
                                    <tr>
                                        <td>Nombre de usuario</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={showUser.username} />
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Nombre</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={showUser.first_name } />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ultimo inicio de cesion</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={showUser.last_login ? showUser.last_login.slice(0,10) : ""} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Creado el</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={showUser.date_joined ? showUser.date_joined.slice(0,10) : ""} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ultima Actulizacion</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue="" />
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
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col> 
                </Row>
            </Modal.Body>            
        </Modal>

                                    </tr>
                              )
                            })}
            <ModalConfirm type='delete' component='Usuario' name={deleteUsername} showModal={remove} onHide={() => setRemove(false)} ifConfirm={() => handleDelete(deleteUrl)}/>    
            <ModalConfirm type='editState' component='Usuario' name={dataState.username} state={dataState.state} showModal={showState} onHide={() => setShowState(false)} ifConfirm={() => changeState(showUser.url, showUser.state)}/>
                            </tbody>
                        </Table>
                      </ul>
                </Card.Body>          
     </Card>
  </div>   
  )
}
export default TableUsers