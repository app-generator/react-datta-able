import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown,
  Badge, Breadcrumb,  Table } from 'react-bootstrap';
import Pagination from './Pagination'
import Alert from '../../components/Alert/Alert';
import Posts from './components/Posts'

import { getUsers} from "../../api/services/users";






function App() {
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
      console.log(url)

      const fetchPosts = async () => {
        console.log(url)
        setLoading(true)
        getUsers(url).then((response) => {
          setPosts(response.data.results)
          console.log(response.data.results)
          
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
      console.log(numberOfPages)
  
      
      //setpostsPerPage(number)//hay un bug ya que se va mostrar 8 paginas aunque debe ser el doble
      
      const complementUrl ="?page="
    
  
      const arrayLinks=[]
      
  
      for (var i = 1; i <= numberOfPages; i++) {
      
        arrayLinks.push(complementUrl+i)
        
      }
      console.log(arrayLinks)
      setcantPages(arrayLinks)
    
      
      return numberOfPages
      
    }

    
        

    const fetchPosts = async () => {
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

    fetchPosts()
  }, [])
  if (error) {
    console.log(error);
    return <p>Ups! Se produjo un error al buscar los usuarios</p>
}

 
  CambioDepagina(cantPages[currentPage-1])
  const currentPosts = posts// lo que se muestra
  const howManyPages = pages//la cantidad de paginas del paginado 
  console.log("cant "+howManyPages)
  
  
  return (
    <div className="container mt-5">
      <Alert alert={alert} stateAlert={stateAlert} />
      <Card>
      <Card.Header>
      <Row>
      <Breadcrumb>
                <Breadcrumb.Item href="./app/dashboard/default">
                    <i className="feather icon-home" />
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <b>Usuarios</b>
                </Breadcrumb.Item>
            </Breadcrumb>    
        </Row>
                            <Row>
                                <Col sm={12} lg={9}>
                                <div id="main-search" className='open'>
                                     <div className="input-group">
                                        <input type="text" id="m-search" className="form-control" placeholder="Buscar usuario . . ." />
                                            <span className="search-btn btn btn-primary" onClick="">
                                                    <i className="feather icon-search " />
                                            </span> 
                                    </div>
                                </div>

                           
                                </Col> 
                                <Col sm={12} lg={3}>
                                <Button className="text-capitalize" variant='outline-primary' title='Agregar Usuario' href="/add-user">
                                    <i className='fa fa-plus' />
                                        Agregar usuario
                                </Button>
                            
                                </Col> 
                            </Row>                                 
                        </Card.Header>
                        <Posts posts={currentPosts} callback ={callbackBackend} loading={loading} /> 
                        <Pagination pages = {howManyPages} setCurrentPage={setCurrentPage} setjumpPage={setjumpPage} />
      </Card>
    </div>
    
  );
}

export default App;