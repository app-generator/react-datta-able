import React from 'react';
import { Row, Col, Card, Table, Button, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddButton from './components/AddButton';
import Search from './components/Search';
import ButtonView from './components/ButtonView';
import ButtonDelete from './components/ButtonDelete';
import ButtonState from './components/ButtonState';
import { getFeeds } from '../../api/services/feeds';
import { useState , useEffect } from "react";

const ListFeeds = () => {
    
    const [feeds, setFeeds] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        getFeeds()
        .then((response) => {
            setFeeds(response.data.results);
            setError(null);
        })
        .catch(setError);
    }, []);
    
    if (error) {
        console.log(error);
        return <p>Ups! Se produjo un error al buscar las fuentes de informacion.</p>
    }

    

    return (
        <React.Fragment>
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href='/app/dhasboard/default'>
                        <i className="fas fa-home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href='#'>
                        Fuentes de Informacion
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
                                <Col sm={12} lg={9}>
                                    <Search></Search>                            
                                </Col> 
                                <Col sm={12} lg={3}>
                                    <AddButton></AddButton>                            
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
                                        <th>Descripcion</th>
                                        <th>Creado</th>
                                        <th>Modificado</th>                                        
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feeds.map((feed,i) => (
                                    <tr key={i}>
                                            <th scope="row">{i+1}</th>
                                            <td>{feed.name}</td>
                                            <td>
                                                <ButtonState feed={feed}></ButtonState>
                                            </td>
                                            <td>{feed.description}</td>
                                            <td>{feed.created.slice(0,10)}</td>
                                            <td>{feed.modified.slice(0,10)}</td>
                                            <td>
                                                <ButtonView feed={feed}></ButtonView>
                                                <Link to={{pathname:"./feeds/edit", state: {feed}}} >
                                                    <Button title='Editar' className="btn-icon btn-rounded" variant={'outline-warning'} >
                                                        <i className='fas fa-edit'/>                                                    
                                                    </Button>
                                                </Link>    
                                                <ButtonDelete feed={feed}></ButtonDelete>
                                            </td>
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

export default ListFeeds;
