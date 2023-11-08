import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import {
     Card,Row,Col, Button, Badge, Collapse, Form
} from 'react-bootstrap';
import Navigation from '../../components/Navigation/Navigation'
import Search from '../../components/Search/Search'
import CrudButton from '../../components/Button/CrudButton';
import { getEvents, mergeEvent} from "../../api/services/events";
import { getAllFeeds } from "../../api/services/feeds";
import { getAllTaxonomies } from '../../api/services/taxonomies';
import { getTLP} from "../../api/services/tlp";
import TableEvents from './components/TableEvents';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import ModalConfirm from '../../components/Modal/ModalConfirm';
import Alert from '../../components/Alert/Alert';
import Select from 'react-select';



const ListEvent = () => {
  const [events, setEvents] = useState([])
  const [tlpList, setTlpList] = useState([])
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
  const [wordToSearch, setWordToSearch]= useState('')
  const [taxonomyFilter, setTaxonomyFilter]= useState('')
  const [tlpFilter, setTlpFilter]= useState('')
  const [feedFilter, setFeedFilter]= useState('')
  
  const [feedName, setFeedName]= useState('')
  const [taxonomyName, setTaxonomyName]= useState('')
  const [tlpName, setTlpName]= useState('')
  const [taxonomies, setTaxonomies] = useState([]);  
  const [feeds, setFeeds] = useState([])
  const [starDateFilter, setStarDateFilter] = useState("")
  const [endDateFilter, setEndDateFilter] = useState("")
  const [starDate, setStarDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [filterDate, setFilterDate] = useState(false)
  const [updatePagination, setUpdatePagination] = useState(false)
  const [open, setOpen] = useState(false);

  function updatePage(chosenPage){
    setCurrentPage(chosenPage);
  }

  const resetShowAlert = () => {
    setShowAlert(false);
  }

  useEffect(() => {

    getAllTaxonomies()
    .then((response) => {
        let listTaxonomies = []
        response.map((taxonomy) => {
            listTaxonomies.push({value:taxonomy.url, label:taxonomy.name})
        })
        setTaxonomies(listTaxonomies)
    })

    getAllFeeds().then((response) => {
        let listFeeds = []
        response.map((taxonomy) => {
          listFeeds.push({value:taxonomy.url, label:taxonomy.name})
        })
      setFeeds(listFeeds)
    })
    getTLP().then((response) => {
      console.log(response)
      let listTlp = []
        response.data.results.map((taxonomy) => {
          listTlp.push({value:taxonomy.url, label:taxonomy.name})
        })
      setTlpList(listTlp)
    })
    
    getEvents("?"+starDateFilter+endDateFilter+taxonomyFilter+tlpFilter+feedFilter+wordToSearch+'page='+currentPage).then((response) => {// por alguna razon lo tengo que poner a lo ultimo paar que el buscador funciones
        setEvents(response.data.results)
        setCountItems(response.data.count)
        setUpdatePagination(true)
        setFilterDate(false)
        
    }).catch((error)=>{
        setShowAlert(true) //hace falta?
        setError(error)
    }).finally(() => {
      setLoading(false)
      setShowAlert(true)
    })

  }, [countItems, currentPage,ifModify, wordToSearch, taxonomyFilter, tlpFilter, feedFilter, filterDate])

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
 
  
  const action = (search) => {
    setWordToSearch("search="+search+'&')
    if (wordToSearch !== "search="+search+'&'){ // este if esta porque si no hay cambios en el WordToSearch 
                                                //haciendo que no se vuelva a ejecutar el useEffect y qeu al setearce setloading en true quede en un bucle infinito
      setLoading(true)
    }
  }

  const getTaxonomyUrlNumber = (taxonomy) => {
    let taxonomyNumber = ""
    if (taxonomy !== null){
      const parts = taxonomy.value.split("/");
      taxonomyNumber = parts[parts.length - 2] // El número estará en el penúltimo segmento
      setTaxonomyName(taxonomy)
      setTaxonomyFilter("taxonomy="+taxonomyNumber+'&')
    }else{
      setTaxonomyFilter("taxonomy="+taxonomyNumber+'&')
      setTaxonomyName("")
    }
    if (taxonomyFilter !== "taxonomy="+taxonomyNumber+'&') { // este if esta porque si no hay cambios en el WordToSearch 
      //haciendo que no se vuelva a ejecutar el useEffect y qeu al setearce setloading en true quede en un bucle infinito
      setLoading(true)
    }
  }

  const getFeedUrlNumber = (feed) => {
    let feedNumber = ""
    if(feed !== null){
      const parts = feed.value.split("/");
      feedNumber = parts[parts.length - 2]// El número estará en el penúltimo segmento
      setFeedName(feed)
      setFeedFilter("feed="+feedNumber+'&')
      
    }else{
      setFeedFilter("feed="+feedNumber+'&')
      setFeedName("")
    }
    if (feedFilter !== "feed="+feedNumber+'&'){ // este if esta porque si no hay cambios en el WordToSearch 
      //haciendo que no se vuelva a ejecutar el useEffect y qeu al setearce setloading en true quede en un bucle infinito
      setLoading(true)
    }
  }

  const getTlpUrlNumber = (tlp) => {
    let tlpNumber = ""
    if(tlp !== null){
      const parts = tlp.value.split("/");
      tlpNumber =parts[parts.length - 2] // El número estará en el penúltimo segmento
      setTlpName(tlp)
      setTlpFilter("tlp="+tlpNumber+'&')
      
    }else{
      setTlpFilter("tlp="+tlpNumber+'&')
      setTlpName("")
    }
    if (tlpFilter !== "tlp="+tlpNumber+'&'){ // este if esta porque si no hay cambios en el WordToSearch 
      //haciendo que no se vuelva a ejecutar el useEffect y qeu al setearce setloading en true quede en un bucle infinito
      setLoading(true)
    }
  }

  const completeDateStar = (date) => {
    setStarDate(date)
    setStarDateFilter("created_range_after="+date+'&')
    if ((endDateFilter !== "")&&(starDateFilter !== "created_range_after="+date+'&')){ // este if esta porque si no hay cambios en el WordToSearch 
      //haciendo que no se vuelva a ejecutar el useEffect y qeu al setearce setloading en true quede en un bucle infinito
      setFilterDate(true)
      setLoading(true)
    }
  }

  const completeDateEnd = (date) => {
    setEndDate(date)
    setEndDateFilter("created_range_before="+date+'&')
    console.log(date)
    if ((endDateFilter !== "created_range_before="+date+'&')&&(starDateFilter !=="")){ // este if esta porque si no hay cambios en el WordToSearch 
      //haciendo que no se vuelva a ejecutar el useEffect y qeu al setearce setloading en true quede en un bucle infinito
      setFilterDate(true)
      setLoading(true)
    }
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
        <Col sm={1} lg={1}>
          <Button variant="primary" className='text-capitalize'size="sm"
            onClick={() => setOpen(!open)}
            aria-expanded={open}>
              <span className="material-icons">
              tune
              </span>
          </Button>
        </Col>
        <Col sm={1} lg={6} >
              <Search type="evento" action={action} />
        </Col>
        
        <Col> 
            <Link to={"/events/create"} >
                <CrudButton type='create' name='Evento' /> 
            </Link>
      
            <Button 
                disabled={selectedEvent.length > 1 ? false : true}
                size="lm"
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
      <Collapse in={open}>
        <div id="example-collapse-text">
       
        <Row>
            
            <Col sm={12} lg={6}>
              <Form.Group controlId="formGridAddress1">
                <Form.Label>Fecha desde</Form.Label>
                <Form.Control 
                  type="date"
                  maxLength="150" 
                  placeholder="Fecha desde"
                  value={starDate} 
                  onChange={(e) => completeDateStar(e.target.value)}
                  name="date"
                />
              </Form.Group>
            </Col>

            <Col sm={12} lg={6}>
              <Form.Group controlId="formGridAddress1">
                <Form.Label>Fecha hasta</Form.Label>
                <Form.Control 
                  type="date"
                  maxLength="150" 
                  value={endDate} 
                  onChange={(e) => completeDateEnd(e.target.value)}
                  name="date"
                />
              </Form.Group>
            </Col>
          </Row>
    
          <Row>
         
          <Col sm={12} lg={4}>
                    <Form.Group>
                        <Select options={taxonomies} isClearable placeholder="Filtrar por taxonomia" value={taxonomyName} onChange={(e) => getTaxonomyUrlNumber(e)} />
                    </Form.Group>
            </Col>
            <Col sm={12} lg={4}>
                    <Form.Group>
                        <Select options={feeds} isClearable placeholder="Filtrar por feed" value={feedName} onChange={(e) => getFeedUrlNumber(e)} />
                    </Form.Group>
            </Col>
            <Col sm={12} lg={4}>
                    <Form.Group>
                        <Select options={tlpList} placeholder="Filtrar por tlp" value={tlpName} onChange={(e) => getTlpUrlNumber(e)} />
                    </Form.Group>
            </Col>
          </Row>
          <br /> 
         
        </div>
      </Collapse>
                                    
        </Card.Header>
        
        <Card.Body>
         <TableEvents events={events} loading={loading}  selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} wordToSearch={wordToSearch}/> 
        </Card.Body>
        <Card.Footer >
          <Row className="justify-content-md-center">
              <Col md="auto"> 
                  <AdvancedPagination countItems={countItems} updatePage={updatePage} updatePagination={updatePagination} setUpdatePagination={setUpdatePagination}></AdvancedPagination>
              </Col>
          </Row>
      </Card.Footer>

      <ModalConfirm type='merge' component='eventos' name={selectedEvent} showModal={showModal} onHide={() => setShowModal(false)} ifConfirm={() => merge()}/>
      </Card>            
    </div>
  )
}
export default ListEvent