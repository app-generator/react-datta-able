import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert'; 
import CrudButton from '../../components/Button/CrudButton'; 
import Pagination from '../../components/Pagination/Pagination'; 
import TableCase from './components/TableCase'; 
import { getCases } from '../../api/services/cases';
import { Link } from 'react-router-dom';
import Navigation from '../../components/navigation/navigation';
import Search from '../../components/search/search';

const ListCase2 = () => {
    const [cases, setCases] = useState([]) //lista de casos
    const [error, setError] = useState(null)

    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)
    const [jumpPage, setjumpPage] = useState(false)
    const [pages, setPages] = useState(0)
    const [arrayPages, setArrayPages] = useState([])
  
    useEffect( ()=> {
        setCurrentPage(currentPage )//?

        getCases('?page='+currentPage) //error al borrar el ultimo elemento de la pagina
            .then((response) => {
                //Pagination
                setPages(arrayWithPages(response.data.count,response.data.results.length))
                setCases(response.data.results)
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [pages])
        
    //Pagination
    function arrayWithPages(numberOfItems,numberOfElementsOnAPage ) {
        const numberOfPages= Math.ceil(numberOfItems / 10) //numberOfElementsOnAPage 
        const complementUrl ="?page="
        const arrayLinks=[]
        for (var i = 1; i <= numberOfPages; i++) {
            arrayLinks.push(complementUrl+i)
        }
        setArrayPages(arrayLinks)
        return numberOfPages
    }

    if (error) {
        console.log(error);
        return <p>Ups! Se produjo un error al buscar los casos.</p>
    }

    //valores ingresados
    const searcher = (e) => {
        setSearch(e.target.value) 
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

    const callbackBackend = (lastItem) => {
        setLoading(true)
        if(lastItem) {
            setCurrentPage(currentPage-1) 
            setArrayPages(arrayPages.slice(0, -1)) 
        }
        else {
            console.log('else lastItem')
        }
        setPages(0)//
    }

    //Pagination
    function CambioDepagina(page){
        if (jumpPage){
            setLoading(true)
            setjumpPage(false)

            const fetchPosts = async () => {
            getCases(page).then((response) => {
                setCases(response.data.results)
            })
            setLoading(false)
            }
            fetchPosts();
        }
    }

    CambioDepagina(arrayPages[currentPage-1])
    const currentPosts = cases// lo que se muestra
 
    const action = () => {
        console.log("llamada backend")
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
                            <Search type="caso" action={action} />
                            <Col sm={12} lg={3}>
                                <Link to={{pathname:'/case/create'}} >
                                    <CrudButton type='create' name='Caso' />
                                </Link>
                            </Col> 
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <TableCase callback={callbackBackend} list={currentPosts} loading={loading} />
                    </Card.Body>
                    <Card.Footer >
                        <Row className="justify-content-md-center">
                            <Col md="auto"> 
                                <Pagination pages={pages} setCurrentPage={setCurrentPage} setjumpPage={setjumpPage} />
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
                {/*<Alert/>*/}
                </Col>
        </Row>
    </React.Fragment>
)}

export default ListCase2; 
