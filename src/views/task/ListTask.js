import React, { useState, useEffect } from 'react';
import { Card, CloseButton, Col, Row, Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getTasks } from '../../api/services/tasks';
import Alert from '../../components/Alert/Alert';
import CrudButton from '../../components/Button/CrudButton';
import Navigation from '../../components/navigation/navigation';
import Pagination from '../../components/Pagination/Pagination';
import Search from '../../components/search/search';
import TableTask from './components/Table/TableTask';
import FormCreateTask from './components/Form/FormCreateTask';
import { postTask } from '../../api/services/tasks';


const ListTask = (props) => { //inCard: true = agregarlo a createPlaybook

    const [task, setTask] = useState('')
    
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)
    const [jumpPage, setjumpPage] = useState(false)
    const [pages, setPages] = useState(0)
    const [arrayPages, setArrayPages] = useState([])

    //Create Task
    const [modalCreate, setModalCreate] = useState(false)
    const [name, setName] = useState(''); //required
    const [priority, setPriority] = useState('0'); //required
    const [playbook, setPlaybook] = useState('0'); //required
    const [description, setDescription] = useState(null);

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


      const createTask = () => { //refactorizar al FormContact

        postTask (name, description, priority, playbook)
            .then((response) => { 
                console.log(response)
            })
            .catch((error) => {
                setError(error)
                console.log(error)
            })
            .finally(() => {
                setModalCreate(true)
            })
    };

    return (
    <React.Fragment>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col sm={12} lg={9}>
                                <Card.Title as="h5">Tareas</Card.Title>
                                <span className="d-block m-t-5">Lista de Tareas</span>
                            </Col>
                            <Col sm={12} lg={3}>
                                <CrudButton type='create' name='Tarea' onClick={() => setModalCreate(true)} />
                            </Col> 
                        </Row>
                    </Card.Header> 
                    <Card.Body>
                        <TableTask callback={callbackBackend} list={currentPosts} loading={loading} />
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

        <Modal size='lg' show={modalCreate} onHide={() => setModalCreate(false)} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
                <Row>    
                    <Col>                 
                        <Card>
                        <Card.Header> 
                                <Row>
                                    <Col>
                                        <Card.Title as="h5">Tareas</Card.Title>
                                        <span className="d-block m-t-5">Crear tarea</span>
                                    </Col>
                                    <Col sm={12} lg={2}>                       
                                        <CloseButton aria-label='Cerrar' onClick={() => setModalCreate(false)} />
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                            <FormCreateTask 
                                name={name} setName= {setName} 
                                priority={priority} setPriority={setPriority} 
                                description={description} setDescription={setDescription} 
                                playbook={playbook} setPlaybook={setPlaybook} 
                                ifConfirm={createTask} ifCancel={() => setModalCreate(false)} />
                            </Card.Body>
                        </Card>
                    </Col> 
                </Row>
            </Modal.Body>
        </Modal>
    </React.Fragment>
)}

export default ListTask; 
