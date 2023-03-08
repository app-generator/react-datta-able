import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getTasks } from '../../api/services/tasks';
import Alert from '../../components/Alert/Alert';
import CrudButton from '../../components/Button/CrudButton';
import Navigation from '../../components/navigation/navigation';
import Search from '../../components/search/search';
import TableTask from './components/Table/TableTask';

const ListTask = () => {

    const [task, setTask] = useState('')

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)
    const [jumpPage, setjumpPage] = useState(false)
    const [pages, setPages] = useState(0)
    const [arrayPages, setArrayPages] = useState([])

    useEffect( ()=> {

        setCurrentPage(currentPage )//?

        getTasks('?page='+currentPage)
            .then((response) => {
                //Pagination
                setPages(arrayWithPages(response.data.count,response.data.results.length))                 
                setTask(response.data.results);
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
            getTasks(page).then((response) => {
                setTask(response.data.results)
            })
            setLoading(false)
            }
            fetchPosts();
        }
    }

    console.log('array ' + arrayPages)
    CambioDepagina(arrayPages[currentPage-1])
    const currentPosts = task// lo que se muestra
    
    const action = () => {
        console.log("llamada backend")
      }

    
    return (
    <React.Fragment>
        <Row>
            <Navigation actualPosition={'Tarea'}/>  
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Search type="tarea" action={action} />
                            <Col sm={12} lg={3}>
                                <Link to={{pathname:'/task/create'}} >
                                    <CrudButton type='create' name='Tarea' />
                                </Link>
                            </Col> 
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <TableTask callback={callbackBackend} list={currentPosts} loading={loading} />
                    </Card.Body>
                    <Card.Footer >

                    </Card.Footer>
                </Card>
                <Alert/>
            </Col>
        </Row>
    </React.Fragment>
)}

export default ListTask; 
