import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert'; 
import CrudButton from '../../components/Button/CrudButton'; 
import Pagination from '../../components/Pagination/Pagination'; 
import TableEntity from './components/TableEntity'; 
import { getAllEntities, getEntities } from '../../api/services/entities';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import Search from '../../components/Search/Search';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';


const ListEntity = () => {
    const [entities, setEntities] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [allEntities, setAllEntities] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [countItems, setCountItems] = useState(0);


    function updatePage(chosenPage){
        setCurrentPage(chosenPage);
    }
    
    useEffect( ()=> {

        getAllEntities()
            .then(response => {
                setAllEntities(response)
            })
            .catch(error => {
                console.log("se produjo un error en el getAll")
            })

        getEntities('?page='+currentPage) //error al borrar el ultimo elemento de la pagina
            .then((response) => {
                setEntities(response.data.results);
                // Pagination
                setCountItems(response.data.count);
            })
            .catch((error) => {
                // Show alert
            })
            .finally(() => {
                setLoading(false)
            })
        
    }, [countItems, currentPage])

    
    const callbackBackend = (lastItem) => {
        setLoading(true)
    }
    
    // ------- SEARCH --------

    const action = () => {
        console.log("llamada backend")
    }

    //valores ingresados
    const searcher = (e) => {
        setSearch(e.target.value) 
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
        <Row>
            <Navigation actualPosition={'Entidades'}/>  
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col sm={12} lg={9}>
                                <Search type="entidad" action={action} />
                            </Col>
                            <Col sm={12} lg={3}>
                                <Link to={{pathname:'/entity/create'}} >
                                    <CrudButton type='create' name='Entidad' />
                                </Link>
                            </Col> 
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <TableEntity callback={callbackBackend} list={entities} loading={loading} currentPage={currentPage}/>
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
