import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import CrudButton from '../../components/Button/CrudButton'; 
import TableCase from './components/TableCase'; 
import { getCases, mergeCase } from '../../api/services/cases';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import Search from '../../components/Search/Search';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import ModalConfirm from '../../components/Modal/ModalConfirm';

const ListCase = () => {
    const [cases, setCases] = useState([]) //lista de casos
    const [ifModify, setIfModify] = useState(null) 

    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1);
    const [countItems, setCountItems] = useState(0);

    //merge
    const [selectedCases, setSelectedCases] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCasesId, setSelectedCasesId] = useState([]);



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
        
        const getId = (url) => {
            let id = url.split('/')[(url.split('/')).length-2];
            return id;
        }

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
    //-----------------MERGE------------------------
    
    const mergeConfirm = () => {
        //setId
        setShowModal(true);
    }

    const merge = () => {
        const parent = selectedCases.shift();
        selectedCases.forEach(child => {
            console.log(`MERGE --> parent: ${parent} \n          child:${child} `)
            mergeCase(parent, child)
                .then(response => setIfModify(response))
                .catch(error => console.log(error))
                .finally(() => {
                    setSelectedCases([])
                    setShowModal(false)
                })
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
                                    disabled={selectedCases.length > 1 ? false : true}
                                    size="sm"
                                    className='text-capitalize'
                                    variant='light'
                                    title='Mergear'
                                    onClick={() => mergeConfirm()}>
                                    <i variant='danger' class="fa fa-code-branch"/>
                                        Merge&nbsp;
                                    <Badge  
                                        className="badge mr-1" >
                                        {selectedCases.length} 
                                    </Badge>
                                </Button>                                
                            </Col> 
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <TableCase setIfModify={setIfModify} list={cases} loading={loading} selectedCases={selectedCases} setSelectedCases={setSelectedCases} />
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
        <ModalConfirm type='merge' component='casos' name={selectedCases} showModal={showModal} onHide={() => setShowModal(false)} ifConfirm={() => merge()}/>

    </React.Fragment>
)}

export default ListCase; 
