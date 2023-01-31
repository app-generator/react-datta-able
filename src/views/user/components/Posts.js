import React,{ useState} from 'react'
import {Link} from 'react-router-dom'
import {
  Button,
   Card, Table , Modal, Row,Col, Breadcrumb,Form, Badge,CloseButton
} from 'react-bootstrap';
import { deleteUser,getUsers, isActive } from "../../../api/services/users";

function Posts({posts, callback}) {
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

  const handleClose = () => setShow(false);

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
        setShow(false)
    })


  }

  const handleShow = (username, url) => {

    setDeleteUsername(username)
    setDeleteUrl(url) 
    setShow(true)
   
  }
  const showModalUser = (post) => {

    setShowUser(post)
    setModalShow(true)
   
  }
  


  const showModalChangeState = (url, username, active )=> {
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
      <Card.Header>
      <Row>
      <Breadcrumb>
                <Breadcrumb.Item href="./app/dashboard/default">
                    <i className="feather icon-home" />
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <b>Usuarios</b>
                </Breadcrumb.Item>
            </Breadcrumb>    
        </Row>
                            <Row>
                                <Col sm={12} lg={9}>
                                <div id="main-search" className='open'>
                                     <div className="input-group">
                                        <input type="text" id="m-search" className="form-control" placeholder="Buscar usuario . . ." />
                                            <span className="search-btn btn btn-primary" onClick="">
                                                    <i className="feather icon-search " />
                                            </span> 
                                    </div>
                                </div>

                           
                                </Col> 
                                <Col sm={12} lg={3}>
                                <Button className="text-capitalize" variant='outline-primary' title='Agregar Usuario' href="/add-user">
                                    <i className='fa fa-plus' />
                                        Agregar usuario
                                </Button>
                            
                                </Col> 
                            </Row>                                 
                        </Card.Header>
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
                       {posts.map((post, index) => {
                        return (
                
                  
                    
                                    <tr>
                                        <th >{index + 1 }</th>
                                        <td>{post.username}</td>
                                        <td>{post.first_name}</td>
                                        <td>{post.email}</td>
                                        <td>
                                        <Button 
                                            className="btn-icon btn-rounded" 
                                            variant={post.is_active ? 'outline-success' : 'outline-danger'} 
                                            title={post.is_active ? 'Activo' : 'Inactivo'}
                                            onClick={()=> showModalChangeState(post.url,post.username, post.is_active)}>
                                           <i className={post.is_active ? 'feather icon-check-circle' : 'feather icon-alert-triangle'}/>
                                        </Button>
                                        </td>
                                        <td>{post.last_login ? post.last_login.slice(0,10) : ""}</td>
                                        
                                        <td>{post.date_joined ? post.date_joined.slice(0,10) : ""}</td>
                                        <td>11/09/2022</td>
                                        <td>

                                        
                                            <Button className="btn-icon btn-rounded" variant="outline-primary" 
                                            onClick={() => showModalUser(post)}>
                                                <i className='fas fa-eye ' title="Detalle" />
                                            </Button>
                                        

                                        
                                        
                                        <Link to={{pathname:"./edit-user/", state: {post}}} >
                                            <Button className="btn-icon btn-rounded" variant="outline-warning" >
                                                <i className='far fa-edit' title="Editar" />
                                            </Button>
                                        </Link>

                                            <Button className="btn-icon btn-rounded" variant="outline-danger" onClick={()=>handleShow(post.username,post.url)}>
                                                <i className='fas fa-trash-alt' title="Eliminar" />
                                            </Button>
                                        </td>
                                        <Modal show={show} onHide={handleClose}>
                                              <Modal.Header closeButton>
                                                <Modal.Title>Eliminar usuario</Modal.Title>
                                              </Modal.Header>
                                              <Modal.Body>¿Estas seguro que quiere eliminar el usuario {deleteUsername} </Modal.Body>
                                              <Modal.Footer>
                                                <Button variant="secondary" onClick={()=>handleClose()}>
                                                  Cerrar
                                                </Button>
                                                <Button variant="danger" onClick={()=>handleDelete()}>
                                                  Eliminar
                                                </Button>
                                              </Modal.Footer>
                                            </Modal>
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
                                           <i className={post.is_active ? 'feather icon-check-circle' : 'feather icon-alert-triangle'}/>
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
                                            <Form.Control plaintext readOnly defaultValue={showUser.first_name} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ultimo inicio de cesion</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={showUser.last_login} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Creado el</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={showUser.date_joined} />
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
        <Modal show={showState} onHide={()=>handleCloseState()}>
        <Modal.Header closeButton>
          <Modal.Title >Cambio de estado</Modal.Title>
        </Modal.Header>
        <Modal.Body>{titulo[dataState.state]}</Modal.Body>
        <Modal.Footer>
        <Button variant={dataState.state ? 'danger' : 'success'} 
                                            title={dataState.state ? 'Activo' : 'Inactivo'} onClick={()=>changeState()}>
                  {bottonModalstate[dataState.state]}
          </Button>
          <Button variant="secondary" onClick={()=>handleCloseState()}>
            Cerrar
          </Button>
          
        </Modal.Footer>
      </Modal>

                                    </tr>
                              )
                            })}
                            </tbody>
                        </Table>
                      </ul>
                </Card.Body>
                  
     </Card>
  </div>
    
  )
}

export default Posts