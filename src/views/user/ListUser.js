import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Collapse, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import TableUsers from './components/TableUsers'
import Navigation from '../../components/Navigation/Navigation'
import Search from '../../components/Search/Search'
import CrudButton from '../../components/Button/CrudButton';
import { getUsers, getAllUsers} from "../../api/services/users";
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import Alert from '../../components/Alert/Alert';
import FilterSelect from '../../components/Filter/FilterSelect';
import ButtonFilter from '../../components/Button/ButtonFilter';

function ListUser() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,setError]= useState()

  const [currentPage, setCurrentPage] = useState(1)
  const [updatePagination, setUpdatePagination] = useState(false)
  const [disabledPagination, setDisabledPagination] = useState(true)

  const [countItems, setCountItems] = useState(0);

  const [showAlert, setShowAlert] = useState(false)
  const [open, setOpen] = useState(false);
  const [names, setNames] = useState([]);
  const [emails, setEmails] = useState([]);
  const [usernames, setUsernames] = useState([]);

  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [usernameFilter, setUsernameFilter] = useState("");
  const [wordToSearch, setWordToSearch]= useState('')
  const [order, setOrder] = useState("");

  function updatePage(chosenPage){
    setCurrentPage(chosenPage);
  }

  const resetShowAlert = () => {
    setShowAlert(false);
  }
  useEffect(() => {
      getUsers(currentPage, nameFilter+usernameFilter+emailFilter+wordToSearch, order).then((response) => {
        //es escencial mantener este orden ya que si no proboca bugs en el paginado
        setUsers(response.data.results)
        setCountItems(response.data.count)
        if(currentPage === 1){
          setUpdatePagination(true)  
        }
        setDisabledPagination(false)
         
    })
      .catch((error)=>{
        setError(error)
      })
      .finally(() => {
          setShowAlert(true)
          setLoading(false)
      })

      getAllUsers().then((response) => {
        let listUsersName = []
        let listUsersEmail = []
        let listUsersUsername = []
        response.map((user) => {
          listUsersEmail.push({value:user.email, label:user.email})
          listUsersName.push({value:user.first_name, label:user.first_name})
          listUsersUsername.push({value:user.username, label:user.username})
        })
        setNames(listUsersName)
        setEmails(listUsersEmail)
        setUsernames(listUsersUsername)
      })
 
  }, [countItems, currentPage, nameFilter, usernameFilter, emailFilter, wordToSearch, order])
  
  if (error) {
    return <p>Ups! Se produjo un error al buscar los usuarios</p>
  }


  const action = (search) => {
    setWordToSearch("search="+search+'&')
    if (wordToSearch !== "search="+search+'&'){ // este if esta porque si no hay cambios en el WordToSearch 
                                                //haciendo que no se vuelva a ejecutar el useEffect y qeu al setearce setloading en true quede en un bucle infinito
      setLoading(true)
    }
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
          <Col sm={1} lg={1}>
            <ButtonFilter open={open} setOpen={setOpen} />
          </Col>
              <Col sm={12} lg={8}>
                <Search type="por nombre, usuario o email" action={action} />
              </Col>
              <Col sm={12} lg={3}>
              <Link to={{pathname:'/users/create'}} >
                  <CrudButton type='create' name='Usuario' />
              </Link>
          
              </Col> 
          </Row>                                 
          <Row>
      </Row>
      <Collapse in={open}>
        <div id="example-collapse-text">
        <br /> 
          <Row>
            <Col sm={12} lg={4}>
              <FilterSelect options={usernames} partOfTheUrl="username__icontains" setFilter={setUsernameFilter} currentFilter={usernameFilter} setLoading={setLoading} placeholder="Filtrar por nombre de usuario" />
            </Col>
            <Col sm={12} lg={4}>
              <FilterSelect options={names} partOfTheUrl="first_name__icontains" setFilter={setNameFilter} currentFilter={nameFilter} setLoading={setLoading} placeholder="Filtrar por nombre" />
            </Col>
            <Col sm={12} lg={4}>
              <FilterSelect options={emails} partOfTheUrl="email__icontains" setFilter={setEmailFilter} currentFilter={emailFilter} setLoading={setLoading} placeholder="Filtrar por email"/>
            </Col>
            
          </Row>
        </div>
      </Collapse>
          </Card.Header>
          <Card.Body>
            <TableUsers users={users} loading={loading} order={order} setOrder={setOrder} setLoading={setLoading} currentPage={currentPage}/> 
          </Card.Body>
          <Card.Footer >
              <Row className="justify-content-md-center">
                  <Col md="auto"> 
                    <AdvancedPagination countItems={countItems} updatePage={updatePage} updatePagination={updatePagination} setUpdatePagination={setUpdatePagination} setLoading={setLoading} setDisabledPagination={setDisabledPagination} disabledPagination={disabledPagination}/>
                  </Col>
              </Row>
          </Card.Footer>
      </Card>
    </div>
    
  );
}

export default ListUser;