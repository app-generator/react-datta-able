import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination'
import TableUsers from './components/TableUsers'
import Navigation from '../../components/Navigation/Navigation'
import Search from '../../components/Search/Search'
import CrudButton from '../../components/Button/CrudButton';
import { getUsers} from "../../api/services/users";
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import Alert from '../../components/Alert/Alert';

function ListUser() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const [pages, setPages] = useState()
  const [cantPages, setcantPages] = useState([])
  const [error,setError]= useState()
  const [stateAlert, setStateAlert] = useState(null)
  const [alert, setAlert] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [countItems, setCountItems] = useState(0);
  const [showAlert, setShowAlert] = useState(false)

  function updatePage(chosenPage){
    setCurrentPage(chosenPage);
  }

  const resetShowAlert = () => {
    setShowAlert(false);
  }
  useEffect(() => {
      getUsers('?page='+currentPage).then((response) => {
        //es escencial mantener este orden ya que si no proboca bugs en el paginado
        setUsers(response.data.results)
        setCountItems(response.data.count)
         
    })
      .catch((error)=>{
        setError(error)
      })
      .finally(() => {
          setShowAlert(true)
          setLoading(false)
      })
 
  }, [countItems, currentPage])
  if (error) {
    return <p>Ups! Se produjo un error al buscar los usuarios</p>
}


  
  const action = () => {
    console.log("llamada backend")
  }

  
  return (
    <div >
      <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>
      <Row>
        <Navigation actualPosition="Usuarios"/>
      </Row>   
      <Card>
        <Card.Header>
          <Row>
              <Col sm={12} lg={9}>
                <Search type="usuario" action={action} />
              </Col>
              <Col sm={12} lg={3}>
              <Link to={{pathname:'/users/create'}} >
                  <CrudButton type='create' name='Usuario' />
              </Link>
          
              </Col> 
          </Row>                                 
          </Card.Header>
          <TableUsers users={users} loading={loading} /> 
          <Card.Footer >
                            <Row className="justify-content-md-center">
                                <Col md="auto"> 
                                    <AdvancedPagination countItems={countItems} updatePage={updatePage} ></AdvancedPagination>
                                </Col>
                            </Row>
                        </Card.Footer>
      </Card>
    </div>
    
  );
}

export default ListUser;