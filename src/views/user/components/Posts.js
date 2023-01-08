import React from 'react'
import {Link} from 'react-router-dom'
import {
  Button,
   Card, Table , Modal, Row,Col
} from 'react-bootstrap';

function Posts({posts}) {
  
  

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
                                        <th>Ultimo login</th>
                                        <th>Estado</th>
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
                                        <td>Mark</td>
                                        <td>Mark@mark.com</td>
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

                                        
                                            <Button className="btn-icon " variant="outline-danger" onClick="">
                                                <i className='fas fa-trash-alt' title="Eliminar" />
                                            </Button>
                                      
 
                                        </td>
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