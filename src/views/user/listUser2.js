import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown,
  Badge, Breadcrumb,  Table } from 'react-bootstrap';
import Pagination from './Pagination'
import axios from 'axios'
import Posts from './components/Posts'


var cantPages
var arrayLinks = []
function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setpostsPerPage] = useState(20)
  const [jumpPage, setjumpPage] = useState(false)
  const [Pages, setPages] = useState(-1)
  //const [cantPages, setcantPages] = useState()

  const urlBase = 'https://www.cultura.gob.ar/api/v2.0/organismos/'

  
  function CambioDepagina(url){
   

    if (jumpPage){
      setjumpPage(false)
      //console.log(jumpPage)

      const fetchPosts = async () => {
        setLoading(true)
        const res = await axios.get(url)
        setPosts(res.data.results)
        console.log(res.data.results)
        setLoading(false)
        
      }
      fetchPosts()
  
    }
  }
  function arrayWithPages(numberOfItems,numberOfElementsOnAPage ) {

    const numberOfPages= Math.ceil(numberOfItems / numberOfElementsOnAPage)
    console.log(numberOfPages)

    const number = 20
    //setpostsPerPage(number)//hay un bug ya que se va mostrar 8 paginas aunque debe ser el doble
    var number2 = 0
    const complementUrl = "?limit="
    const complementUrl2 = "&offset="

    arrayLinks=[urlBase+complementUrl+number]
    

    for (var i = 1; i < numberOfPages; i++) {
      number2 += number 
      arrayLinks.push(urlBase+complementUrl+number+complementUrl2+number2)
      
    }
    console.log(arrayLinks)
    console.log(numberOfPages)
    cantPages=numberOfPages
    return numberOfPages
    
  }

  useEffect(() => {
    const fetchPosts = async (urlBase) => {
      setLoading(true)
      const res = await axios.get(urlBase)
      
      setPosts(res.data.results)
      //cantPages = Math.ceil(res.data.count/res.data.results.length)
      arrayWithPages(res.data.count,res.data.results.length)
      console.log("---------------aca---------------------------------")
      
      //console.log(cantPages)
      console.log(Pages)
      //console.log(arrayLinks)
      setLoading(false)
    }

    fetchPosts(urlBase)
  }, [])

  if (loading && posts.length === 0 ) {
    return <h2>Loading...</h2>
  }
  
  CambioDepagina(arrayLinks[currentPage-1])
  const currentPosts = posts// lo que se muestra
  const howManyPages = cantPages//la cantidad de paginas del paginado 
  
  
  return (
    <div className="container mt-5">
      <Posts posts={currentPosts}/> 
      <Pagination pages = {howManyPages} setCurrentPage={setCurrentPage} setjumpPage={setjumpPage} />

     
    </div>
    
  );
}

export default App;