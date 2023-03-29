import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import TableContact from './components/Table/TableContact';
import CrudButton from '../../components/Button/CrudButton';
import Pagination from "../../components/Pagination/Pagination"; 
import { getContacts } from '../../api/services/contacts';
import Alert from "../../components/Alert/Alert";
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import Search from '../../components/Search/Search';

const ListContact = () => {
    const [contacts, setContacts] = useState([])
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)
    const [jumpPage, setjumpPage] = useState(false)
    const [pages, setPages] = useState(0)
    const [arrayPages, setArrayPages] = useState([])

    useEffect( ()=> {

        setCurrentPage(currentPage )//?

        getContacts('?page='+currentPage)
            .then((response) => {
                //Pagination
                setPages(arrayWithPages(response.data.count,response.data.results.length))                 
                setContacts(response.data.results);
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
        return <p>Ups! Se produjo un error al buscar los contactos.</p>
    }
    
    //valores ingresados
    const searcher = (e) => {
        setSearch(e.target.value) //actualizar
        }
    //filtro
    let show = []
    if (!search) {
        show = contacts
    } else {
        show = contacts.filter( (item) => 
            item.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

    const callbackBackend = (lastItem) => {
            setLoading(true)
            if(lastItem) {
                setCurrentPage(currentPage-1) //ir a la pagina anterior, no se queda en azul la current page
                setArrayPages(arrayPages.slice(0, -1)) 
                //CambioDepagina(arrayPages[currentPage-1])
            }
            setPages(0)//
    }

    //Pagination
    function CambioDepagina(page){
        if (jumpPage){
            
            setLoading(true)
            setjumpPage(false)

            const fetchPosts = async () => {
            getContacts(page).then((response) => {
                setContacts(response.data.results)
            })
            setLoading(false)
            }
            fetchPosts();
        }
    }

    CambioDepagina(arrayPages[currentPage-1])
    const currentPosts = contacts// lo que se muestra
    
    const action = () => {
        console.log("llamada backend")
      }

    return (
    <React.Fragment>
        <Row>
            <Navigation actualPosition={'Contactos'}/>  
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col sm={12} lg={9}>
                                <Search type="contacto" action={action} />
                            </Col>
                            <Col sm={12} lg={3}>
                                <Link to={{pathname:'/contact/create'}} >
                                    <CrudButton type='create' name='Contacto' />
                                </Link>
                            </Col> 
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <TableContact callback={callbackBackend} list={currentPosts} loading={loading} />
                    </Card.Body>
                    <Card.Footer>
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
export default ListContact;
