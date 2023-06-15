import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import CrudButton from '../../components/Button/CrudButton'; 
import TableEntity from './components/TableEntity'; 
import { getAllEntities, getEntities } from '../../api/services/entities';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import Search from '../../components/Search/Search';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import Alert from '../../components/Alert/Alert';


const ListEntity = () => {
    const [entities, setEntities] = useState([]);
    const [isModify, setIsModify] = useState(null);
    
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [allEntities, setAllEntities] = useState([]);
    
    //Alert
    const [showAlert, setShowAlert] = useState(false);

    //AdvancedPagination
    const [currentPage, setCurrentPage] = useState(1);
    const [countItems, setCountItems] = useState(0);

    function updatePage(chosenPage){
        setCurrentPage(chosenPage);
    }
    useEffect( ()=> {


        
    }, [])

    useEffect( ()=> {

        getAllEntities()
            .then(response => {
                setAllEntities(response)
            })
            .catch(() => {
                console.log("se produjo un error en el getAll")
            })

        getEntities(currentPage) 
            .then((response) => {
                setEntities(response.data.results);
                // Pagination
                setCountItems(response.data.count);
            })
            .catch((error) => {
                // Show alert
            })
            .finally(() => {
                setShowAlert(true)
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
        show = entities
    } else {
        show = allEntities.filter( (item) => 
            item.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

return (
    <React.Fragment>
        <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)} component="entity"/>
        <Row>
            <Navigation actualPosition={'Entidades'}/>  
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col sm={12} lg={9}>
                                <Search type="entidad" action={action} search={search} setSearch={setSearch}/> 
                            </Col>
                            <Col sm={12} lg={3}>
                                <Link to={{pathname:'/entities/create'}} >
                                    <CrudButton type='create' name='Entidad' />
                                </Link>
                            </Col> 
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <TableEntity setIsModify={setIsModify} list={entities} loading={loading} currentPage={currentPage}/>
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

export default ListEntity; 
