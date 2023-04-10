import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import CrudButton from '../../components/Button/CrudButton'; 
import TableCase from './components/TableCase'; 
import { getCases, mergeCase } from '../../api/services/cases';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import Search from '../../components/Search/Search';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';

const ListCase = () => {
    const [cases, setCases] = useState([]) //lista de casos
    const [ifModify, setIfModify] = useState(null) 

    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1);
    const [countItems, setCountItems] = useState(0);

    //merge
    const [showMerge, setShowMerge] = useState(false) 
    const [selectedCases, setSelectedCases] = useState([]);


    function updatePage(chosenPage){
        setCurrentPage(chosenPage);
    }  
    
    useEffect( ()=> {

        getCases('?page='+currentPage) 
            .then((response) => {
                setCases(response.data.results)
                // Pagination
                setCountItems(response.data.count);

            })
            .catch((error) => {
                // Show alert
            })
            .finally(() => {
                setLoading(false)
            })

        }, [countItems, currentPage, ifModify])

    // ------- SEARCH --------
    const action = () => {
        console.log("llamada backend")
    }

    //filtro
    let show = []
    if (!search) {
        show = cases
    } else {
        show = cases.filter( (item) => 
            item.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }
    const merge = () => {
        const selectedUrls = Object.keys(selectedCases).filter((url) => selectedCases[url]);
        const parent = selectedUrls.shift();
        selectedUrls.forEach(child => {
            mergeCase(parent, child).then(response => setIfModify(response)).catch(error => console.log(error));
        });
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
                            <Col>
                                <Search type="caso" action={action} search={search} setSearch={setSearch}/> 
                            </Col>
                            <Col sm={6} lg={3}>
                                <Link to={{pathname:'/case/create'}} >
                                    <CrudButton type='create' name='Caso' />
                                </Link>
                            </Col> 
                        </Row>                        
                        <Row>
                            <Col>
                                <Button 
                                    size="sm"
                                    className='text-capitalize'
                                    variant='outline-secondary'
                                    title='Mergear'
                                    onClick={()=> setShowMerge(!showMerge)}>
                                    <i class="far fa-minus-square"/>
                                    
                                </Button>
                                <Button 
                                    size="sm"
                                    className='text-capitalize'
                                    variant='outline-danger'
                                    title='Mergear'
                                    onClick={()=> merge()}>
                                    <i class="fa fa-code-branch"/>
                                    Merge
                                </Button>
                            </Col> 
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <TableCase setIfModify={setIfModify} list={cases} loading={loading} showMerge={showMerge} selectedCases={selectedCases} setSelectedCases={setSelectedCases} />
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
)}

export default ListCase; 
