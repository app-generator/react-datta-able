import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb, Card } from 'react-bootstrap';
import TableContact from './components/Table/TableContact';
import CrudButton from '../../components/Button/CrudButton';
import Pagination from "../../components/Pagination/Pagination"; 
import { getContacts } from '../../api/services/contacts';
import Alert from "../../components/Alert/Alert";
import { Link } from 'react-router-dom';

const ListContact = () => {
    const [contacts, setContacts] = useState([])
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)

    const [currentPage, setCurrentPage] = useState(1)
    const [jumpPage, setjumpPage] = useState(false)
    const [pages, setPages] = useState(0)
    const [arrayPages, setArrayPages] = useState([])

    useEffect( ()=> {
        if(sessionStorage.getItem('Alerta')) {
            const storage = JSON.parse(sessionStorage.getItem('Alerta'));
            setAlert(storage)
                setTimeout(() => {
                    setAlert(null)
                    setStateAlert(null)
                    sessionStorage.removeItem('Alerta')
                }, 5000);
        }
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
        show = contacts
    } else {
        show = contacts.filter( (item) => 
            item.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

    const callbackBackend = (name, stateAlert, lastItem) => {
        if(stateAlert) {
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
            setAlert({name:name, type:1})
                setTimeout(() => {
                    setAlert(null)
                    setStateAlert(null)
                }, 5000);
        }
        else {
            setAlert({name:name, type:0})
        }
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
            getContacts(page).then((response) => {
                setContacts(response.data.results)
            })
            setLoading(false)
            }
            fetchPosts();
        }
    }

    console.log('array ' + arrayPages)
    CambioDepagina(arrayPages[currentPage-1])
    const currentPosts = contacts// lo que se muestra
    
    return (
    <React.Fragment>
        <Row>
            <Alert alert={alert} stateAlert={stateAlert} />
            <Breadcrumb>
                <Breadcrumb.Item href="./app/dashboard/default"><i className="fas fa-home" /></Breadcrumb.Item>
                <Breadcrumb.Item active>Contactos</Breadcrumb.Item>
                <Breadcrumb.Item href='#' active>Listado</Breadcrumb.Item>
            </Breadcrumb>
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col sm={12} lg={9}>
                                <div className="input-group">
                                    <input value={search} onChange={searcher} type="text" id="m-search" className="form-control" placeholder="Buscar contacto . . ." />
                                    <span className="search-btn btn btn-primary">
                                        <i className="feather icon-search " />
                                    </span>
                                </div>
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
            </Col>
        </Row>
    </React.Fragment>
)}
export default ListContact;
