import React,{ useState} from 'react'
import {
    Button,Card, Table , Modal, Row,Col, Form, Badge,CloseButton, Spinner
  } from 'react-bootstrap';
import CrudButton from '../../../components/Button/CrudButton';
import {Link} from 'react-router-dom'
import ActiveButton from '../../../components/Button/ActiveButton';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import { deleteTemplate, isActive } from "../../../api/services/templates";


const TableTemplete = (props) => {
  const [deleteName, setDeleteName] = useState()
  const [deleteUrl, setDeleteUrl] = useState()
  const [remove, setRemove] = useState()
  const [error, setError] = useState(null);
  const [template, setTemplate] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [dataTemplate,setDataTemplate] = useState({})
  const [showTemplate, setShowTemplate] = useState()

  if (props.loading) {
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
    deleteTemplate(deleteUrl).then((response) => {
        console.log(response)
        
    })
    .catch((error) => {
        console.log(error)
        setError(error)
    })
    .finally(() => {
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
    .then((response) => {
        console.log(response)
        
    })
    .catch((error) => {
            console.log(error)
            setError(error)
        })
        .finally(() => {
            setShowTemplate(false)
        })
    }


  return (
    <React.Fragment>
        <Card>
            <Card.Body>
                <ul className="list-group my-4">
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Cidr</th>
                                <th>Estado</th>
                                <th>Dominio</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.list.map((template, index) => {
                            return (
                                        <tr>
                                            <th >{index + 1 }</th>
                                            <td>{template.cidr}</td>
                                            <td>
                                            <ActiveButton active={+template.active} onClick={() => modalChangeState(template.url, template.cidr, template.active)} />
                                            </td>
                                            <td>{template.domain} </td>
                                            <td>
                                            <CrudButton  type='read' onClick={() => "" }/>
                                            <Link to={{pathname:"./edit-template", state: {template}}} >
                                                <CrudButton  type='edit' />
                                            </Link>
                                            <CrudButton  type='delete' onClick={()=>modalDelete(template.cidr, template.url)} />
                                            </td>
                                        </tr>
                                    )
                                })}

<ModalConfirm type='delete' component='Estado' name={deleteName} showModal={remove} onHide={() => setRemove(false)} ifConfirm={() => handleDelete(deleteUrl)}/>    
<ModalConfirm type='editState' component='Estado' name={dataTemplate.cidr} state={dataTemplate.state} showModal={showTemplate} onHide={() => setShowTemplate(false)} ifConfirm={() => changeState()}/>

                        

                        </tbody>
                    </Table>
                </ul>
            </Card.Body>
        </Card>
    </React.Fragment>
  )
}

export default TableTemplete