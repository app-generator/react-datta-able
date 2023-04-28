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

const ListTemplete = () => {
  const[templete, setTemplete] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [jumpPage, setjumpPage] = useState(false)
  const [pages, setPages] = useState(0)
  const [arrayPages, setArrayPages] = useState([])
    const [countItems, setCountItems] = useState(0);
    function updatePage(chosenPage){
        setCurrentPage(chosenPage);
    }

  useEffect( ()=> {


    getTemplates()
        .then((response) => {
            setCountItems(response.data.count)    
            setTemplete(response.data.results);
        })
        .catch((error) => {
            setError(error)
        })
        .finally(() => {
            setLoading(false)
        })
}, [countItems, currentPage])



console.log(templete)
  return (
    <React.Fragment>
      <Row>
            <Navigation actualPosition={'Plantilla'}/>  
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Search type="red" action={""} />
                            <Col sm={12} lg={3}>
                                <Link to={{pathname:'/add-template'}} >
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