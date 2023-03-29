import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Breadcrumb, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getFeeds } from '../../api/services/feeds';
import ButtonView from './components/ButtonView';
import ButtonDelete from './components/ButtonDelete';
import ButtonState from './components/ButtonState';
import CrudButton from '../../components/Button/CrudButton';
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/Navigation/Navigation';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';


const ListFeed = () => {
    
    const [feeds, setFeeds] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const [countItems, setCountItems] = useState(0);


    function updatePage(chosenPage){
        setCurrentPage(chosenPage);
    }
    
    useEffect(() => {                
        getFeeds(currentPage)
        .then((response) => {
            setCountItems(response.data.count)
            setFeeds(response.data.results)
        })
        .catch((error)=>{
            // show alert
        })
        .finally(() => {
            setLoading(false)
        })
    }, [countItems, currentPage]);  
    
    //valores ingresados
    const searcher = (e) => {
        setSearch(e.target.value) //actualizar
    }

    //filtro
    let list = []
    if (!search) {
        list = feeds
    } else {
        list = feeds.filter( (item) => 
            item.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    }
        
    return (
        <React.Fragment>
            <Row>
                <Navigation actualPosition={'Fuentes de Información'}/>
            </Row>
            <Row>
                <Col>             
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col sm={12} lg={9}>
                                    <React.Fragment>
                                        <div className="input-group">
                                            <input value={search} onChange={searcher} type="text" id="m-search" className="form-control" placeholder="Buscar fuente de informacion . . ." />
                                            <span className="search-btn btn btn-primary">
                                                <i className="feather icon-search " />
                                            </span>
                                        </div>
                                    </React.Fragment>                                 
                                </Col>
                                <Col sm={12} lg={3}>
                                    <React.Fragment>                                        
                                        <Link to={{pathname:'./feeds/create'}} >
                                            <CrudButton type='create' name='Fuente' />
                                        </Link>
                                    </React.Fragment>                           
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
                                        <th>Casos Asociados</th>                                                                                  
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.sort((a, b) => (a.name < b.name ? -1 : 1)).map((feed,i) => (
                                        <tr key={i}>
                                            <th scope="row">{i+1}</th>
                                            <td>{feed.name}</td>
                                            <td>
                                                <ButtonState feed={feed}></ButtonState>
                                            </td>
                                            <td>24256</td>
                                            <td>
                                                <ButtonView feed={feed}></ButtonView>
                                                <Link to={{pathname:"./feeds/edit", state:{feed}}} >
                                                    <CrudButton type="edit" />                                                    
                                                </Link>    
                                                <ButtonDelete feed={feed}></ButtonDelete>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer >
                            <Row className="justify-content-md-center">
                                <Col md="auto"> 
                                    <AdvancedPagination countItems={countItems} updatePage={updatePage} ></AdvancedPagination>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>            
        </React.Fragment>
    );
};

export default ListFeed;
