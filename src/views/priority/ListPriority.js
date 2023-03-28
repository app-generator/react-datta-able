import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap';
import Pagination from '../../components/Pagination/Pagination'
import Alert from '../../components/Alert/Alert';

import Navigation from '../../components/Navigation/Navigation'
import Search from '../../components/Search/Search'
import CrudButton from '../../components/Button/CrudButton';
import { getPriorities} from "../../api/services/priorities";
import TablePriorities from './components/tablePriorities';

const ListPriorities = () => {
  const [priorities, setPriorities] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [jumpPage, setjumpPage] = useState(false)
  const [pages, setPages] = useState()
  const [cantPages, setcantPages] = useState([])
  const [error,setError]= useState()
  const [stateAlert, setStateAlert] = useState(null)
  const [alert, setAlert] = useState(null)

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
    const arrayWithPages = (numberOfItems,numberOfElementsOnAPage) => {
        const numberOfPages= Math.ceil(numberOfItems / numberOfElementsOnAPage)
        const complementUrl ="?page="
        const arrayLinks=[]

        for (var i = 1; i <= numberOfPages; i++) {    
          arrayLinks.push(complementUrl+i)
        }

        setcantPages(arrayLinks)
        return numberOfPages
    }

    const fetchPriorities = async () => {
      setLoading(true)
      getPriorities().then((response) => {
          setPriorities(response.data.results)
          setPages(arrayWithPages(response.data.count,response.data.results.length)) 
      }).catch((error)=>{
         setError(error)
      }).finally(() => {
         setLoading(false)
      })
    }

    fetchPriorities()
  }, [])
  function CambioDepagina(url){
   

    if (jumpPage){
      setjumpPage(false)

      const fetchPosts = async () => {
        setLoading(true)
        getPriorities(url).then((response) => {
          setPriorities(response.data.results)
          
      })
        setLoading(false)
      }
      fetchPosts()
    }
  }

  const callbackBackend = (name, stateAlert) => {
    if(stateAlert) {
        getPriorities()
        .then((response) => {
            setPriorities(response.data.results)
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
  const action = () => {
    console.log("llamada backend")
  }
  CambioDepagina(cantPages[currentPage-1])

  return (
    <div>
    
    <Alert alert={alert} stateAlert={stateAlert} />
    <Row>
      <Navigation actualPosition="Prioridades"/>
    </Row>
    
      <Card>
        <Card.Header>
          
          <Row>
            <Col sm={12} lg={9}>
              <Search type="Prioridad" action={action} />
            </Col>
            <Col sm={12} lg={3}>
              <Link to={"/add-Priority"} >
                <CrudButton type='create' name='Prioridad' /> 
              </Link>
            </Col>
          </Row>                                 
        </Card.Header>
        <TablePriorities Priorities={priorities} callback ={callbackBackend} loading={loading} /> 
        <Pagination pages = {pages} setCurrentPage={setCurrentPage} setjumpPage={setjumpPage} />
      </Card>            
    </div>
  );
}
export default ListPriorities