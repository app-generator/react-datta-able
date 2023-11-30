import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getFeeds } from '../../api/services/feeds';
import CrudButton from '../../components/Button/CrudButton';
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/Navigation/Navigation';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import TableFeed from './components/TableFeed';
import Search from '../../components/Search/Search'

const ListFeed = () => {    
    const [feeds, setFeeds] = useState([]);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [countItems, setCountItems] = useState(0);

    const [order, setOrder] = useState("");
    const [wordToSearch, setWordToSearch]= useState('')

    const [updatePagination, setUpdatePagination] = useState(false)
    const [disabledPagination, setDisabledPagination] = useState(true)

    function updatePage(chosenPage){
        setCurrentPage(chosenPage);
    }
    //ORDER

    useEffect(() => {
        getFeeds(currentPage, wordToSearch, order)
        .then((response) => {
            setFeeds(response.data.results)
            setLoading(false)
            //PAGINATION
            setCountItems(response.data.count)
            if(currentPage === 1){
                setUpdatePagination(true)  
            }
            setDisabledPagination(false)
        })
        .catch((error)=>{
        })
        .finally(() => {
            setLoading(false)
        })
    }, [countItems, currentPage, wordToSearch, order]);  
 
    return (
        <React.Fragment>
            <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)}/>
            <Row>
                <Navigation actualPosition={'Fuentes de Información'}/>
            </Row>
            <Row>
                <Col>             
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col sm={12} lg={9}>
                                    <Search type=" por nombre o descripción" setWordToSearch={setWordToSearch} wordToSearch={wordToSearch} setLoading={setLoading} />
                                </Col>
                                <Col sm={12} lg={3}>      
                                    <Link to={{pathname:'./feeds/create'}} >
                                        <CrudButton type='create' name='Fuente' />
                                    </Link>
                                </Col>  
                            </Row>                                                                           
                        </Card.Header>
                             <TableFeed feeds={feeds} loading={loading} order={order} setOrder={setOrder} setLoading={setLoading} currentPage={currentPage}/>
                        <Card.Footer >
                            <Row className="justify-content-md-center">
                                <Col md="auto"> 
                                    <AdvancedPagination countItems={countItems} updatePage={updatePage} updatePagination={updatePagination} setUpdatePagination={setUpdatePagination} setLoading={setLoading} setDisabledPagination={setDisabledPagination} disabledPagination={disabledPagination} />
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
