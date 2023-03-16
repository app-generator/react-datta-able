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
import { getEvents} from "../../api/services/events";
import { getTaxonomy} from "../../api/services/taxonomy";
import TablePriorities from './components/tableEvents';

const ListEvent = () => {
  const [events, setEvents] = useState([])
  const [taxonomy, setTaxonomy] = useState(new Map())
  const [alert, setAlert] = useState(null)
  const [stateAlert, setStateAlert] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cantPages, setcantPages] = useState([])
  const [pages, setPages] = useState()
  const [error,setError]= useState()

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
    const getElementsForList=(listEvent)=>{
 
      var taxonomia= new Map()
      listEvent.map((event, index) => {
        const fetchElements = async () => {
          getTaxonomy(event.taxonomy).then((response) => {
            taxonomia.set(response.data.url, response.data.name)
            
            
          })   
        }
        setTaxonomy(taxonomia)
        
        fetchElements() 
      })

    }

    const fetchEvents = async () => {
      setLoading(true)
      getEvents().then((response) => {
          setEvents(response.data.results)
          getElementsForList(response.data.results)
          console.log(response.data.results)
          setPages(arrayWithPages(response.data.count,response.data.results.length)) 
      }).catch((error)=>{
         setError(error)
      }).finally(() => {
         setLoading(false)
      })

    }

    fetchEvents()
  }, [])
  console.log(taxonomy)
  
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
            <Link to={"./add-event"} >
                <CrudButton type='create' name='Evento' /> 
            </Link>
          </Row>                                 
        </Card.Header>
        <TablePriorities events={events} taxonomy={taxonomy} loading={loading}/> 

      </Card>            
    </div>
  )
}

export default ListEvent