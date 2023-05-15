import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import TableContact from './components/TableContact';
import CrudButton from '../../components/Button/CrudButton';
import { getContacts } from '../../api/services/contacts';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import Search from '../../components/Search/Search';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import Alert from '../../components/Alert/Alert';

const ListContact = () => {
    const [contacts, setContacts] = useState([])
    const [isModify, setIsModify] = useState(null);

    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    //Alert
    const [showAlert, setShowAlert] = useState(false);

    //AdvancedPagination
    const [currentPage, setCurrentPage] = useState(1);
    const [countItems, setCountItems] = useState(0);

    function updatePage(chosenPage){
        setCurrentPage(chosenPage);
    }

    useEffect( ()=> {

        setCurrentPage(currentPage )//?

        getContacts()
            .then((response) => {
                setContacts(response.data.results);
                //Pagination
                setCountItems(response.data.count);
            })
            .catch((error) => {
                // Show alert
            })
            .finally(() => {
                setShowAlert(true)
                setLoading(false)
            })
        }, [countItems, currentPage, isModify])

    // ------- SEARCH --------
    const action = () => {
        console.log("llamada backend")
    }

    //filtro
    let show = []
    if (!search) {
        show = contacts
    } else {
        show = contacts.filter( (item) => 
            item.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

    return (
    <React.Fragment>
        <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)}/>
        <Row>
            <Navigation actualPosition={'Contactos'}/>  
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col>
                                <Search type="contacto" action={action} search={search} setSearch={setSearch}/> 
                            </Col>
                            <Col sm={3} lg={3}>
                                <Link to={{pathname:'/contacts/create'}} >
                                    <CrudButton type='create' name='Contacto' />
                                </Link>
                            </Col> 
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <TableContact setIsModify={setIsModify} list={contacts} loading={loading} currentPage={currentPage}/>
                    </Card.Body>
                    <Card.Footer>
                        <Row className="justify-content-md-center">
                            <Col md="auto"> 
                                <AdvancedPagination countItems={countItems} updatePage={updatePage} ></AdvancedPagination>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </React.Fragment>
)}
export default ListContact;
