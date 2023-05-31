import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/Navigation/Navigation'
import Search from '../../components/Search/Search'
import CrudButton from '../../components/Button/CrudButton';
import { getPriorities} from "../../api/services/priorities";
import TablePriorities from './components/TablePriorities';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';

const ListPriorities = () => {
  const [priorities, setPriorities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,setError]= useState()
  const [stateAlert, setStateAlert] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [countItems, setCountItems] = useState(0);
  const [showAlert, setShowAlert] = useState(false)

  function updatePage(chosenPage){
    setCurrentPage(chosenPage);
  }

  useEffect(() => {
      getPriorities('?page='+currentPage).then((response) => {
          //es escencial mantener este orden ya que si no proboca bugs en el paginado
          setPriorities(response.data.results)
          setCountItems(response.data.count)
           
      }).catch((error)=>{
        setError(error)
    })
    .finally(() => {
        setShowAlert(true)
        setLoading(false)
    })
  
  }, [countItems, currentPage])
  
  const action = () => {
    console.log("llamada backend")
  }

  const resetShowAlert = () => {
    setShowAlert(false);
  }

  return (
    <div>
    
    <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>
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
              <Link to={"/priorities/create"} >
                <CrudButton type='create' name='Prioridad' /> 
              </Link>
            </Col>
          </Row>                                 
        </Card.Header>
        <Card.Body>
          <TablePriorities Priorities={priorities}  loading={loading} /> 
        </Card.Body>
        <Card.Footer >
            <Row className="justify-content-md-center">
                <Col md="auto"> 
                    <AdvancedPagination countItems={countItems} updatePage={updatePage} ></AdvancedPagination>
                </Col>
            </Row>
        </Card.Footer>
      </Card>            
    </div>
  );
}
export default ListPriorities