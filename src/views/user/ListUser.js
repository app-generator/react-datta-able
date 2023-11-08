import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Collapse, Button, Form } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import TableUsers from './components/TableUsers'
import Navigation from '../../components/Navigation/Navigation'
import Search from '../../components/Search/Search'
import CrudButton from '../../components/Button/CrudButton';
import { getUsers, getAllUsers} from "../../api/services/users";
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import Alert from '../../components/Alert/Alert';
import Select from 'react-select';

function ListUser() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,setError]= useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [countItems, setCountItems] = useState(0);
  const [showAlert, setShowAlert] = useState(false)
  const [open, setOpen] = useState(false);
  const [names, setNames] = useState([]);
  const [emails, setEmails] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [usernameFilter, setUsernameFilter] = useState("");
  const [wordToSearch, setWordToSearch]= useState('')

  function updatePage(chosenPage){
    setCurrentPage(chosenPage);
  }

  const resetShowAlert = () => {
    setShowAlert(false);
  }
  useEffect(() => {
      getUsers('?'+nameFilter+usernameFilter+emailFilter+wordToSearch+'page='+currentPage).then((response) => {
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
 
  }, [countItems, currentPage, nameFilter, usernameFilter, emailFilter, wordToSearch])

  const getName = (name) => {
    if(name !== null){
      setName(name)
      setNameFilter("first_name__icontains="+name.value+'&')
      if (nameFilter !== "first_name__icontains="+name.value+'&') { // este if esta porque si no hay cambios en el WordToSearch 
        //haciendo que no se vuelva a ejecutar el useEffect y qeu al setearce setloading en true quede en un bucle infinito
        setLoading(true)
      }
    }else{
      setName("")
      setNameFilter("first_name__icontains="+'&')
      if (nameFilter !== "first_name__icontains="+'&') { // este if esta porque si no hay cambios en el WordToSearch 
        //haciendo que no se vuelva a ejecutar el useEffect y qeu al setearce setloading en true quede en un bucle infinito
        setLoading(true)
      }
    }
  }

  const getUsername = (username) => {
    if(username !== null){
      setUsername(username)
      setUsernameFilter("username__icontains="+username.value+'&')
      if (usernameFilter !== "username__icontains="+username.value+'&') { // este if esta porque si no hay cambios en el WordToSearch 
        //haciendo que no se vuelva a ejecutar el useEffect y qeu al setearce setloading en true quede en un bucle infinito
        setLoading(true)
      }
    }else{
      setUsername("")
      setUsernameFilter("username__icontains="+'&')
      if (usernameFilter !== "username__icontains="+'&') { // este if esta porque si no hay cambios en el WordToSearch 
        //haciendo que no se vuelva a ejecutar el useEffect y qeu al setearce setloading en true quede en un bucle infinito
        setLoading(true)
      }
    }
  }

  const getEmail = (email) => {
    if (email !== null){
      setEmail(email)
      setEmailFilter("email__icontains="+email.value+'&')
      if (emailFilter !== "email__icontains="+email.value+'&') { // este if esta porque si no hay cambios en el WordToSearch 
        //haciendo que no se vuelva a ejecutar el useEffect y qeu al setearce setloading en true quede en un bucle infinito
        setLoading(true)
      }
    }else{
      setEmail("")
      setEmailFilter("email__icontains="+'&')
      if (emailFilter !== "email__icontains="+'&') { // este if esta porque si no hay cambios en el WordToSearch 
        //haciendo que no se vuelva a ejecutar el useEffect y qeu al setearce setloading en true quede en un bucle infinito
        setLoading(true)
      }
    }

    
  }
  
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
          <Button variant="primary" className='text-capitalize'size="sm"
            onClick={() => setOpen(!open)}
            aria-expanded={open}>
              <span className="material-icons">
              tune
              </span>
          </Button>
        </Col>
              <Col sm={12} lg={8}>
                <Search type="usuario" action={action} />
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
              <Form.Group>
                  <Select options={usernames} isClearable placeholder="Filtrar por nombre de usuario" value={username} onChange={(e) => getUsername(e)} />
              </Form.Group>
            </Col>
            <Col sm={12} lg={4}>
              <Form.Group>
                  <Select options={names} isClearable placeholder="Filtrar por nombre" value={name} onChange={(e) => getName(e)} />
              </Form.Group>
            </Col>
            <Col sm={12} lg={4}>
              <Form.Group>
                  <Select options={emails} isClearable placeholder="Filtrar por email" value={email} onChange={(e) => getEmail(e)} />
              </Form.Group>
            </Col>
            
          </Row>
        </div>
      </Collapse>
          </Card.Header>
          <Card.Body>
            <TableUsers users={users} loading={loading} /> 
          </Card.Body>
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