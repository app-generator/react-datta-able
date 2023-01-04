import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
    Button,CloseButton,
     Card, Table , Modal,Row, Col,Breadcrumb, Form, Badge
} from 'react-bootstrap';
const baseUrl = "https://www.cultura.gob.ar/api/v2.0/organismos/";

function AllCourses() {
  const [priorities, setCourseData] = useState([]);
  const [nextUrl, setNextUrlData] = useState();
  const [previousUrl, setPreviousUrlData] = useState();

  // Fetch courses when page load
  useEffect(() => {
    fetchData(baseUrl);


  }, []);

  const paginationHandler = (url) => {
    fetchData(url);
  };

  function fetchData(url) {
    try {
      axios.get(url).then((res) => {
        console.log(res.data);
        setNextUrlData(res.data.next);
        setPreviousUrlData(res.data.previous);
        setCourseData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }
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
                                      <th>Tiempo de no respuesta</th>
                                      <th>Tiempo de resolucion </th>
                                      <th>Tiempo sin resolver</th>
                                      <th>Creado</th>
                                      <th>Actualizado</th>
                                      <th>Opciones</th>
                                  </tr>
                              </thead>
                              
                                  
                              
                              {priorities.map((cour, index) => {
        return (


                    <tr>
                        <th className="text-center">{index + 1 }</th>
                        <td className="text-center">{cour.id}</td>
                        <td className="text-center">{cour.id}</td>
                        <td className="text-center">{cour.id}</td>
                       
                        <td className="text-center">{cour.id}</td>
                        <td className="text-center">{cour.id}</td>
                        
                        
                        <td className="text-center">10080</td>
                        <td className="text-center">11/08/2021</td>
                        <td className="text-center">11/09/2022</td>
                                        
                                        
                                        <td>
                                        <Link to="/add-Priority" >
                                            <Button className="btn-icon btn-rounded " variant="outline-warning">
                                                <i className='far fa-edit' title="Editar" />
                                            </Button>
                                        </Link>

                                        
                                            <Button className="btn-icon btn-rounded " variant="outline-danger" onClick={""}>
                                                <i className='fas fa-trash-alt' title="Eliminar" />
                                            </Button>
                                      
 
                                        </td>

                       
                      

                    
                    </tr>
              )
            })}
      
    
      <nav aria-label="Page navigation pagination-circle mt-5">
        <ul className="pagination justify-content-center">
          {previousUrl && (
            <li className="page-item">
              <button className="page-link" onClick={() => paginationHandler(previousUrl)}>
                <i ></i> {"<<"}
              </button>
            </li>
          )}

          {nextUrl && (
            <li className="page-item">
              <button className="page-link" onClick={() => paginationHandler(nextUrl)}>
              {">>"} <i className="fa-solid fa-angle-right"></i>
              </button>
            </li>
          )}
        </ul>
      </nav>
                             
                          </Table>
                          
                      </Card.Body>
                      
                  </Card>
                  
  </div>

  
    
       
    
    
    
  );
}

export default AllCourses;