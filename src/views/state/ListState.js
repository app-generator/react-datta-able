import React, { useState, useEffect } from 'react';
import { getStates} from "../../api/services/states";
import { Row, Col, Card } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Navigation from '../../components/Navigation/Navigation'
import Search from '../../components/Search/Search'
import CrudButton from '../../components/Button/CrudButton';
import TableStates from './components/TableStates'
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import Alert from '../../components/Alert/Alert';

const ListState = () => {
    const [loading, setLoading] = useState(true)
    const [states, setStates] = useState([])
    const [error, setError] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [countItems, setCountItems] = useState(0);
    const [updatePagination, setUpdatePagination] = useState(false)
    const [disabledPagination, setDisabledPagination] = useState(true)


    const [showAlert, setShowAlert] = useState(false)

    const resetShowAlert = () => {
        setShowAlert(false);
      }

    function updatePage(chosenPage){
        setCurrentPage(chosenPage);
    }

    useEffect(() => {

            getStates('?page='+currentPage)
            .then((response) => {
                setStates(response.data.results)
                setCountItems(response.data.count)
                if(currentPage === 1){
                  setUpdatePagination(true)  
                }
                setDisabledPagination(false)
            }).catch((error)=>{
                setError(error)
              })
              .finally(() => {
                  setShowAlert(true)
                  setLoading(false)
              })
    
    
        }, [ currentPage])

        
    console.log(states)
    const action = () => {
        console.log("llamada backend")
      }
  return (
    <div>
        <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>
      <Row>
        <Navigation actualPosition="Estados"/>
      </Row>
      <Card>
        <Card.Header>
          <Row>
            <Col sm={12} lg={9}>
                <Search type="Estado" action={action} />
            </Col>
            <Col sm={12} lg={3}>
                <Link to={{pathname:'/states/create', state:states}} >
                    <CrudButton type='create' name='estado' />
                </Link>
          
            </Col> 
          </Row>                                 
          </Card.Header>
          <Card.Body> 
            <TableStates states={states}  loading={loading} currentPage={currentPage} /> 
          </Card.Body>
          <Card.Footer >
            <Row className="justify-content-md-center">
                <Col md="auto"> 
                  <AdvancedPagination countItems={countItems} updatePage={updatePage} updatePagination={updatePagination} setUpdatePagination={setUpdatePagination} setLoading={setLoading} setDisabledPagination={setDisabledPagination} disabledPagination={disabledPagination}/>
                </Col>
            </Row>
          </Card.Footer>
      </Card>
  </div>
  )
}

export default ListState