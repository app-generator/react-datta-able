import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Collapse, Form, Button } from 'react-bootstrap';
import CrudButton from '../../components/Button/CrudButton';
import TableTemplete from './components/TableTemplete';
import Navigation from '../../components/Navigation/Navigation';
import Search from '../../components/Search/Search'
import { getTemplates, getAllTemplate } from '../../api/services/templates';
import { getAllFeeds } from "../../api/services/feeds";
import { getAllTaxonomies } from '../../api/services/taxonomies';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import Alert from '../../components/Alert/Alert';
import Select from 'react-select';

const ListTemplete = () => {
  const[templete, setTemplete] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [countItems, setCountItems] = useState(0);
  const [showAlert, setShowAlert] = useState(false)
  const [open, setOpen] = useState(false);

  const [taxonomies, setTaxonomies] = useState([]);  
  const [feeds, setFeeds] = useState([])
  const [feedName, setFeedName]= useState('')
  const [taxonomyName, setTaxonomyName]= useState('')

  const [taxonomyFilter, setTaxonomyFilter]= useState('')
  const [feedFilter, setFeedFilter]= useState('')
  const [addressValues, setAddressValues]= useState([])
  const [addressValue, setAddressValue]= useState('')
  const [addressValueFilter, setAddressValueFilter]= useState('')
    function updatePage(chosenPage){
        setCurrentPage(chosenPage);
    }
    

  useEffect( ()=> {
    getAllTemplate().then((response) => {
        let listAddressValue = []
        response.map((template) => {
            listAddressValue.push({value:template.address_value, label:template.address_value})
        })
        setAddressValues(listAddressValue)
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

    getTemplates('?'+taxonomyFilter+feedFilter+'page='+currentPage)
        .then((response) => {
            setTemplete(response.data.results);
            setCountItems(response.data.count) 
        })
        .catch((error)=>{
            setError(error)
          })
          .finally(() => {
              setShowAlert(true)
              setLoading(false)
          })

    }, [countItems, currentPage, taxonomyFilter, feedFilter])

    const resetShowAlert = () => {
        setShowAlert(false);
    }

    const getTaxonomyUrlNumber = (taxonomy) => {
        let taxonomyNumber = ""
        if (taxonomy !== null){
          const parts = taxonomy.value.split("/");
          taxonomyNumber = parts[parts.length - 2] // El número estará en el penúltimo segmento
          setTaxonomyName(taxonomy)
          setTaxonomyFilter("event_taxonomy="+taxonomyNumber+'&')
        }else{
          setTaxonomyFilter("event_taxonomy="+taxonomyNumber+'&')
          setTaxonomyName("")
        }
        if (taxonomyFilter !== "event_taxonomy="+taxonomyNumber+'&') { // este if esta porque si no hay cambios en el WordToSearch 
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
          setFeedFilter("event_feed="+feedNumber+'&')
          
        }else{
          setFeedFilter("event_feed="+feedNumber+'&')
          setFeedName("")
        }
        if (feedFilter !== "event_feed="+feedNumber+'&'){ // este if esta porque si no hay cambios en el WordToSearch 
          //haciendo que no se vuelva a ejecutar el useEffect y qeu al setearce setloading en true quede en un bucle infinito
          setLoading(true)
        }
    }

    

console.log(templete)
  return (
    <React.Fragment>
        <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>
      <Row>
            <Navigation actualPosition={'Plantilla'}/>  
        </Row>
        <Row>
            <Col>
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
                            <Col sm={12} lg={8}>
                                <Search type="red" action={""} />
                            </Col>
                            <Col sm={12} lg={3}>
                                <Link to={{pathname:'/templates/create'}} >
                                    <CrudButton type='create' name='Plantilla' />
                                </Link>
                            </Col> 
                        </Row>
                        <Collapse in={open}>
                            <div id="example-collapse-text">
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
                                </Row>
                                <br /> 
                                
                            </div>
                        </Collapse>
                    </Card.Header>
                    <Card.Body>
                        <TableTemplete list={templete} loading={loading} />
                    </Card.Body>
                    <Card.Footer >
                            <Row className="justify-content-md-center">
                                <Col md="auto"> 
                                    <AdvancedPagination countItems={countItems} updatePage={updatePage} ></AdvancedPagination>
                                </Col>
                            </Row>
                        </Card.Footer>
                </Card>
                {/*<Alert/>*/}
                </Col>
        </Row>
    </React.Fragment>
  )
}

export default ListTemplete