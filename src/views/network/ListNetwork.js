import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import CrudButton from '../../components/Button/CrudButton';
import Pagination from "../../components/Pagination/Pagination"; 
import Alert from "../../components/Alert/Alert";
import { getNetworks } from '../../api/services/networks';
import TableNetwork from './components/Table/TableNetwork';
import Navigation from '../../components/navigation/navigation';
import Search from '../../components/search/search';

const ListNetwork = () => {
    const [network, setNetwork] = useState('')

    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)
    const [jumpPage, setjumpPage] = useState(false)
    const [pages, setPages] = useState(0)
    const [arrayPages, setArrayPages] = useState([])

    useEffect( ()=> {

        setCurrentPage(currentPage )//?

        getNetworks('?page='+currentPage)
            .then((response) => {
                //Pagination
                setPages(arrayWithPages(response.data.count,response.data.results.length))                 
                setNetwork(response.data.results);
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
        return <p>Ups! Se produjo un error al buscar los contactos.</p>
    }
    
    //valores ingresados
    const searcher = (e) => {
        setSearch(e.target.value) //actualizar
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

    const callbackBackend = (lastItem) => {
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
            getNetworks(page).then((response) => {
                setNetwork(response.data.results)
            })
            setLoading(false)
            }
            fetchPosts();
        }
    }

    console.log('array ' + arrayPages)
    CambioDepagina(arrayPages[currentPage-1])
    const currentPosts = network// lo que se muestra
    
    const action = () => {
        console.log("llamada backend")
      }

    return (
    <React.Fragment>
        <Row>
            <Navigation actualPosition={'Redes'}/>  
        </Row>
        <Row>
                                <Alert/>    
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Search type="red" action={action} />
                            <Col sm={12} lg={3}>
                                <Link to={{pathname:'/network/create'}} >
                                    <CrudButton type='create' name='Red' />
                                </Link>
                            </Col> 
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <TableNetwork callback={callbackBackend} list={currentPosts} loading={loading} />
                    </Card.Body>
                    <Card.Footer>
                        <Row className="justify-content-md-center">
                            <Col md="auto"> 
                               <Pagination pages={pages} setCurrentPage={setCurrentPage} setjumpPage={setjumpPage} />
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
                <Alert/>
            </Col>
        </Row>
    </React.Fragment>
)}
export default ListNetwork;
