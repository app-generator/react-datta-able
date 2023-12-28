import React, { useState, useEffect } from 'react'
import {
    Button,Card, Table , Modal, Row,Col, Form, CloseButton, Spinner
  } from 'react-bootstrap';
import CallBackendByName from '../../components/CallBackendByName'; 
import CallBackendByType from '../../components/CallBackendByType'; 
import { getTaxonomy } from '../../api/services/taxonomies';
import { getPriority } from '../../api/services/priorities';
import { getTLPSpecific } from '../../api/services/tlp';
import { getFeed } from '../../api/services/feeds';
import { getEvent } from '../../api/services/events';
import { useLocation } from "react-router-dom";
import Navigation from '../../components/Navigation/Navigation'
import { getArtefact } from '../../api/services/artifact';
import ViewFiles from '../../components/Button/ViewFiles';

const ReadEvent = () => {
    const location = useLocation();
    const [body,setBody]=useState({})


    useEffect( ()=> {
        let event= location.state;
        getEvent(event.url).then((responsive) =>{
            setBody(responsive.data)
        })
      },[]);

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
    const callbackArtefact = (url ,set) => {
        getArtefact(url)
        .then((response) => {
            console.log(response)
            set(response.data)
        })
        .catch();
    }
    console.log(body.date)
  return (
    <div>
        <Row>
            <Navigation actualPosition="Agregar evento" path="/events" index ="Evento"/>
        </Row>        
        <Card>
            <Card.Header> 
                <Card.Title as="h5">Principal</Card.Title>
            </Card.Header>                           
            <Card.Body>
                    <Row>
                        <Col sm={12} lg={2}>
                            Fecha
                        </Col>
                        <Col sm={12} lg={4}>
                            <Form.Control plaintext readOnly defaultValue={body.date !== undefined ? body.date.slice(0,10)+" "+body.date.slice(11,19): ""} />
                        </Col>
                    </Row>
                    <p/>
                    <Row>
                        <Col sm={12} lg={2}>
                                Tlp
                        </Col>
                        <Col sm={12} lg={4}>
                            {body.tlp !== undefined ?
                                <CallBackendByName url={body.tlp} callback={callbackTlp}/> : ""}
                        </Col>

                    </Row>
                    <p/>
                    <Row>
                        <Col sm={12} lg={2}>
                            Taxonomia
                        </Col>
                        <Col sm={12} lg={4}>
                            {body.taxonomy !== undefined ?
                                <CallBackendByName url={body.taxonomy} callback={callbackTaxonomy}/> : ""}
                        </Col>

                    </Row>
                    <p/>
                    <Row>
                        <Col sm={12} lg={2}>
                            Fuentes de informacion
                        </Col>
                        <Col sm={12} lg={4}>
                            { body.feed !== undefined ?
                                <CallBackendByName url={body.feed} callback={callbackFeed}/> : ""}
                        </Col>

                    </Row>
                    <p/>
                    <Row>
                        <Col sm={12} lg={2}>
                            Prioridad
                        </Col>
                        <Col sm={12} lg={4}>
                            {body.priority !== undefined ?
                                <CallBackendByName url={body.priority} callback={callbackPriority}/>: ""}
                        </Col>

                    </Row>
                    <p/>
                    <Row>
                        <Col sm={12} lg={2}>
                            Usuario que reporta
                        </Col>
                        <Col sm={12} lg={4}>
                            {body.reporter !== undefined ?
                                <CallBackendByName url={body.reporter} callback={callbackPriority}/>: ""}
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
                <Row>
                    { body.artifacts !== undefined ? 
                       body.artifacts.map((url) => {
                        return  (<CallBackendByType url={url} callback={callbackArtefact} useBadge={true}/>)
                        }): ""
                    }
                </Row>
            </Card.Body>
        </Card>
                    <Card>
                    <Card.Header> 
                        <Card.Title as="h5">Recursos afectados</Card.Title>
            </Card.Header>
            <Card.Body>
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
            

            
                    <Card>
                    <Card.Header> 
                        
                        <Card.Title as="h5">Evidencias</Card.Title>
                                        

                    </Card.Header>
            
                    <Card.Body>
                        <Row>
                        
                        { body.evidence !== undefined ?
                            body.evidence.map((url, index) => {
                                return  (<ViewFiles url={url} index={index+1}  />)
                                }): ""
                        }
                        
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
                        <td>Creación</td>
                        <td>
                            <Form.Control plaintext readOnly defaultValue={body.created !== undefined ?  body.created.slice(0,10)+" "+body.date.slice(11,19) : ""} />
                        </td>
                    </tr>
                    <tr>
                        <td>Actualización</td>
                        <td>
                            <Form.Control plaintext readOnly defaultValue={ body.modified !== undefined ? body.modified.slice(0,10)+" "+body.date.slice(11,19) : ""} />
                        </td>
                    </tr>
                    
                
            </Card.Body>
        </Card>
        <Button variant="primary" href="/events">Volver</Button>
        
        </Table>
    </div>
  )
}

export default ReadEvent