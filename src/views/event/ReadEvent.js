import React, { useState, useEffect } from 'react'
import {
    Button,Card, Table , Modal, Row,Col, Form, CloseButton, Spinner
  } from 'react-bootstrap';

import CallBackendByName from '../../components/CallBackendByName'; 
import { getTaxonomy } from '../../api/services/taxonomies';
import { getPriority } from '../../api/services/priorities';
import { getTLPSpecific } from '../../api/services/tlp';
import { getFeed } from '../../api/services/feeds';
import { useLocation } from "react-router-dom";
import Navigation from '../../components/Navigation/Navigation'

const ReadEvent = () => {
    const location = useLocation();
    const event = location.state.event;

    const [body,setBody]=useState(event)

    const callbackTaxonomy = (url ,setPriority) => {
        getTaxonomy(url)
        .then((response) => {
            console.log(response)
            setPriority(response.data)
        })
        .catch();
    }
    const callbackTlp = (url ,setPriority) => {
        getTLPSpecific(url)
        .then((response) => {
            console.log(response)
            setPriority(response.data)
        })
        .catch();
    }
    const callbackFeed = (url ,setPriority) => {
        getFeed(url)
        .then((response) => {
            console.log(response)
            setPriority(response.data)
        })
        .catch();
    }
    const callbackPriority = (url ,set) => {
        getPriority(url)
        .then((response) => {
            console.log(response)
            set(response.data)
        })
        .catch();
    }
  return (
    <div>
        
        <Navigation actualPosition="Agregar evento" path="/list-Event" index ="Evento"/>
             

        <Card>
            
            <Card.Header> 
            
                <Card.Title as="h5">Principal</Card.Title>
            
            </Card.Header>                           
            <Card.Body>
                           
                {/*<Table responsive >*/}
                
                    {/*<tr>
                        <td>Fecha</td>
                        <td>
                            <Form.Control plaintext readOnly defaultValue={body.date} />
                        </td>
                    </tr>
                    <tr>
                        <td>Tlp</td>
                        <td>
                            <CallBackendByName url={body.tlp} callback={callbackTlp}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Taxonomia</td>
                        <td>
                            <CallBackendByName url={body.taxonomy} callback={callbackTaxonomy}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Fuentes de informacion</td>
                        <td>
                        <CallBackendByName url={body.feed} callback={callbackFeed}/>
                        </td>
                    </tr>

                    <tr>
                        <td>Prioridad</td>
                        <td>
                        <CallBackendByName url={body.priority} callback={callbackPriority}/>
                        </td>
                    </tr>

                    <tr>
                        <td>Usuario que reporta</td>
                        <td>
                        <CallBackendByName url={body.reporter} callback={callbackPriority}/>
                        </td>
                    </tr>
                    */}
                    <Row>
                        <Col sm={12} lg={2}>
                            Fecha
                        </Col>
                        <Col sm={12} lg={4}>
                            <Form.Control plaintext readOnly defaultValue={body.date} />
                        </Col>

                    </Row>
                    <p/>
                    <Row>
                        <Col sm={12} lg={2}>
                                Tlp
                        </Col>
                        <Col sm={12} lg={4}>
                            <CallBackendByName url={body.tlp} callback={callbackTlp}/>
                        </Col>

                    </Row>
                    <p/>
                    <Row>
                        <Col sm={12} lg={2}>
                            Taxonomia
                        </Col>
                        <Col sm={12} lg={4}>
                            <CallBackendByName url={body.taxonomy} callback={callbackTaxonomy}/>
                        </Col>

                    </Row>
                    <p/>
                    <Row>
                        <Col sm={12} lg={2}>
                            Fuentes de informacion
                        </Col>
                        <Col sm={12} lg={4}>
                            <CallBackendByName url={body.feed} callback={callbackFeed}/>
                        </Col>

                    </Row>
                    <p/>
                    <Row>
                        <Col sm={12} lg={2}>
                            Prioridad
                        </Col>
                        <Col sm={12} lg={4}>
                            <CallBackendByName url={body.priority} callback={callbackPriority}/>
                        </Col>

                    </Row>
                    <p/>
                    <Row>
                        <Col sm={12} lg={2}>
                            Usuario que reporta
                        </Col>
                        <Col sm={12} lg={4}>
                            <CallBackendByName url={body.reporter} callback={callbackPriority}/>
                        </Col>

                    </Row>
                    
               {/*</Table>*/}
               </Card.Body>
        </Card>
        <Card>
            <Card.Header> 
                        
                <Card.Title as="h5">Artefactos</Card.Title>
                         
            </Card.Header>
            <Card.Body>
                {/*<Table responsive >
    
                    <tr>
                        <td>Cidr</td>
                        <td>
                            <Form.Control plaintext readOnly defaultValue={body.cidr}  />
                        </td>
                    </tr>
                </Table>*/}
                <Row>
                    
                    <Col sm={12} lg={2}>Artefactos</Col>
                            
                    <Col sm={12} lg={4}>  <Form.Control plaintext readOnly defaultValue={""}  /></Col>
                    
                        

                </Row>
            </Card.Body>
        
        </Card>
        
            
                
                {/*<Table responsive >*/}
                    <Card>
                    <Card.Body>

                  
                    <Card.Header> 
                        
                                <Card.Title as="h5">Recursos afectados</Card.Title>
                                    
                    </Card.Header>
                    
                    {/*
                    <tr>
                        <td>Dominio</td>
                        <td>
                            <Form.Control plaintext readOnly defaultValue={body.domain} />
                        </td>
                    </tr>
                    <tr>
                        <td>Artefactos</td>
                        <td>
                            <Form.Control plaintext readOnly defaultValue={body.domain} />
                        </td>
                    </tr>
            */}
            <Row>
            <p></p>
                    
                    <Col sm={12} lg={2}>Dominio</Col>
                    <p></p>
                            
                    <Col sm={12} lg={4}> <Form.Control plaintext readOnly defaultValue={body.domain} /></Col>
                    
                        

                </Row>
                <Row>
                    
                    <Col sm={12} lg={2}>Cidr</Col>
                            
                    <Col sm={12} lg={4}>  <Form.Control plaintext readOnly defaultValue={body.cidr}  /></Col>
                    
                        

                </Row>
                    </Card.Body>
                </Card>
            
                {/*</Table>*/}
                <Table responsive >
                    <Card>
                    <Card.Body>
                    <Card.Header> 
                        
                                <Card.Title as="h5">Evidencias</Card.Title>
                            

                    </Card.Header>
                    
                    
                    <tr>
                        <td>Evidencia</td>
                        <td>
                            <Form.Control plaintext readOnly defaultValue="" />
                        </td>
                        <td></td>
                    </tr>
                    </Card.Body>
                </Card>
            
                </Table>
                
                    <Card>
                    <Card.Header> 
                        
                                <Card.Title as="h5">Hijos</Card.Title>
                                    
                    </Card.Header>

                    
                    <Card.Body>
                    {/*<Table responsive >
                    <Row>
                    <tr>
                        <td>Hijos</td>
                        <td>
                            <Form.Control plaintext readOnly defaultValue="" />
                        </td>
                    </tr>
                    </Row>
                    </Table>*/}
                    <Row>
                        <td>Hijos</td>
                        <td>
                            <Form.Control plaintext readOnly defaultValue="" />
                        </td>
                        
                    </Row>
                    </Card.Body>
                    
                </Card>
            
                
                <Table responsive >
                    <Card>
                    <Card.Header> 
                        
                                <Card.Title as="h5">Datos adicionales</Card.Title>
                            
                    </Card.Header>
                    <Card.Body>

                  

                    <tr>
                        <td>Comentarios</td>
                        <td>
                            <Form.Control plaintext readOnly defaultValue="" />
                        </td>
                    </tr>
                    
                    <tr>
                        <td>Creado</td>
                        <td>
                            <Form.Control plaintext readOnly defaultValue={body.created} />
                        </td>
                    </tr>
                    <tr>
                        <td>modificado</td>
                        <td>
                            <Form.Control plaintext readOnly defaultValue={body.modified} />
                        </td>
                    </tr>
                    
                
            </Card.Body>
        </Card>
        <Button variant="primary" href="/list-event">Volver</Button>
        </Table>
    </div>
  )
}

export default ReadEvent