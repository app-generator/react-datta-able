import React,{ useState} from 'react'
import {
    Button,Card, Table , Modal, Row, Spinner
  } from 'react-bootstrap';
  import {Link} from 'react-router-dom'
  import { deletePriority } from "../../../api/services/priorities";
  import CrudButton from '../../../components/Button/CrudButton';

const TablePriorities = ({Priorities, callback, loading}) => {
    const [show, setShow] = useState(false);
    const [deleteName, setDeleteName] = useState("");
    const [deleteUrl, setDeleteUrl] = useState("");
    const [error, setError] = useState(null);

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    }
    const handleClose = () => setShow(false);
    const handleShow = (name, url) => {

        setDeleteName(name)
        setDeleteUrl(url) 
        setShow(true)
       
      }

    const handleDelete = () => {
        deletePriority(deleteUrl).then((response) => {
            console.log(response)
            callback(`El usuario ${deleteName} ha sido eliminado`, true)
        })
        .catch((error) => {
            console.log(error)
            setError(error)
            callback(`El usuario ${deleteName} NO ha sido eliminado`, false)
        })
        .finally(() => {
            setShow(false)
        })
      }
  return (
   <div>
      <Card>
        <Card.Body>
            <ul className="list-group my-4">
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Fecha limite de respuesta</th>
                
                            <th>Fecha limite de resolucion </th>
                    
                            <th>Creado</th>
                            <th>Actualizado</th>
                            <th>Opciones</th>
                        </tr>
                   </thead>
                    <tbody>
                       {Priorities.map((priority, index) => {
                        return (
                            <tr>
                                <th >{index + 1 }</th>
                                <td>{priority.name}</td>
                                <td>{priority.attend_deadline}</td>
                                <td>{priority.solve_deadline}</td>
                                <td>{priority.created.slice(0,10)}</td>
                                <td>{priority.modified.slice(0,10)}</td>
                                <td>
                                
                                <Link to={{pathname:"./edit-Priority", state: {priority}}} >
                                    <CrudButton  type='edit' />
                                </Link>
                                    <CrudButton  type='delete' onClick={()=>handleShow(priority.name, priority.url)} />
                                </td>
                                
                                    </tr>
                              )
                            })}
                             <Modal show={show} onHide={handleClose}>
                                              <Modal.Header closeButton>
                                                <Modal.Title>Eliminar usuario</Modal.Title>
                                              </Modal.Header>
                                              <Modal.Body>¿Estas seguro que quiere eliminar el usuario {deleteName} </Modal.Body>
                                              <Modal.Footer>
                                                <Button variant="secondary" onClick={()=>handleClose()}>
                                                  Cerrar
                                                </Button>
                                                <Button variant="danger" onClick={()=>handleDelete()}>
                                                  Eliminar
                                                </Button>
                                              </Modal.Footer>
                                            </Modal>
                            
                            </tbody>
                        </Table>
                      </ul>
                </Card.Body>
            
                  
     </Card>
  </div>
                        )
}

export default TablePriorities