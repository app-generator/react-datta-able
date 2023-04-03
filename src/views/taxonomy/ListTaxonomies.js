import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ButtonView from './components/ButtonView';
import CrudButton from '../../components/Button/CrudButton';
import ButtonState from './components/ButtonState';
import ButtonDelete from './components/ButtonDelete';
import Alert from '../../components/Alert/Alert';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import Navigation from '../../components/Navigation/Navigation'
import { getTaxonomies } from '../../api/services/taxonomies';

const ListTaxonomies = () => {
    
    const [taxonomies, setTaxonomies] = useState([]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true)
    const [showAlert, setShowAlert] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [countItems, setCountItems] = useState(0);

    
    function updatePage(chosenPage){
        setCurrentPage(chosenPage);
    }
    
    useEffect(() => {        
        getTaxonomies(currentPage)
        .then((response) => {
            setCountItems(response.data.count)
            setTaxonomies(response.data.results)
        })
        .catch((error)=>{
            setError(error)                        
        })
        .finally(() => {
            setShowAlert(true)
            setLoading(false)
        })
    }, [countItems, currentPage]); 
    
    
    const resetShowAlert = () => {
        setShowAlert(false);
    }
    
    //valores ingresados
    const searcher = (e) => {
        setSearch(e.target.value) //actualizar
    }

    //filtro
    let list = []
    if (!search) {
        list = taxonomies
    } else {
        list = taxonomies.filter( (item) => 
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
            <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>
            <Row>
                <Navigation actualPosition={'Taxonomia'}/>  
            </Row>
            <Row>
                <Col>             
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col sm={12} lg={9}>
                                <React.Fragment>
                                        <div className="input-group">
                                            <input value={search} onChange={searcher} type="text" id="m-search" className="form-control" placeholder="Buscar taxonomia . . ." />
                                            <span className="search-btn btn btn-primary">
                                                <i className="feather icon-search " />
                                            </span>
                                        </div>
                                    </React.Fragment>                                 
                                </Col> 
                                <Col sm={12} lg={3}>
                                    <React.Fragment>                                        
                                        <Link to={{pathname:'./taxonomy/create'}} >
                                            <CrudButton type='create' name='Taxonomia' />
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
                                        <th>Reportes</th>                                                                         
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.sort((a, b) => (a.name < b.name ? -1 : 1)).map((taxonomy,i) => (
                                        <tr key={i}>
                                            <th scope="row">{i+1}</th>
                                            <td>{taxonomy.name}</td>
                                            <td>
                                                <ButtonState taxonomy={taxonomy}></ButtonState>
                                            </td>                                           
                                            <td>{taxonomy.reports.length}</td>
                                            <td>
                                                <ButtonView taxonomy={taxonomy}></ButtonView> 
                                                <Link to={{pathname:"./taxonomy/edit", state:{taxonomy}}} >
                                                    <CrudButton type="edit" />                                                    
                                                </Link>                                                
                                                <ButtonDelete taxonomy={taxonomy}></ButtonDelete>                                                 
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

export default ListTaxonomies;