import React,{ useState} from 'react'
import {
  Button,Card, Table , Modal, Row,Col, Form, CloseButton, Spinner
} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { deletePriority } from "../../../api/services/priorities";
import CrudButton from '../../../components/Button/CrudButton';
import ModalConfirm from '../../../components/Modal/ModalConfirm';


const TablePriorities = ({events, taxonomy, loading, loadingTaxonomy}) => {
    console.log(taxonomy)
    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
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
                            <th>Fecha</th>
                            <th>TLP</th>
                            <th>Taxonimia </th>
                            <th>Fuente de Informacion</th>
                            <th>Opciones</th>
                        </tr>
                   </thead>
                    <tbody>
                    {events.map((event, index) => {
                        return (
                            <tr>
                                <th >{index + 1 }</th>
                                <td>{event.date}</td>
                                <td>{event.tlp}</td>
                                {/*loadingTaxonomy ? <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
                        </Row>: <td>{taxonomy.get(event.taxonomy)}</td>*/}
                        <td>{taxonomy.get(event.taxonomy)}</td>
                                <td>{event.feed}</td>
                                
                                <td>
                                <CrudButton  type='read' onClick="" />
                                
                                <Link to={{pathname:"./edit-Priority", state: {event}}} >
                                    <CrudButton  type='edit' />
                                </Link>
                                    <CrudButton  type='delete' onClick="" />
                                </td>
                                
                              </tr>
                              )
                        })}

                    </tbody>
                </Table>
                      </ul>
                </Card.Body>  
     </Card>
    </div>
  )
}

export default TablePriorities