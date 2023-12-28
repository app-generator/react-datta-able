import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { Card,Row,Col, Button, Badge, Collapse, Form, Modal } from 'react-bootstrap';
import Navigation from '../../components/Navigation/Navigation'
import Search from '../../components/Search/Search'
import CrudButton from '../../components/Button/CrudButton';
import { getEvents, mergeEvent} from "../../api/services/events";
import { getAllFeeds } from "../../api/services/feeds";
import { getAllTaxonomies } from '../../api/services/taxonomies';
import { getTLP} from "../../api/services/tlp";
import TableEvents from './components/TableEvents';
import FilterSelectUrl from '../../components/Filter/FilterSelectUrl';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import ModalConfirm from '../../components/Modal/ModalConfirm';
import Alert from '../../components/Alert/Alert';
import ButtonFilter from '../../components/Button/ButtonFilter';
import Select from 'react-select';
import { getAllCases, patchCase, postCase } from "../../api/services/cases";
import ModalFormCase from './components/ModalFormCase';
import { getStates } from '../../api/services/states';

const ListEvent = () => {
  const [events, setEvents] = useState([])
  
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

  //modal case
  const [showModalCase, setShowModalCase] = useState(false);
  const [cases, setCases] = useState([])
  const [selectCase, setSelectCase] = useState("")

  //add to cases
  const [openCases, setOpenCases] = useState(true);
  const [opeFormCases, setOpenFormCases] = useState(false);
  const [allStates, setAllStates] = useState([]) //multiselect

  const caseItem = {
      lifecycle: '0',//required
      priority: '0', //required
      tlp: '0', //required
      state: '0', //required
      date: null, //required
      parent: null,
      assigned: null,
      attend_date: null, //imprime la hora actual +3horas
      solve_date: null,
      comments: [], //?
      evidence: [],
  }

  //filters and search
  const [wordToSearch, setWordToSearch]= useState('')

  const [taxonomyFilter, setTaxonomyFilter]= useState('')
  const [tlpFilter, setTlpFilter]= useState('')
  const [feedFilter, setFeedFilter]= useState('')

  const [tlpList, setTlpList] = useState([])
  const [taxonomies, setTaxonomies] = useState([]);  
  const [feeds, setFeeds] = useState([])

  const [order, setOrder] = useState("");
  const [starDateFilter, setStarDateFilter] = useState("")
  const [endDateFilter, setEndDateFilter] = useState("")
  const [starDate, setStarDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [filterDate, setFilterDate] = useState(false)
  const [open, setOpen] = useState(false);
  const [updatePagination, setUpdatePagination] = useState(false)
  const [disabledPagination, setDisabledPagination] = useState(true)

  //create case
  const [bodyCase, setBodyCase] = useState({
    date:"",
    lifecycle:"",
    parent:"",
    priority:"",
    tlp:"",
    assigned:"",
    state:"",
    attend_date:"",
    solve_date:"",
    selectedEvent:"",
    comments:[],
      
  }) 
  const [evidenceCase, setEvidenceCase] = useState([])
  //commet
  const [ comm, setComm ] = useState();

  function updatePage(chosenPage){
    setCurrentPage(chosenPage);
  }

  const resetShowAlert = () => {
    setShowAlert(false);
  }

  useEffect(() => {

    getStates().then((response) => {
          console.log(response);
          let listStates = []
          response.data.results.map((stateItem)=>{
              listStates.push({value:stateItem.url, label:stateItem.name, childrenUrl:stateItem.children})
          })
          setAllStates(listStates)

          console.log(response.data.results)
      })
      .catch((error)=>{
          console.log(error)
      })

    getAllCases().then((response) => { 
      let list = []
      response.map((item) => {
        const parts = item.url.split("/");
        let itemNumber = parts[parts.length - 2];
        list.push({value:item.url, label:itemNumber})
      })
      setCases(list)
    })
    .catch((error) => {
        setError(error)
        
    }).finally(() => {
        setLoading(false)
    })

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
      let listTlp = []
        response.data.results.map((taxonomy) => {
          listTlp.push({value:taxonomy.url, label:taxonomy.name})
        })
      setTlpList(listTlp)
    })
    getEvents(currentPage, starDateFilter+endDateFilter+taxonomyFilter+tlpFilter+feedFilter+wordToSearch, order).then((response) => {// por alguna razon lo tengo que poner a lo ultimo paar que el buscador funciones
        setEvents(response.data.results)
        setCountItems(response.data.count)
        if(currentPage === 1){
          setUpdatePagination(true)  
        } 
        setFilterDate(false)
        setDisabledPagination(false)
        
    }).catch((error)=>{
        setShowAlert(true) //hace falta?
        setError(error)
    }).finally(() => {
      setLoading(false)
      setShowAlert(true)
    })

  }, [ currentPage, ifModify, wordToSearch, taxonomyFilter, tlpFilter, feedFilter, filterDate, order, ])

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

  const modalCase = () => {
    //setId
    setShowModalCase(true);
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
    if ((endDateFilter !== "created_range_before="+date+'&')&&(starDateFilter !=="")){ // este if esta porque si no hay cambios en el WordToSearch 
      //haciendo que no se vuelva a ejecutar el useEffect y qeu al setearce setloading en true quede en un bucle infinito
      setFilterDate(true)
      setLoading(true)
    }
  }

  const complete=(selectCase)=>{ 
    setSelectCase(selectCase)
    console.log(selectCase)

  };


  const addEventsToCase=()=>{ 
    patchCase(selectCase.value,selectedEvent ).then((response) => {
      setSelectedEvent([])
      setSelectCase("")
      setIfModify(response)

    })
    setShowModalCase(false);
  };
  const clearModal=()=>{ 
    setBodyCase({
      date:"",
      lifecycle:"",
      parent:"",
      priority:"",
      tlp:"",
      assigned:"",
      state:"",
      attend_date:"",
      solve_date:"",
      selectedEvent:"",
      comments:[],
        
    })
    setSelectedEvent([])
    setSelectCase("")
    setShowModalCase(false)

  };

  //Create
  const createCase = () => {
    const form = new FormData();
    form.append("date",bodyCase.date)
    form.append("lifecycle",bodyCase.lifecycle)
    if(bodyCase.parent !== null) {
        form.append("parent", bodyCase.parent)
    }
    form.append("priority", bodyCase.priority)
    form.append("tlp", bodyCase.tlp)
    if(bodyCase.assigned !== null) {
        form.append("assigned", bodyCase.assigned)
    }
    form.append("state", bodyCase.state)
    form.append("attend_date", bodyCase.attend_date)
    form.append("solve_date", bodyCase.solve_date)
        
    selectedEvent.forEach(selectedEvent => {
        form.append("events", selectedEvent);
    });
    
    //form.append("evidence", "http://localhost:8000/api/event/1/")
    //form.append("evidence", ["http://localhost:8000/api/event/1/", "http://localhost:8000/api/event/2/"])
    //form.append("evidence", evidences)
    if (evidenceCase !== null){
        for (let index=0; index< evidenceCase.length  ; index++){
        form.append("evidence", evidenceCase[index])
        console.log(evidenceCase[index])
        }
    }/*else{
        form.append("evidence", evidences)
    }
    */
    if (comm !== null){
        let array = bodyCase.comments;
        array.push(comm)
        setBodyCase((prevBodyCase) => ({
          ...prevBodyCase,
          comments: comm,
        }));
        //setComments((e) => [...e, comm])
        console.log(comm);
        console.log(array);
        console.log(bodyCase.comments);
        form.append("comments", array)   
    }

    console.log(form)
    postCase(form)
        .then((response) => { 
          setBodyCase({
            date:"",
            lifecycle:"",
            parent:"",
            priority:"",
            tlp:"",
            assigned:"",
            state:"",
            attend_date:"",
            solve_date:"",
            selectedEvent:"",
            comments:[],
              
          })
          setSelectedEvent([])
          setSelectCase("")
          setShowModalCase(false)
            
        })
        .catch((error) => {
            console.log(error.data)
            setShowAlert(true)
        }); 
};


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
          <ButtonFilter open={open} setOpen={setOpen} />
        </Col>
        <Col sm={8} lg={5} >
              <Search type="por taxonomia, fuentes o recurso afectado" setWordToSearch={setWordToSearch} wordToSearch={wordToSearch} setLoading={setLoading} />
        </Col>
        <Col> 
            <Link to={"/events/create"} >
                <CrudButton type='create' name='Evento' /> 
            </Link>
            <Button 
                disabled={selectedEvent.length > 1 ? false : true}
                size="lm"
                className='text-capitalize'
                variant="outline-dark"
                title='Mergear'
                onClick={() => mergeConfirm()}>
                <i  className="fa fa-code-branch"/>
                    Merge&nbsp;
                <Badge  
                    className="badge mr-1" >
                    {selectedEvent.length} 
                </Badge>
            </Button>
            <Button 
                disabled={selectedEvent.length > 0 ? false : true}
                size="lm"
                variant="outline-dark"
                onClick={() => modalCase()}>
                Agregar a un caso
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
            <Col sm={4} lg={4}>
              <FilterSelectUrl options={tlpList} itemName="tlp" partOfTheUrl="tlp" itemFilter={tlpFilter} itemFilterSetter={setTlpFilter} setLoading={setLoading} setCurrentPage={setCurrentPage}/>
            </Col>
            <Col sm={4} lg={4}>
              <FilterSelectUrl options={taxonomies} itemName="taxonomia" partOfTheUrl="taxonomy" itemFilter={taxonomyFilter}  itemFilterSetter={setTaxonomyFilter} setLoading={setLoading} setCurrentPage={setCurrentPage}/>
            </Col>
            <Col sm={4} lg={4}>
              <FilterSelectUrl options={feeds} itemName="fuentes" partOfTheUrl="feed" itemFilter={feedFilter} itemFilterSetter={setFeedFilter} setLoading={setLoading} setCurrentPage={setCurrentPage}/>
            </Col>
            
          </Row>
          <br /> 
        </div>
      </Collapse>              
        </Card.Header>
        <Card.Body>
           <TableEvents events={events} loading={loading} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} order={order} setOrder={setOrder} setLoading={setLoading} currentPage={currentPage}/> 
        </Card.Body>
        <Card.Footer >
          <Row className="justify-content-md-center">
              <Col md="auto"> 
                  <AdvancedPagination countItems={countItems} updatePage={updatePage} updatePagination={updatePagination} setUpdatePagination={setUpdatePagination} setLoading={setLoading} setDisabledPagination={setDisabledPagination} disabledPagination={disabledPagination}/>
              </Col>
          </Row>
      </Card.Footer>
      <ModalConfirm type='merge' component='eventos' name={selectedEvent} showModal={showModal} onHide={() => setShowModal(false)} ifConfirm={() => merge()}/>
      <Modal show={showModalCase} onHide={() => clearModal()} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar eventos a un caso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Button variant="primary" className='text-capitalize' size="sm" active={openCases} onClick={() => setOpenCases(!openCases)} aria-expanded={openCases}>
                  Agregar a un caso existente
                </Button>
                <Button variant="primary" className='text-capitalize' size="sm" active={!openCases} onClick={() => setOpenCases(!openCases)} aria-expanded={!openCases}>
                  Crear a un nuevo caso
                </Button>
                
                <Collapse in={openCases}>
                  <div id="example-collapse-text"> 
                  <Row>
                    <Col sm={10} lg={10}>
                        
                        <Form.Group>
                            <Form.Label>Casos</Form.Label>
                            <Select options={cases} value={selectCase} isClearable placeholder={"Seleccione un caso"} onChange={(e) => complete(e)}  />
                        </Form.Group>
                    </Col>
                    </Row>
                    
                  </div>
                </Collapse>
                <Collapse in={!openCases}>
                  <div id="example-collapse-text">
                   <ModalFormCase body={bodyCase} setBody={setBodyCase} 
                                evidence={evidenceCase}  setEvidence={setEvidenceCase} 
                                createCase={createCase} comm={comm} setComm={setComm} />
                  </div>
                </Collapse>
                    <Modal.Footer>
                          <Button variant="outline-primary" onClick={openCases ? addEventsToCase: createCase  }>
                            {openCases ?  "Confirmar": "Crear"} 
                          </Button>

                          <Button variant="outline-secondary" onClick={() => clearModal()}>Cancelar</Button>
                    </Modal.Footer>
                </Modal.Body>
                
            </Modal>
      </Card>            
    </div>
  )
}
export default ListEvent