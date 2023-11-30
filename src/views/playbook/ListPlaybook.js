import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CrudButton from '../../components/Button/CrudButton';
import Navigation from '../../components/Navigation/Navigation';
import TablePlaybook from './components/TablePlaybook';
import Search from '../../components/Search/Search';
import { getPlaybooks } from '../../api/services/playbooks';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';

const ListPlaybook = () => {
    const [playbook, setPlaybook] = useState('')
    const [isModify, setIsModify] = useState(null);

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true)

    //AdvancedPagination
    const [currentPage, setCurrentPage] = useState(1);
    const [countItems, setCountItems] = useState(0);
    const [updatePagination, setUpdatePagination] = useState(false)
    const [disabledPagination, setDisabledPagination] = useState(true)

    function updatePage(chosenPage){
        setCurrentPage(chosenPage);
    }

    useEffect( ()=> {

        getPlaybooks(currentPage)
            .then((response) => {
                setPlaybook(response.data.results);
                // Pagination
                setCountItems(response.data.count);
                if(currentPage === 1){
                    setUpdatePagination(true)  
                }
                setDisabledPagination(false)
            })
            .catch((error) => {
                // Show alert
            })
            .finally(() => {
                //setShowAlert(true)
                setLoading(false)
            })
        
    }, [countItems, currentPage, isModify])

    // ------- SEARCH --------
    const action = () => {
        console.log("llamada backend")
    }

    return (
    <React.Fragment>
        <Row>
            <Navigation actualPosition={'Playbook'}/>  
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col>
                                <Search type="playbook" action={action} search={search} setSearch={setSearch}/> 
                            </Col>
                            <Col sm={3} lg={3}>
                            <Link to={{pathname:'/playbooks/create'}} >
                                    <CrudButton type='create' name='Playbook' />
                                </Link>
                            </Col> 
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <TablePlaybook setIsModify={setIsModify} list={playbook} loading={loading} currentPage={currentPage}/>
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
)}

export default ListPlaybook; 
