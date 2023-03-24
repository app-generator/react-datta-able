import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row  } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert'; 
import CrudButton from '../../components/Button/CrudButton'; 
import Pagination from '../../components/Pagination/Pagination'; 
import TableCase from './components/TableCase'; 
import { getCases, getOrderingCases } from '../../api/services/cases';
import { Link } from 'react-router-dom';
import Navigation from '../../components/navigation/navigation';
import Search from '../../components/search/search';

const ListCase = () => {
    const [cases, setCases] = useState([]) //lista de casos
    const [error, setError] = useState(null)

    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    const [order, setOrder] = useState('+id')


    useEffect( ()=> {

        getOrderedCases();

    }, [order])

    
    const getOrderedCases = () => {
        
        getOrderingCases(1, [], 10, order)
        .then((response) => {
            console.log(response)
            setCases(response)
            setLoading(false)
        })
        .catch((error)=>{
            setError(error)
        })
    }

    if (error) {
        console.log(error);
        return <p>Ups! Se produjo un error al buscar los casos.</p>
    }

    //valores ingresados
    const searcher = (e) => {
        setSearch(e.target.value) 
        }
    //filtro
    let show = []
    if (!search) {
        show = cases
    } else {
        show = cases.filter( (item) => 
            item.assigned.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

return (
    <React.Fragment>
        <Row>
            <Navigation actualPosition={'Casos'}/>  
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Search type="caso" action={searcher} />
                            <Col sm={12} lg={3}>
                                <Link to={{pathname:'/case/create'}} >
                                    <CrudButton type='create' name='Caso' />
                                </Link>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Check 
                                        type="switch"
                                        id="custom-switch"
                                        label="Descendente"
                                        onChange={() => setOrder(`${order == '+id' ? '-id' : +'id'}`)}
                                    />
                                </Form.Group>
                            </Col> 
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <TableCase list={show} loading={loading} />
                    </Card.Body>
                </Card>
                {/*<Alert/>*/}
                </Col>
        </Row>
    </React.Fragment>
)}

export default ListCase; 
