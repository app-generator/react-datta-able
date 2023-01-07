import React from 'react';
import { Row, Col, Card, Table, Breadcrumb, Form } from 'react-bootstrap';
import { getTLP } from '../../api/services/tlp';
import { useState , useEffect } from "react";

const ListTLP = () => {

    const [tlp, setTLP] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getTLP()
        .then((response) => {
            setTLP(response.data.results);
            setError(null);
        })
        .catch(setError);
    }, []);
    
    if (error) {
        console.log(error);
        return <p>Ups! Se produjo un error al buscar el protocolo de semaforo.</p>
    }

    return (
        <React.Fragment>
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href='/app/dhasboard/default'>
                        <i className="fas fa-home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href='#'>
                        Protocolo de Semaforo
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href='#' active>
                        Listado 
                    </Breadcrumb.Item>
                </Breadcrumb>    
            </Row>
            <Row>
                <Col>             
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col>
                                    <React.Fragment>
                                        <div id="main-search" className='open'>
                                            <div className="input-group">
                                                <input type="text" id="m-search" className="form-control" placeholder="Buscar protocolo de semaforo . . ." />
                                                <span className="search-btn btn btn-primary" >
                                                    <i className="fas fa-search " />
                                                </span>
                                            </div>
                                        </div>
                                    </React.Fragment>                           
                                </Col>                                  
                            </Row>                                                                           
                        </Card.Header>
                        <Card.Body>                            
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>#</th>                                        
                                        <th width="5%" >Codigo</th>
                                        <th>Descripcion</th>
                                        <th>¿Cuando utilizarlo?</th>
                                        <th>¿Como compartirlo?</th>      
                                    </tr>
                                </thead>
                                <tbody>
                                    {tlp.sort((a,b) => a.code - b.code).map((item,i) => (
                                        <tr>
                                            <th scope="row">{i+1}</th>
                                            <td><p class="p-3 mb-2 bg-dark rounded" style={{color: item.color}}><b>{item.information}</b></p></td>
                                            <td><Form.Control style={{resize:"none"}} as="textarea" rows={3} plaintext readOnly defaultValue={item.description} /></td>
                                            <td><Form.Control style={{resize:"none"}} as="textarea" rows={3} plaintext readOnly defaultValue={item.when} /></td>                                            
                                            <td><Form.Control style={{resize:"none"}} as="textarea" rows={3} plaintext readOnly defaultValue={item.why} /></td>
                                        </tr>
                                     ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>            
        </React.Fragment>
    );
};

export default ListTLP;