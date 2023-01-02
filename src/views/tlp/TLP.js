import React from 'react';
import { Row, Col, Card, Table, Breadcrumb } from 'react-bootstrap';

const ListTLP = () => {
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
                                        <th>Codigo</th>
                                        <th>Descripcion</th>
                                        <th>¿Cuando utilizarlo?</th>
                                        <th>¿Como compartirlo?</th>      
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td><p class="p-3 mb-2 bg-dark text-white">TLP:WHITE</p></td>
                                        <td>Disclosure is not limited.</td>
                                        <td>Sources may use TLP:WHITE when information carries minimal or no foreseeable risk of misuse, in accordance with applicable rules and procedures for public release.</td>
                                        <td>Subject to standard copyright rules, TLP:WHITE information may be distributed without restriction.</td>                  
                                    </tr>
                                    <tr>
                                    <th scope="row">2</th>
                                        <td><p p class="p-3 mb-2 bg-success text-white">TLP:GREEN</p></td>
                                        <td>Limited disclosure, restricted to the community.</td>
                                        <td>Sources may use TLP:GREEN when information is useful for the awareness of all participating organizations as well as with peers within the broader community or sector.</td>
                                        <td>Recipients may share TLP:GREEN information with peers and partner organizations within their sector or community, but not via publicly accessible channels. Information in this category can be circulated widely within a particular community. TLP:GREEN information may not be released outside of the community.</td>                             
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td><p class="p-3 mb-2 bg-warning text-dark">TLP:AMBER</p></td>
                                        <td>Limited disclosure, restricted to participants organizations.</td>
                                        <td>Sources may use TLP:AMBER when information requires support to be effectively acted upon, yet carries risks to privacy, reputation, or operations if shared outside of the organizations involved.</td>
                                        <td>Recipients may only share TLP:AMBER information with members of their own organization, and with clients or customers who need to know the information to protect themselves or prevent further harm. Sources are at liberty to specify additional intended limits of the sharing: these must be adhered to.</td>                              
                                    </tr>
                                    <tr>
                                    <th scope="row">4</th>
                                        <td><p class="p-3 mb-2 bg-danger text-white">TLP:RED</p></td>
                                        <td>Not for disclosure, restricted to participants only.</td>
                                        <td>Sources may use TLP:RED when information cannot be effectively acted upon by additional parties, and could lead to impacts on a party's privacy, reputation, or operations if misused.</td>
                                        <td>Recipients may not share TLP:RED information with any parties outside of the specific exchange, meeting, or conversation in which it was originally disclosed. In the context of a meeting, for example, TLP:RED information is limited to those present at the meeting. In most circumstances, TLP:RED should be exchanged verbally or in person.</td>                              
                                    </tr>
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