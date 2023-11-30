import React,{ useState} from 'react'
import { Row, Col, Badge, Card, Form, Button, Table, Modal, CloseButton , Spinner} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deleteFeed,  putActivationStatus, getFeed } from "../../../api/services/feeds";
import CrudButton from '../../../components/Button/CrudButton';
import ActiveButton from '../../../components/Button/ActiveButton';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import Alert from '../../../components/Alert/Alert';
import Ordering from '../../../components/Ordering/Ordering'

const TableFeed = ({feeds, loading, order, setOrder, setLoading, currentPage}) => {
    const [remove, setRemove] = useState(false);
    const [deleteName, setDeleteName] = useState("");
    const [deleteUrl, setDeleteUrl] = useState("");
    const [error, setError] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [feed, setFeed] = useState({});
    const [showState,setShowState] =useState(false);
    const [dataState,setDataState] =useState({});
    const [showAlert, setShowAlert] = useState(false)

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    }

    const showModalChangeState = (url, name, active )=> {

        setDataState({url:url, name:name, state: active})
        setShowState(true)
    }
    const changeState=()=>{
        
        putActivationStatus(dataState.url, !dataState.state)
        .then(() => {
            window.location.href = '/feeds';
        })
        .catch((error) => {
            setError(error);
            setShowAlert(true)           
            })
        .finally(()=>{
            setShowState(false)
        })
    }

    const handleShow = (name, url) => {

        setDeleteName(name)
        setDeleteUrl(url) 
        setRemove(true)
       
    }
    const handleDelete = () => {
        deleteFeed(deleteUrl).then(() => {
            window.location.href = '/feeds';
          })
          .catch((error) => {
            setShowAlert(true)
            setError(error);
          })
         .finally(()=>{
            setRemove(false)
          })
    }

    const showModalFeed = (feed) => {
        getFeed(feed.url).then((response) => { 
            setFeed(response.data)
        })
        setModalShow(true)
    }

    const resetShowAlert = () => {
        setShowAlert(false);
    }

  return (
    <div>
        <Card.Body>       
        <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>                      
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <Ordering field="name" label="Nombre" order={order} setOrder={setOrder} setLoading={setLoading} />
                        <th>Activo</th>
                        <th>Casos Asociados</th>                                                                                  
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {feeds.map((feed, index) => {
                        const parts = feed.url.split("/");
                        let itemNumber = parts[parts.length - 2];
                        return (
                        <tr key={index}>
                            <th scope="row">{1+index+10*(currentPage-1)}</th>
                            <td>{feed.name}</td>
                            <td>
                                
                                <ActiveButton active={feed.active} onClick={() => showModalChangeState(feed.url,feed.name, feed.active)} />
                            </td>
                            <td>24256</td>
                            <td>
                                <CrudButton  type='read' onClick={() => showModalFeed(feed) }/>
                                <Link to={{pathname:"./feeds/edit", state:feed}} >
                                    <CrudButton type="edit" />                                                    
                                </Link>   
                                <CrudButton  type='delete' onClick={()=>handleShow(feed.name, feed.url)} /> 
                            </td>
                        </tr>
                    )})}
                </tbody>
            </Table>
            <ModalConfirm type='delete' component='Fuentes de Información' name={deleteName} showModal={remove} onHide={() => setRemove(false)} ifConfirm={() => handleDelete(deleteUrl)}/>
            <ModalConfirm type='editState' component='Fuentes de Información' name={dataState.name} state={dataState.state} showModal={showState} onHide={() => setShowState(false)} ifConfirm={() => changeState()}/>
            <Modal size='lg' show={modalShow} onHide={() => setModalShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>            
            <Modal.Body>
                <Row>    
                    <Col>                 
                        <Card>
                            <Card.Header> 
                                <Row>
                                    <Col>
                                        <Card.Title as="h5">Fuentes de Informacion</Card.Title>
                                        <span className="d-block m-t-5">Detalle de fuente de informacion</span>
                                    </Col>
                                    <Col sm={12} lg={2}>
                                        <Link to={{pathname:"./feeds/edit", state:feed}} >
                                            <CrudButton type="edit" />
                                        </Link>
                                        <CloseButton aria-label='Cerrar' onClick={() => setModalShow(false)} />
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive >
                                    <tr>
                                        <td>Id del sistema</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={feed.slug}/>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Nombre</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={feed.name} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Activo</td>
                                        <td>
                                            <ActiveButton active={feed.active} />
                                        </td>
                                    </tr>
                                    { (feed.description == undefined) ? '' : 
                                            <tr>
                                                <td>Descripcion</td>
                                                <td>
                                                    <Form.Control style={{resize:"none"}} as="textarea" rows={3} plaintext readOnly defaultValue={feed.description} />
                                                </td>
                                            </tr>

                                    }                                     
                                    <tr>
                                        <td>Informacion Relacionada</td>
                                        <td>
                                            <Button size="sm" variant='light' className="text-capitalize">
                                                Incidentes
                                                <Badge variant="light" className="ml-1">24256</Badge>
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Creación</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={feed.created ? feed.created.slice(0,10)+" "+feed.created.slice(11,19) : ""} />
                                        </td>
                                    </tr>
                                     <tr>
                                        <td>Actualización</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={feed.modified ? feed.modified.slice(0,10)+" "+ feed.modified.slice(11,19) : ""} />
                                        </td>
                                    </tr>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col> 
                </Row>
            </Modal.Body>
        </Modal>
        </Card.Body>
    </div>
  )
}

export default TableFeed
