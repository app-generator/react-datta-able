import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown,
  Badge, Breadcrumb,  Table } from 'react-bootstrap';
import Pagination from './Pagination'

import Posts from './components/Posts'
import { getUsers} from "../../api/services/users";






function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [jumpPage, setjumpPage] = useState(false)
  const [pages, setPages] = useState()
  const [cantPages, setcantPages] = useState([])


  
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

    getUsers()
      .then((response) => {
          setPages(arrayWithPages(response.data.count,response.data.results.length))
          
      })
        

    const fetchPosts = async () => {
      setLoading(true)

      getUsers()
      .then((response) => {
          setPosts(response.data.results)
          console.log(response.data.results)
          
      })
    }

    fetchPosts()
  }, [])

  if (loading && posts.length === 0 ) {
    return <h2>Cargando...</h2>
  }
  
  CambioDepagina(cantPages[currentPage-1])
  const currentPosts = posts// lo que se muestra
  const howManyPages = pages//la cantidad de paginas del paginado 
  
  
  return (
    <div className="container mt-5">
      <Posts posts={currentPosts}/> 
      <Pagination pages = {howManyPages} setCurrentPage={setCurrentPage} setjumpPage={setjumpPage} />

     
    </div>
    
  );
}

export default App;