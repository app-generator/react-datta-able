import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import CrudButton from '../../components/Button/CrudButton';
import Pagination from "../../components/Pagination/Pagination"; 
import TableTemplete from './components/TableTemplete';
import Navigation from '../../components/Navigation/Navigation';
import Search from '../../components/Search/Search'
import { getTemplates } from '../../api/services/templates';


const ListTemplete = () => {
  const[templete, setTemplete] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [jumpPage, setjumpPage] = useState(false)
  const [pages, setPages] = useState(0)
  const [arrayPages, setArrayPages] = useState([])

  useEffect( ()=> {

    setCurrentPage(currentPage )//?

    getTemplates()
        .then((response) => {
            //Pagination
            setPages(arrayWithPages(response.data.count,response.data.results.length))                 
            setTemplete(response.data.results);
        })
        .catch((error) => {
            setError(error)
        })
        .finally(() => {
            setLoading(false)
        })
}, [pages])

//Pagination
function arrayWithPages(numberOfItems,numberOfElementsOnAPage ) {
    console.log('funcion arrayWithPages')

    console.log(numberOfItems);
    console.log(numberOfElementsOnAPage);
    const numberOfPages= Math.ceil(numberOfItems / 10) //numberOfElementsOnAPage 
    console.log(numberOfPages)
    const complementUrl ="?page="
    const arrayLinks=[]
    for (var i = 1; i <= numberOfPages; i++) {
        arrayLinks.push(complementUrl+i)
    }
    setArrayPages(arrayLinks)
    return numberOfPages
}

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
                </Card>
                {/*<Alert/>*/}
                </Col>
        </Row>
    </React.Fragment>
  )
}

export default ListTemplete