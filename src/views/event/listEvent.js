import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import {
     Card,Row
} from 'react-bootstrap';
import Pagination from '../../components/Pagination/Pagination'
import Alert from '../../components/Alert/Alert';

import Navigation from '../../components/navigation/navigation'
import Search from '../../components/search/search'
import CrudButton from '../../components/Button/CrudButton';
import { getPriorities} from "../../api/services/priorities";
import TablePriorities from './components/tableEvents';

const ListEvent = () => {
    const action = () => {
        console.log("llamada backend")
      }
  return (
     <div>
    <Navigation actualPosition="Eventos"/>
      <Card>
        <Card.Header>
          
          <Row>
            <Search type="evento" action={action} />
            <Link to={"/add-Priority"} >
                <CrudButton type='create' name='Evento' /> 
            </Link>
          </Row>                                 
        </Card.Header>
        <TablePriorities /> 

      </Card>            
    </div>
  )
}

export default ListEvent