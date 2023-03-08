import React,{ useState} from 'react'
import {
  Button,Card, Table , Modal, Row,Col, Form, CloseButton, Spinner
} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { deletePriority } from "../../../api/services/priorities";
import CrudButton from '../../../components/Button/CrudButton';
import ModalConfirm from '../../../components/Modal/ModalConfirm';

const TablePriorities = () => {
   
    
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
                            <th>Dominio</th>
                            <th>ruta del archivo de evidencia </th>
                            <th>Opciones</th>
                        </tr>
                   </thead>
                    <tbody>
                            </tbody>
                        </Table>
                      </ul>
                </Card.Body>  
     </Card>
    </div>
  )
}

export default TablePriorities