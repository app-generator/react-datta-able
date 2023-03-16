import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Breadcrumb, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getFeeds } from '../../api/services/feeds';
import ButtonView from './components/ButtonView';
import ButtonDelete from './components/ButtonDelete';
import ButtonState from './components/ButtonState';
import CrudButton from '../../components/Button/CrudButton';
import Alert from '../../components/Alert/Alert';
import Pagination from '../../components/Pagination/Pagination';
import Navigation from '../../components/Navigation/Navigation';


const ListFeed = () => {
    
    const [feeds, setFeeds] = useState([]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true)
    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)

    const [currentPage, setCurrentPage] = useState(1)
    const [jumpPage, setjumpPage] = useState(false)
    const [pages, setPages] = useState(0)
    const [arrayPages, setArrayPages] = useState([])


    function arrayWithPages(numberOfItems) {
        const numberOfPages = Math.ceil(numberOfItems / 10) //numberOfElementsOnAPage        
        const arrayNumberOfPages=[]
        for (var i = 1; i <= numberOfPages; i++) {
            arrayNumberOfPages.push(i)
        }
        setArrayPages(arrayNumberOfPages)
        return numberOfPages
    }

    function changePage(page){
        if (jumpPage){
            setLoading(true)
            setjumpPage(false)

            const fetchFeeds = async () => {            
            getFeeds(page).then((response) => {
                setFeeds(response.data.results)
            })
            setLoading(false)
            }

            fetchFeeds();
        }
    }
    
    useEffect(() => {        
        if(sessionStorage.getItem('Alerta')) {
            const storage = JSON.parse(sessionStorage.getItem('Alerta'));
            setAlert(storage)
                setTimeout(() => {
                    setAlert(null)
                    setStateAlert(null)
                    sessionStorage.clear()
                }, 5000);
        }
        setCurrentPage(currentPage)        
        getFeeds(currentPage)
        .then((response) => {
            setPages(arrayWithPages(response.data.count))
            setFeeds(response.data.results)
            setError(null)
        })
        .catch((error)=>{
            setError(error)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [pages]);  
    
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
    
    changePage(arrayPages[currentPage-1])
    
    return (
        <React.Fragment>
            <Alert alert={alert} stateAlert={stateAlert} />
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
                                    <Pagination pages={pages} setCurrentPage={setCurrentPage} setjumpPage={setjumpPage} />
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
