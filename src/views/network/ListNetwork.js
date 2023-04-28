import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import CrudButton from '../../components/Button/CrudButton';
import { getNetworks } from '../../api/services/networks';
import TableNetwork from './components/TableNetwork';
import Navigation from '../../components/Navigation/Navigation';
import Search from '../../components/Search/Search';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';

const ListNetwork = () => {
    const [network, setNetwork] = useState('')
    const [isModify, setIsModify] = useState(null);

    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1);
    const [countItems, setCountItems] = useState(0);


    function updatePage(chosenPage){
        setCurrentPage(chosenPage);
    }

    useEffect( ()=> {

        setCurrentPage(currentPage )//?

        getNetworks('?page='+currentPage)
            .then((response) => {
                setNetwork(response.data.results);
                // Pagination
                setCountItems(response.data.count);
            })
            .catch((error) => {
                // Show alert
            })
            .finally(() => {
                setLoading(false)
            })
        }, [countItems, currentPage, isModify])

            // ------- SEARCH --------
    const action = () => {
        console.log("llamada backend")
    }

    //filtro
    let show = []
    if (!search) {
        show = network
    } else {
        show = network.filter( (item) => 
            item.cidr.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

    return (
    <React.Fragment>
        <Row>
            <Navigation actualPosition={'Redes'}/>  
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col sm={12} lg={9}>
                                <Search type="red" action={action} search={search} setSearch={setSearch}/> 
                            </Col>
                            <Col sm={12} lg={3}>
                                <Link to={{pathname:'/networks/create'}} >
                                    <CrudButton type='create' name='Red' />
                                </Link>
                            </Col> 
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <TableNetwork setIsModify={setIsModify} list={network} loading={loading} currentPage={currentPage}/>
                    </Card.Body>
                    <Card.Footer>
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
)}
export default ListNetwork;
