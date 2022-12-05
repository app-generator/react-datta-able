import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Search from './elements/Search';
import AddButton from './elements/AddButton';

const TraerEntity = () => {
    const url = "http://localhost:8000/api/entity/";
    
    
    const cookie = document.cookie
    console.log(cookie)
    
    const datos2 = fetch(url, {
        method: 'GET',
        credentials : 'include',
        
        headers: {
            'Access-Control-Allow-Credentials':true,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': {
                'csrftoken':'ZtWrkJMH0Tv9T0rkpkK5WhPap8TjKvKR0Rz0XPdI3Gp9k23mYv3V5ypcnZhCOE3c',
                'sessionid' :'y09si1owompdwdji3fgvvk6hlb1hnx9m'
            }
            }
        })
        .then((res) => console.log(res))        
        {/*
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie' : {cookie}}
            }
        )
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setData(data.results)
        })
    }, [])
*/}    

return (
    <React.Fragment>
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
                                    <th>Creado</th>
                                    <th>Modificado</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                    </td>
                                </tr>
                                {/* 
                                {articulos.map((art, index) => {
                                    return (
                                        console.log(articulos),
                                        <tr key={art.id}>
                                        <th scope="row">{index +1}</th>
                                        <td>{art.nombre}</td>
                                        <td>
                                        <Button className="btn-icon btn-rounded" variant='outline-success' title='Activo'>
                                            <i className='feather icon-check-circle'/>
                                        </Button>
                                        </td>
                                        <td>{art.direccion}</td>
                                        <td>{art.telefono}</td>
                                        <td>
                                        <Button className="btn-icon btn-rounded" variant='outline-primary' title='Detalle' href='/entity/show'>
                                            <i className='fas fa-eye'/>
                                        </Button>
                                        <Button className="btn-icon btn-rounded" variant='outline-warning' title='Editar' href='/entity/edit'>
                                            <i className='fas fa-edit'/>
                                        </Button>
                                        <Button className="btn-icon btn-rounded" variant='outline-danger' title='Eliminar'>
                                            <i className='fas fa-trash-alt'/>
                                        </Button>
                                    </td>
                                    </tr>
                                    );
                                })}
                            */}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </React.Fragment>
);                            
}
export default TraerEntity;