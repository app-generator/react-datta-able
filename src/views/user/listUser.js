import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination'
import Alert from '../../components/Alert/Alert';
import TableUsers from './components/tableUsers'
import Navigation from '../../components/Navigation/Navigation'
import Search from '../../components/Search/Search'
import CrudButton from '../../components/Button/CrudButton';
import { getUsers} from "../../api/services/users";

function ListUser() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [jumpPage, setjumpPage] = useState(false)
  const [pages, setPages] = useState()
  const [cantPages, setcantPages] = useState([])
  const [error,setError]= useState()
  const [stateAlert, setStateAlert] = useState(null)
  const [alert, setAlert] = useState(null)

  const callbackBackend = (name, stateAlert) => {
    if(stateAlert) {
        getUsers()
        .then((response) => {
            setPosts(response.data.results)
        })
        .catch((error) => {
            setError(error)
        })
        .finally(() => {
            setLoading(false)
            setAlert({name:name, type:1})
            setTimeout(() => {
                setAlert(null)
                setStateAlert(null)
            }, 5000);
        })
    }
    else {
        setAlert({name:name, type:0})
    }
  }

  function CambioDepagina(url){
   
    if (jumpPage){
      setjumpPage(false)
      const fetchPosts = async () => {
        setLoading(true)
        getUsers(url).then((response) => {
          setPosts(response.data.results)    
      })
        setLoading(false)
      }
      fetchPosts()
    }
  }

  useEffect(() => {
    if(sessionStorage.getItem('Alerta')) {
      const storage = JSON.parse(sessionStorage.getItem('Alerta'));
      setAlert(storage)
          setTimeout(() => {
              setAlert(null)
              setStateAlert(null)
              sessionStorage.clear()
          }, 5000);
  }
    function arrayWithPages(numberOfItems,numberOfElementsOnAPage ) {

      const numberOfPages= Math.ceil(numberOfItems / numberOfElementsOnAPage)

      const complementUrl ="?page="

      const arrayLinks=[]
        
      for (var i = 1; i <= numberOfPages; i++) {
        arrayLinks.push(complementUrl+i)  
      }

      setcantPages(arrayLinks)
    
      return numberOfPages  
    }

    const fetchUsers = async () => {
      setLoading(true)

      getUsers()
      .then((response) => {
          setPosts(response.data.results)
          console.log(response.data.results)
          setPages(arrayWithPages(response.data.count,response.data.results.length))
          
      }).catch((error)=>{
        setError(error)
    }).finally(() => {
      setLoading(false)
  })
 
    }

    fetchUsers()
  }, [])
  if (error) {
    return <p>Ups! Se produjo un error al buscar los usuarios</p>
}

 
  CambioDepagina(cantPages[currentPage-1])
  const currentPosts = posts// lo que se muestra
  const howManyPages = pages//la cantidad de paginas del paginado 
  const name = "Usuarios"

  
  const action = () => {
    console.log("llamada backend")
  }

  
  return (
    <div >
      <Alert alert={alert} stateAlert={stateAlert} />
      <Row>
        <Navigation actualPosition={name}/>
      </Row>   
      <Card>
        <Card.Header>
          <Row>
              <Col sm={12} lg={9}>
                <Search type="usuario" action={action} />
              </Col>
              <Col sm={12} lg={3}>
              <Link to={{pathname:'/add-user'}} >
                  <CrudButton type='create' name='Usuario' />
              </Link>
          
              </Col> 
          </Row>                                 
          </Card.Header>
          <TableUsers users={currentPosts} callback ={callbackBackend} loading={loading} /> 
          <Pagination pages = {howManyPages} setCurrentPage={setCurrentPage} setjumpPage={setjumpPage} />
      </Card>
    </div>
    
  );
}

export default ListUser;