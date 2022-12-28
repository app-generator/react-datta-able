import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb, Card } from 'react-bootstrap';
import AddButton from './elements/AddButton';
import TableContact from './elements/TableContact';
import Pagination from './elements/Pagination';

//paginacion fran

const ListContact = () => {
    const url = 'https://jsonplaceholder.typicode.com/users/'

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

    const showData = async () => {
        setLoading(true)
        const response = await fetch(url)
        const json = await response.json()
        setData(json) //json.results
        setLoading(false)
    } 

    //valores ingresados
    const [search, setSearch] = useState("");
    const searcher = (e) => {
        setSearch(e.target.value) //actualizar
        console.log(e.target)    
        }

    //filtro
    let show = []
    if (!search) {
        show = data
    } else {
        show = data.filter( (item) => 
            item.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

    useEffect( ()=> {
        showData()
    }, [])

    // Get current posts
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = show.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

return (
    <React.Fragment>
        <Row>
            <Breadcrumb>
                <Breadcrumb.Item href="./app/dashboard/default">
                    <i className="feather icon-home" />
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <b>Contactos</b>
                </Breadcrumb.Item>
            </Breadcrumb>    
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Header>                      
                        <Row>
                            <Col sm={12} lg={9}>
                                <div className="input-group">
                                    <input value={search} onChange={searcher} type="text" id="m-search" className="form-control" placeholder="Buscar entidad . . ." />
                                    <span className="search-btn btn btn-primary">
                                        <i className="feather icon-search " />
                                    </span>
                                </div>
                            </Col> 
                            <Col sm={12} lg={3}>
                                <AddButton></AddButton>
                            </Col> 
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <TableContact list={currentItem} loading={loading} itemsPerPage={itemsPerPage} currentPage={currentPage} />
                    </Card.Body>
                    <Card.Footer>
                    <Row className="justify-content-md-center">
                        <Col md="auto"> 
                        <Pagination itemsPerPage={itemsPerPage} totalItems={show.length} paginate={paginate} />
                        </Col>
                    </Row>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </React.Fragment>
)}
export default ListContact