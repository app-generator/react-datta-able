import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import CrudButton from '../../components/Button/CrudButton';
import Pagination from "../../components/Pagination/Pagination"; 
import TableTemplete from './components/TableTemplete';
import Navigation from '../../components/Navigation/Navigation';
import Search from '../../components/Search/Search'
import { getTemplates } from '../../api/services/templates';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import Alert from '../../components/Alert/Alert';

const ListTemplete = () => {
  const[templete, setTemplete] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [countItems, setCountItems] = useState(0);
  const [showAlert, setShowAlert] = useState(false)

    function updatePage(chosenPage){
        setCurrentPage(chosenPage);
    }
    

  useEffect( ()=> {


    getTemplates('?page='+currentPage)
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
}, [countItems, currentPage])
    const resetShowAlert = () => {
        setShowAlert(false);
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
                            <Col sm={12} lg={9}>
                            <Search type="red" action={""} />
                            </Col>
                            <Col sm={12} lg={3}>
                                <Link to={{pathname:'/templates/create'}} >
                                    <CrudButton type='create' name='Plantilla' />
                                </Link>
                            </Col> 
                        </Row>
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