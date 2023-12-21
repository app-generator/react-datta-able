import React,{ useState} from 'react'
import {
    Button,Card, Table , Modal, Row,Col, Form, CloseButton, Spinner
  } from 'react-bootstrap';
import CrudButton from '../../../components/Button/CrudButton';
import {Link} from 'react-router-dom'
import ActiveButton from '../../../components/Button/ActiveButton';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import { deleteTemplate, isActive } from "../../../api/services/templates";
import Alert from '../../../components/Alert/Alert';
import CallBackendByName from '../../../components/CallBackendByName'; 
import { getTaxonomy } from '../../../api/services/taxonomies';
import { getFeed } from '../../../api/services/feeds';
import Ordering from '../../../components/Ordering/Ordering'

const TableTemplete = ({list, loading, order, setOrder, setLoading, currentPage}) => {
  const [deleteName, setDeleteName] = useState()
  const [deleteUrl, setDeleteUrl] = useState()
  const [remove, setRemove] = useState()
  const [error, setError] = useState(null);
  const [template, setTemplate] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [dataTemplate,setDataTemplate] = useState({})
  const [showTemplate, setShowTemplate] = useState()
  const [showAlert, setShowAlert] = useState(false)

  if (loading) {
    return (
        <Row className='justify-content-md-center'>
            <Spinner animation='border' variant='primary' size='sm' />
        </Row>
    );    
  }
  const modalDelete = (name, url)=>{
    setDeleteName(name)
    setDeleteUrl(url) 
    setRemove(true)

}
const handleDelete = () => {
    deleteTemplate(deleteUrl).then(() => {
        window.location.href = '/templates';
      })
      .catch((error) => {
        setShowAlert(true)
        setError(error);
      })
     .finally(()=>{
        setRemove(false)
      })
}
  const showModalTemplate = (template) => {
    setTemplate(template)
    setModalShow(true)
  
  }

  const modalChangeState = (url, name, active) =>{
      
    setDataTemplate({url:url, name:name, state: active})
    setShowTemplate(true)
}
  const changeState=()=>{
        
    isActive(dataTemplate.url, +!dataTemplate.state)
    .then(() => {
        window.location.href = '/templates';
    })
    .catch((error) => {
        setShowAlert(true)
        setError(error);           
      })
    .finally(()=>{ 
        setShowTemplate(false)
    })
    }

    const resetShowAlert = () => {
        setShowAlert(false);
    }

    const callbackTaxonomy = (url ,setPriority) => {
        getTaxonomy(url)
        .then((response) => {
         
            setPriority(response.data)
        })
        .catch();
    }
    const callbackFeed = (url ,setPriority) => {
        getFeed(url)
        .then((response) => {
         
            setPriority(response.data)
        })
        .catch();
    }


  return (
    <React.Fragment>
        <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>  
    
               <ul className="list-group my-4"> 
                    <Table responsive hover className="text-center">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fuentes de información</th>
                                <th>Taxonomia </th>
                                <th>Recurso afectado</th>
                                <th>Estado</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((template, index) => {
                                const parts = template.url.split("/");
                                let itemNumber = parts[parts.length - 2];
                            return (
                                        <tr>
                                            <th >{ 1+index+10*(currentPage-1) }</th>
                                            <td><CallBackendByName url={template.event_feed} callback={callbackFeed} useBadge={false}/></td>
                                            <td><CallBackendByName url={template.event_taxonomy} callback={callbackTaxonomy} useBadge={false}/> </td>
                                            <td>{template.address_value} </td>
                                            <td>
                                            <ActiveButton active={+template.active} onClick={() => modalChangeState(template.url, template.cidr, template.active)} />
                                            </td>
                                            <td>
                                            <CrudButton  type='read' onClick={() => showModalTemplate(template) }/>
                                            <Link to={{pathname:"/templates/edit", state: template}} >
                                                <CrudButton  type='edit' />
                                            </Link>
                                            <CrudButton  type='delete' onClick={()=>modalDelete(template.cidr, template.url)} />
                                            </td>
                                        </tr>
                                    )
                                })}

<ModalConfirm type='delete' component='Estado' name={deleteName} showModal={remove} onHide={() => setRemove(false)} ifConfirm={() => handleDelete(deleteUrl)}/>    
<ModalConfirm type='editState' component='Estado' name={dataTemplate.cidr} state={dataTemplate.state} showModal={showTemplate} onHide={() => setShowTemplate(false)} ifConfirm={() => changeState()}/>
<Modal size='lg' show={modalShow} onHide={() => setModalShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>            
            <Modal.Body>
                <Row>    
                    <Col>                 
                        <Card>
                            <Card.Header> 
                                <Row>
                                    <Col>
                                        <Card.Title as="h5">Plantilla</Card.Title>
                                        <span className="d-block m-t-5">Detalle de la Plantilla</span>
                                    </Col>
                                    <Col sm={12} lg={4}>                       
                                        <Link to={{pathname:"/templates/edit", state: template}} >
                                            <CrudButton  type='edit' />
                                        </Link>
                                        <CloseButton aria-label='Cerrar' onClick={() => setModalShow(false)} />
                                    </Col>
                                </Row>         
                            </Card.Header>
                            <Card.Body>
                                <Table responsive >
                                    <tr>
                                        <td>Cidr</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={template.cidr} />
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Dominio</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={template.domain} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ciclo de vida</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={template.case_lifecycle} />
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>activo</td>
                                        <td>
                                        <Button 
                                            className="btn-icon btn-rounded" 
                                            variant={template.active ? 'outline-success' : 'outline-danger'} 
                                            title={template.active ? 'Activo' : 'Inactivo'}>
                                                <i className={template.active ? 'feather icon-check-circle' : 'feather icon-alert-triangle'}/>
                                        </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Creación</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={template.created ? template.created.slice(0,10)+" "+template.created.slice(11,19) : ""} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Actualización</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={template.modified ? template.modified.slice(0,10)+" "+ template.modified.slice(11,19): ""} />
                                        </td>
                                    </tr>
                                    
                                    
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col> 
                </Row>
            </Modal.Body>            
        </Modal>

                        

                        </tbody>
                    </Table>
                </ul> 

    </React.Fragment>
  )
}

export default TableTemplete