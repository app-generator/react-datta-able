import React from 'react'
import {
    Button,Card, Table , Modal, Row,Col, Form, CloseButton, Spinner
  } from 'react-bootstrap';
  import {Link} from 'react-router-dom'
  import CrudButton from '../../../../components/Button/CrudButton';

const TableArtifact = ({loading, artefacts}) => {
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
                            <th>Tipo</th>
                            <th>valor</th>
                            <th>Relacionado </th>
                        </tr>
                   </thead>
                    <tbody>
                    {artefacts.map((artefact, index) => {
                        return (
                            <tr>
                                <th >{index + 1 }</th>
                                <td>{artefact.tipe}</td>
                                <td>{artefact.value}</td>
                                <td>{artefact.related}</td>
                                
                                <td>
                                <CrudButton  type='read' onClick="" />
                                
                                <Link to="" >
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

export default TableArtifact