import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import {
     Card,Row,Col, Button, Badge
} from 'react-bootstrap';
import Pagination from '../../components/Pagination/Pagination'
import Alert from '../../components/Alert/Alert';

import Navigation from '../../components/Navigation/Navigation'
import Search from '../../components/Search/Search'
import CrudButton from '../../components/Button/CrudButton';
import { getEvents, mergeEvent} from "../../api/services/events";
import { getTaxonomy} from "../../api/services/taxonomies";
import TableEvents from './components/TableEvents';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import ModalConfirm from '../../components/Modal/ModalConfirm';

const ListEvent = () => {
  const [events, setEvents] = useState([])
  const [taxonomy, setTaxonomy] = useState(new Map())
  const [loadingTaxonomy, setLoadingTaxonomy] = useState(true)
  const [alert, setAlert] = useState(null)
  const [stateAlert, setStateAlert] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cantPages, setcantPages] = useState([])
  const [pages, setPages] = useState()
  const [error,setError]= useState()
  const [countItems, setCountItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const [ifModify, setIfModify] = useState(null) 

  //event merge Event
  //merge
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState([]);

  function updatePage(chosenPage){
    setCurrentPage(chosenPage);
}

  const callbackBackend = (name, stateAlert) => {
    if(stateAlert) {
      getEvents()
        .then((response) => {
            setEvents(response.data.results)
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

  useEffect(() => {

    

    const fetchEvents = async () => {
      setLoading(true)
      getEvents().then((response) => {
          setCountItems(response.data.count)
          setEvents(response.data.results)
          
          
      }).catch((error)=>{
         setError(error)
      }).finally(() => {
        setLoading(false)
      })

    }

    fetchEvents()
  }, [countItems, currentPage])

  const mergeConfirm = () => {
    //setId
    setShowModal(true);
  }
  const merge = () => {
    const parent = selectedEvent.shift();
    selectedEvent.forEach(child => {
        console.log(`MERGE --> parent: ${parent} \n          child:${child} `)
        mergeEvent(parent, child)
            .then(response => setIfModify(response))
            .catch(error => console.log(error))
            .finally(() => {
                setSelectedEvent([])
                setShowModal(false)
            })
    });
}
 
  
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
          <Row>
          <Col> 
              <Button 
                  disabled={selectedEvent.length > 1 ? false : true}
                  size="sm"
                  className='text-capitalize'
                  variant='light'
                  title='Mergear'
                  onClick={() => mergeConfirm()}>
                  <i variant='danger' className="fa fa-code-branch"/>
                      Merge&nbsp;
                  <Badge  
                      className="badge mr-1" >
                      {selectedEvent.length} 
                  </Badge>
              </Button>                                
          </Col> 
        </Row>                                 
        </Card.Header>
        <TableEvents events={events} taxonomy={taxonomy} loading={loading} loadingTaxonomy={loadingTaxonomy} callback={callbackBackend} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent}/> 
        <Card.Footer >
                            <Row className="justify-content-md-center">
                                <Col md="auto"> 
                                    <AdvancedPagination countItems={countItems} updatePage={updatePage} ></AdvancedPagination>
                                </Col>
                            </Row>
                        </Card.Footer>
                        <ModalConfirm type='merge' component='casos' name={selectedEvent} showModal={showModal} onHide={() => setShowModal(false)} ifConfirm={() => merge()}/>
      </Card>            
    </div>
  )
}
export default ListEvent