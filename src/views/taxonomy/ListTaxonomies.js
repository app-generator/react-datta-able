import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CrudButton from '../../components/Button/CrudButton';
import Alert from '../../components/Alert/Alert';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import Navigation from '../../components/Navigation/Navigation'
import { getTaxonomies } from '../../api/services/taxonomies';
import Search from '../../components/Search/Search';
import TableTaxonomy from './components/TableTaxonomy';

const ListTaxonomies = () => {
    const [taxonomies, setTaxonomies] = useState([]);
    const [isModify, setIsModify] = useState(null);

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true)

    const [showAlert, setShowAlert] = useState(false);

    const [currentPage, setCurrentPage] = useState(1)
    const [countItems, setCountItems] = useState(0);
    const [updatePagination, setUpdatePagination] = useState(false)
    const [disabledPagination, setDisabledPagination] = useState(true)
    const [wordToSearch, setWordToSearch]= useState('')

    const [order, setOrder] = useState("");


    function updatePage(chosenPage){
        setCurrentPage(chosenPage);
    }
    
    useEffect(() => {        
        getTaxonomies(currentPage,wordToSearch, order)
        .then((response) => {
            setCountItems(response.data.count)
            setTaxonomies(response.data.results)
            if(currentPage === 1){
                setUpdatePagination(true)  
            }
            setDisabledPagination(false)
        })
        .catch((error)=>{
            //alert
        })
        .finally(() => {
            setShowAlert(true)
            setLoading(false)
        })
    }, [currentPage, isModify, order, wordToSearch,]); 
        
    //valores ingresados
    const searcher = (e) => {
        setSearch(e.target.value) //actualizar
    }
      

    return (
        <React.Fragment>
            <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)} />
            
            <Row>
                <Navigation actualPosition={'Taxonomias'}/>  
            </Row>
            <Row>
                <Col>             
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col sm={12} lg={9}>
                                    <Search type="por nombre" setWordToSearch={setWordToSearch} wordToSearch={wordToSearch} setLoading={setLoading}/>
                                </Col> 
                                
                                <Col sm={12} lg={3}>
                                    <Link to={{pathname:'./taxonomies/create'}} >
                                        <CrudButton type='create' name='Taxonomia' />
                                    </Link>
                                </Col>  
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <TableTaxonomy setIsModify={setIsModify} list={taxonomies} loading={loading} currentPage={currentPage} order={order} setOrder={setOrder} setLoading={setLoading}/>
                        </Card.Body>
                        <Card.Footer >
                            <Row className="justify-content-md-center">
                                <Col md="auto"> 
                                    <AdvancedPagination countItems={countItems} updatePage={updatePage} updatePagination={updatePagination} setUpdatePagination={setUpdatePagination} setLoading={setLoading} setDisabledPagination={setDisabledPagination} disabledPagination={disabledPagination}/>
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