import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert'; 
import CrudButton from '../../components/Button/CrudButton'; 
import Pagination from '../../components/Pagination/Pagination'; 
import TableCase from './components/TableCase'; 
import { getCases } from '../../api/services/cases';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import Search from '../../components/Search/Search';

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

        getCases('?page=1') //error al borrar el ultimo elemento de la pagina
            .then((response) => {
                console.log(response.data.results)
                setCases(response.data.results)
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })

    }, []);

    console.log(cases);
        
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
                            <Col>
                                <Search type="caso" action={action} />
                            </Col>
                            <Col sm={12} lg={3}>
                                <Link to={{pathname:'/case/create'}} >
                                    <CrudButton type='create' name='Caso' />
                                </Link>
                            </Col> 
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <TableCase callback={callbackBackend} list={cases} loading={loading} />
                    </Card.Body>
                    {/*
                    <Card.Footer >
                        <Row className="justify-content-md-center">
                            <Col md="auto"> 
                                <Pagination pages={pages} setCurrentPage={setCurrentPage} setjumpPage={setjumpPage} />
                            </Col>
                        </Row>
                    </Card.Footer>
                            */}
                </Card>
                {/*<Alert/>*/}
                </Col>
        </Row>
    </React.Fragment>
)}

export default ListCase2; 
