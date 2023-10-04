import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import {
     Card,Row,Col, Button, Badge
} from 'react-bootstrap';
import Navigation from '../../components/Navigation/Navigation'
import Search from '../../components/Search/Search'
import CrudButton from '../../components/Button/CrudButton';
import { getEvents, mergeEvent} from "../../api/services/events";
import TableEvents from './components/TableEvents';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import ModalConfirm from '../../components/Modal/ModalConfirm';
import Alert from '../../components/Alert/Alert';


const ListEvent = () => {
  const [events, setEvents] = useState([])
  const [taxonomy, setTaxonomy] = useState(new Map())
  const [loadingTaxonomy, setLoadingTaxonomy] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error,setError]= useState()
  const [countItems, setCountItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const [ifModify, setIfModify] = useState(null) 
  const [showAlert, setShowAlert] = useState(false)
  //event merge Event
  //merge
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function updatePage(chosenPage){
    setCurrentPage(chosenPage);
  }

  const resetShowAlert = () => {
    setShowAlert(false);
  }

  useEffect(() => {

    

    const fetchEvents = async () => {
      setLoading(true)
      getEvents('?page='+currentPage).then((response) => {
        
          setEvents(response.data.results)
          setCountItems(response.data.count)
          
      }).catch((error)=>{
          setShowAlert(true) //hace falta?
          setError(error)
      }).finally(() => {
        setLoading(false)
        setShowAlert(true)
      })

    }

    fetchEvents()
  }, [countItems, currentPage,ifModify])

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
       <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>
       <Row>
          <Navigation actualPosition="Eventos"/>
      </Row>
      <Card>
        <Card.Header>
          
          <Row>
            <Col>
              <Search type="evento" action={action} />
            </Col>
            <Col sm={6} lg={3}>
              <Link to={"/events/create"} >
                  <CrudButton type='create' name='Evento' /> 
              </Link>
            </Col>
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
        <Card.Body>
         <TableEvents events={events} taxonomy={taxonomy} loading={loading} loadingTaxonomy={loadingTaxonomy} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent}/> 
        </Card.Body>
        <Card.Footer >
          <Row className="justify-content-md-center">
              <Col md="auto"> 
                  <AdvancedPagination countItems={countItems} updatePage={updatePage} ></AdvancedPagination>
              </Col>
          </Row>
      </Card.Footer>
      <ModalConfirm type='merge' component='eventos' name={selectedEvent} showModal={showModal} onHide={() => setShowModal(false)} ifConfirm={() => merge()}/>
      </Card>            
    </div>
  )
}
export default ListEvent