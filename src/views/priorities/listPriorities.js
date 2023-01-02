import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'


import {
    Button,CloseButton,
     Card, Table , Modal,Row, Col,Breadcrumb, Form, Badge
} from 'react-bootstrap';
import axios from "axios";

const ListContacts = () => {


    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [users, setUsers] = useState([]);


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
                    <b>Prioridades</b>
                </Breadcrumb.Item>
            </Breadcrumb>    
        </Row>
                            <Row>
                                <Col sm={12} lg={9}>
                                <div id="main-search" className='open'>
                                     <div className="input-group">
                                        <input type="text" id="m-search" className="form-control" placeholder="Buscar prioridad . . ." />
                                            <span className="search-btn btn btn-primary" onClick="">
                                                    <i className="feather icon-search " />
                                            </span> 
                                    </div>
                                </div>

                           
                                </Col> 
                                <Col sm={12} lg={3}>
                                <Button className="text-capitalize" variant='outline-primary' title='Agregar Usuario' href="/add-Priority">
                                    <i className='fa fa-plus' />
                                        Agregar prioridad
                                </Button>
                            
                                </Col> 
                            </Row>                                 
                        </Card.Header>
                        


                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        
                                        <th>Nombre</th>
                                        <th>Activo</th>
                                        <th>Tiempo de respuesta</th>
                                        <th>Unresponse time (?</th>
                                        <th>Tiempo de resolucion </th>
                                        <th>Tiempo sin resolver</th>
                                        <th>Creado</th>
                                        <th>Actualizado</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        
                                        <td>Indefinido</td>
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant='outline-success' title='Activo'>
                                                <i className='feather icon-check-circle'/>
                                            </Button>


                                        </td>
                                        <td className="text-center" >1</td>
                                        <td className="text-center">10080</td>
                                        <td className="text-center">1</td>
                                        <td className="text-center">10080</td>
                                        <td className="text-center">11/08/2021</td>
                                        <td className="text-center">11/09/2022</td>
                                        
                                        <td>
                                        <Link to="/add-Priority" >
                                            <Button className="btn-icon btn-rounded " variant="outline-warning">
                                                <i className='far fa-edit' title="Editar" />
                                            </Button>
                                        </Link>

                                        
                                            <Button className="btn-icon btn-rounded " variant="outline-danger" onClick={handleShow}>
                                                <i className='fas fa-trash-alt' title="Eliminar" />
                                            </Button>
                                      
 
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Indefinido</td>
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant='outline-success' title='Activo'>
                                                <i className='feather icon-check-circle'/>
                                            </Button>


                                        </td>
                                        <td className="text-center">1</td>
                                        <td className="text-center">10080</td>
                                        <td className="text-center">1</td>
                                        <td className="text-center">10080</td>
                                        <td className="text-center">11/08/2021</td>
                                        <td className="text-center">11/09/2022</td>
                                        
                                        <td>
                                        <Link to="/add-user" >
                                            <Button className="btn-icon btn-rounded " variant="outline-warning">
                                                <i className='far fa-edit' title="Editar" />
                                            </Button>
                                        </Link>

                                        
                                            <Button className="btn-icon btn-rounded " variant="outline-danger" onClick={handleShow}>
                                                <i className='fas fa-trash-alt' title="Eliminar" />
                                            </Button>
                                      
 
                                        </td>
                                    </tr><tr>
                                        <th scope="row">3</th>
                                        <td>Alto</td>
                                        <td>
                                            <Button className="btn-icon btn-rounded" variant='outline-success' title='Activo'>
                                                <i className='feather icon-check-circle'/>
                                            </Button>


                                        </td>
                                        <td className="text-center">1</td>
                                        <td className="text-center">10080</td>
                                        <td className="text-center"> 1</td>
                                        <td className="text-center">10080</td>
                                        <td className="text-center">11/08/2021</td>
                                        <td className="text-center">11/09/2022</td>
                                        
                                        <td>
                                        <Link to="/add-user" >
                                            <Button className="btn-icon btn-rounded " variant="outline-warning">
                                                <i className='far fa-edit' title="Editar" />
                                            </Button>
                                        </Link>

                                        
                                            <Button className="btn-icon btn-rounded " variant="outline-danger" onClick={handleShow}>
                                                <i className='fas fa-trash-alt' title="Eliminar" />
                                            </Button>
                                      
 
                                        </td>
                                    </tr>
                      
                                    
                                </tbody>
                               
                            </Table>
                            
                        </Card.Body>
                        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estas seguro que quiere eliminar este usuario?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
                    </Card>
                    
    </div>
  );
}
export default ListContacts