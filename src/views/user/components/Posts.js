import React,{ useState} from 'react'
import {Link} from 'react-router-dom'
import {
  Button,
   Card, Table , Modal, Row,Col
} from 'react-bootstrap';
import { deleteUser } from "../../../api/services/users";

function Posts({posts}) {
  const [show, setShow] = useState(false);
  var [deleteUsername, setDeleteUsername] = useState("");
  var [deleteUrl, setDeleteUrl] = useState("");
  const [error, setError] = useState(null);

  const handleClose = () => setShow(false);

  const handleDelete = () => {
    deleteUser(deleteUrl.substr(-3,2)).then((response) => {//esto tengo que cambiarlo porque no es nada bueno a futuro
      console.log(response);      
      setShow(false)
    }).catch(setError);

    return window.location.reload();
  }

  const handleShow = (username, url) => {

    setDeleteUsername(username)
    setDeleteUrl(url) 
    setShow(true)
   
  }
  
  

  return (

    <div>
    

      <Card>
      <Card.Header>
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
                                            <Button className="btn-icon btn-rounded" variant='outline-success' title='Activo'>
                                                <i className='feather icon-check-circle'/>
                                            </Button>
                                        </td>
                                        <td>12/09/2022</td>
                                        
                                        <td>11/08/2021</td>
                                        <td>11/09/2022</td>
                                        <td>

                                        <Link to="/detail-user" >
                                            <Button className="btn-icon " variant="outline-primary">
                                                <i className='fas fa-eye ' title="Detalle" />
                                            </Button>
                                        </Link>

                                        
                                        <Link to="/add-user" >
                                            <Button className="btn-icon " variant="outline-warning">
                                                <i className='far fa-edit' title="Editar" />
                                            </Button>
                                        </Link>

                                            <Button className="btn-icon " variant="outline-danger" onClick={()=>handleShow(post.username,post.url)}>
                                                <i className='fas fa-trash-alt' title="Eliminar" />
                                            </Button>
                                        </td>
                                        <Modal show={show} onHide={handleClose}>
                                              <Modal.Header closeButton>
                                                <Modal.Title>Eliminar usuario</Modal.Title>
                                              </Modal.Header>
                                              <Modal.Body>¿Estas seguro que quiere eliminar el usuario {deleteUsername} </Modal.Body>
                                              <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                  Cerrar
                                                </Button>
                                                <Button variant="danger" onClick={()=>handleDelete()}>
                                                  Eliminar
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