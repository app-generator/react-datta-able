import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Collapse } from 'react-bootstrap';
import CrudButton from '../../components/Button/CrudButton';
import TableTemplete from './components/TableTemplete';
import Navigation from '../../components/Navigation/Navigation';
import Search from '../../components/Search/Search'
import { getTemplates, getAllTemplate } from '../../api/services/templates';
import { getAllFeeds } from "../../api/services/feeds";
import { getAllTaxonomies } from '../../api/services/taxonomies';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import Alert from '../../components/Alert/Alert';
import ButtonFilter from '../../components/Button/ButtonFilter';
import FilterSelectUrl from '../../components/Filter/FilterSelectUrl';

const ListTemplete = () => {
  const [templete, setTemplete] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [countItems, setCountItems] = useState(0);
  const [updatePagination, setUpdatePagination] = useState(false)
  const [disabledPagination, setDisabledPagination] = useState(true)

  const [showAlert, setShowAlert] = useState(false)
  const [open, setOpen] = useState(false);

  const [taxonomies, setTaxonomies] = useState([]);  
  const [feeds, setFeeds] = useState([])

  const [taxonomyFilter, setTaxonomyFilter]= useState('')
  const [feedFilter, setFeedFilter]= useState('')
  const [addressValues, setAddressValues]= useState([])
  const [wordToSearch, setWordToSearch]= useState('')
  const [order, setOrder] = useState("");
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

    getTemplates(currentPage,taxonomyFilter+feedFilter+wordToSearch, order)
        .then((response) => {
            setTemplete(response.data.results);
            setCountItems(response.data.count) 
            setCountItems(response.data.count)
            if(currentPage === 1){
                setUpdatePagination(true)  
            }
            setDisabledPagination(false)
        })
        .catch((error)=>{
            setError(error)
          })
          .finally(() => {
              setShowAlert(true)
              setLoading(false)
          })

    }, [currentPage, taxonomyFilter, feedFilter, wordToSearch, order])

    const resetShowAlert = () => {
        setShowAlert(false);
    }

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
                                <ButtonFilter open={open} setOpen={setOpen} />
                            </Col>
                            <Col sm={12} lg={8}>
                                <Search type="cidr o dominio" setWordToSearch={setWordToSearch} wordToSearch={wordToSearch} setLoading={setLoading} />
                            </Col>
                            <Col sm={12} lg={3}>
                                <Link to={{pathname:'/templates/create'}} >
                                    <CrudButton type='create' name='Plantilla' />
                                </Link>
                            </Col> 
                        </Row>
                        <Collapse in={open}>
                            <div id="example-collapse-text">
                                <br/>
                                <Row>
                                    <Col sm={12} lg={4}>
                                        <FilterSelectUrl options={feeds} itemName="fuentes" partOfTheUrl="event_feed" itemFilter={feedFilter} itemFilterSetter={setFeedFilter} setLoading={setLoading}/>
                                    </Col>
                                    <Col sm={12} lg={4}>
                                        <FilterSelectUrl options={taxonomies} itemName="taxonomia" partOfTheUrl="event_taxonomy" itemFilter={taxonomyFilter}  itemFilterSetter={setTaxonomyFilter} setLoading={setLoading}/>
                                    </Col>
                                    
                                </Row>
                                <br /> 
                            </div>
                        </Collapse>
                    </Card.Header>
                    <Card.Body>
                        <TableTemplete list={templete} loading={loading} order={order} setOrder={setOrder} setLoading={setLoading} currentPage={currentPage}/>
                    </Card.Body>
                    <Card.Footer >
                            <Row className="justify-content-md-center">
                                <Col md="auto"> 
                                    <AdvancedPagination countItems={countItems} updatePage={updatePage} updatePagination={updatePagination} setUpdatePagination={setUpdatePagination} setLoading={setLoading} setDisabledPagination={setDisabledPagination} disabledPagination={disabledPagination}/>
                                </Col>
                            </Row>
                        </Card.Footer>
                </Card>
                </Col>
        </Row>
    </React.Fragment>
  )
}

export default ListTemplete