import React from 'react'
import {
    Button,Card, Table , Modal, Row,Col, Form, Badge,CloseButton, Spinner
  } from 'react-bootstrap';
  import CrudButton from '../../../components/Button/CrudButton';
  import {Link} from 'react-router-dom'
  import ActiveButton from '../../../components/Button/ActiveButton';

const TableStates = ({states}) => {
  return (
    <div>
        <thead>
            <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Atendido</th>
                <th>Resuelto</th>
                <th>Opciones</th>
            </tr>
        </thead>
        <tbody>
            {states.map((state, index) => {
            return (
                        <tr>
                            <th >{index + 1 }</th>
                            <td>{state.name}</td>
                            <td>{state.attended}</td>
                            <td>{state.solved}</td>
                            <td>
                            <ActiveButton active={state.active} onClick={() => ""} />
                            </td>
                          
                            <td>
                            <CrudButton  type='read' onClick={() => "" }/>
                            <Link to={{pathname:"./edit-user/", state: {state}}} >
                                <CrudButton  type='edit' />
                            </Link>
                            <CrudButton  type='delete' onClick={()=>""} />
                            </td>
                        </tr>
                    )
                })}
        </tbody>
    </div>
  )
}

export default TableStates