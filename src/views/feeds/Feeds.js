import React from 'react';
import { Row, Col, Card, Table, Button, Breadcrumb } from 'react-bootstrap';
import AddButton from './components/AddButton';
import Search from './components/Search';
import ViewButtonModal from './components/ViewButtonModal';
import DeleteButtonModal from './components/DeleteButtonModal';
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
                                    <tr>
                                            <th scope="row">{i+1}</th>
                                            <td>{feed.name}</td>
                                            <td>
                                                <Button title='Activo' className="btn-icon btn-rounded" variant={'outline-success'} >
                                                    <i className='fas fa-check mx-1'/>
                                                </Button>
                                            </td>
                                            <td>{feed.description}</td>
                                            <td>{feed.created}</td>
                                            <td>{feed.modified}</td>
                                            <td>
                                                <ViewButtonModal feed={feed}></ViewButtonModal>
                                                <Button title='Editar' className="btn-icon btn-rounded" variant={'outline-warning'} href="./feeds/edit" >
                                                    <i className='fas fa-edit mx-1'/>
                                                </Button>
                                                <DeleteButtonModal></DeleteButtonModal>
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
