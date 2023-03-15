import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert'; 
import CrudButton from '../../components/Button/CrudButton'; 
import Pagination from '../../components/Pagination/Pagination'; 
import TableEntity from './components/TableEntity'; 
import { getEntities } from '../../api/services/entities';
import { Link } from 'react-router-dom';
import Navigation from '../../components/navigation/navigation';
import Search from '../../components/search/search';

const ListEntity = () => {
    const [entities, setEntities] = useState([])
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)
    const [jumpPage, setjumpPage] = useState(false)
    const [pages, setPages] = useState(0)
    const [arrayPages, setArrayPages] = useState([])
  
    useEffect( ()=> {
        console.log('useEffect')
        setCurrentPage(currentPage )//?

        console.log('CURRENT '+currentPage)
        getEntities('?page='+currentPage) //error al borrar el ultimo elemento de la pagina
            .then((response) => {
                //Pagination
                console.log('use effect')
                setPages(arrayWithPages(response.data.count,response.data.results.length))
                setEntities(response.data.results)
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
        console.log('funcion arrayWithPages')

        console.log(numberOfItems);
        console.log(numberOfElementsOnAPage);
        const numberOfPages= Math.ceil(numberOfItems / 10) //numberOfElementsOnAPage 
        console.log(numberOfPages)
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
        return <p>Ups! Se produjo un error al buscar las entidades.</p>
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
        show = entities.filter( (item) => 
            item.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

    const callbackBackend = (lastItem) => {
        console.log('funcion callbackBackend')
        setLoading(true)
        if(lastItem) {
            console.log('if lastItem')
            setCurrentPage(currentPage-1) //ir a la pagina anterior, no se queda en azul la current page
            setArrayPages(arrayPages.slice(0, -1)) 
            //CambioDepagina(arrayPages[currentPage-1])
        }
        else {
            console.log('else lastItem')
        }
        setPages(0)//
    }

    //Pagination
    function CambioDepagina(page){
        console.log('funcion cambio de pagina')
        if (jumpPage){
            console.log('CambioDepagina if jumpPage')
            console.log(page)
            setLoading(true)
            setjumpPage(false)

            const fetchPosts = async () => {
            console.log('funcion fetchPosts')
            getEntities(page).then((response) => {
                setEntities(response.data.results)
            })
            setLoading(false)
            }
            fetchPosts();
        }
    }

    console.log('array ' + arrayPages)
    CambioDepagina(arrayPages[currentPage-1])
    const currentPosts = entities// lo que se muestra
 
    const action = () => {
        console.log("llamada backend")
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
                            <Search type="entidad" action={action} />
                            <Col sm={12} lg={3}>
                                <Link to={{pathname:'/entity/create'}} >
                                    <CrudButton type='create' name='Entidad' />
                                </Link>
                            </Col> 
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <TableEntity callback={callbackBackend} list={currentPosts} loading={loading} />
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

export default ListEntity; 
