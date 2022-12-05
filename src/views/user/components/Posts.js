import React from 'react'
import {Link} from 'react-router-dom'
import {
  Button,
   Card, Table , Modal
} from 'react-bootstrap';

function Posts({posts}) {
  return (

    <ul className="list-group my-4">
       <Card.Body>
       <Table responsive hover>
       <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre de usuario</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Ultimo login</th>
                                        <th>Creado</th>
                                        <th>Actualizado</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>@mdo</td>
                                        <td>Mark</td>
                                        <td>Mark@mark.com</td>
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
                                  </tbody>

      </Table>
      </Card.Body>
      {posts.map((post, index) => {
        return (<td>
                  <li key={index} >{post.title}</li>
                </td>)
      })}
    </ul>
  )
}

export default Posts