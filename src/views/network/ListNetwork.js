import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Collapse } from 'react-bootstrap';
import CrudButton from '../../components/Button/CrudButton';
import { getNetworks } from '../../api/services/networks';
import { getAllContacts, getAllEntities } from '../../api/services/entities';
import TableNetwork from './components/TableNetwork';
import Navigation from '../../components/Navigation/Navigation';
import Search from '../../components/Search/Search';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import Alert from '../../components/Alert/Alert';
import ButtonFilter from '../../components/Button/ButtonFilter';
import FilterSelectUrl from '../../components/Filter/FilterSelectUrl';
import FilterSelect from '../../components/Filter/FilterSelect';

const ListNetwork = () => {
    const [network, setNetwork] = useState([])
    const [entities, setEntities] = useState([])
    const [types, setTypes] = useState([{ value: "internal", label: "Internal" },{ value: "external", label: "External" }])

    const [isModify, setIsModify] = useState(null);

    const [loading, setLoading] = useState(true)

    //Alert
    const [showAlert, setShowAlert] = useState(false);

    //AdvancedPagination
    const [currentPage, setCurrentPage] = useState(1);
    const [countItems, setCountItems] = useState(0);
    const [updatePagination, setUpdatePagination] = useState(false)
    const [disabledPagination, setDisabledPagination] = useState(true)

    const [wordToSearch, setWordToSearch]= useState('')
    const [open, setOpen] = useState(false);
    const [typeFilter, setTypeFilter] = useState("");
    const [entitiesFilter, setEntitiesFilter] = useState("")
    const [order, setOrder] = useState("");


    function updatePage(chosenPage){
        setCurrentPage(chosenPage);
    }

    useEffect( ()=> {

        getAllEntities()
            .then((response) => {
                let listEntities = []
                response.map((entitiesItem)=>{
                    listEntities.push({value:entitiesItem.url, label:entitiesItem.name })
                })
                setEntities(listEntities)
            })
            .catch((error)=>{
                
            })

        getNetworks(currentPage, entitiesFilter +typeFilter+ wordToSearch, order)
            .then((response) => {
                setNetwork(response.data.results);
                // Pagination
                setCountItems(response.data.count);
                if(currentPage === 1){
                    setUpdatePagination(true)  
                }
                setDisabledPagination(false)

            })
            .catch((error) => {
                // Show alert
            })
            .finally(() => {
                setShowAlert(true)
                setLoading(false)
            })
        }, [countItems, currentPage, isModify, wordToSearch, entitiesFilter, typeFilter, order])
        const labelRole = {
            technical : 'Tecnico',
            administrative : 'Administrativo',
            abuse : 'Abuso',
            notifications : 'Notificaciones',
            noc : 'NOC',
        };



    return (
    <React.Fragment>
        <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)} component="network"/>
        <Row>
            <Navigation actualPosition={'Redes'}/>  
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
                                <Link to={{pathname:'/networks/create'}} >
                                    <CrudButton type='create' name='Red' />
                                </Link>
                            </Col> 
                        </Row>
                        <br/>
                        <Collapse in={open}>
                      
                            <div id="example-collapse-text">
                            <Row>
                                <Col sm={4} lg={4}>
                                    <FilterSelectUrl options={entities} itemName="Entidades" partOfTheUrl="network_entity" itemFilter={entitiesFilter} itemFilterSetter={setEntitiesFilter} setLoading={setLoading} setCurrentPage={setCurrentPage}/>
                                </Col>
                                <Col sm={4} lg={4}>
                                    <FilterSelect options={types} partOfTheUrl="type" setFilter={setTypeFilter} currentFilter={typeFilter} setLoading={setLoading} placeholder="Filtrar por tipos" />
                                </Col>
                                
                            </Row>
                            <br /> 
                            </div>
                        </Collapse> 
                    </Card.Header>
                    <Card.Body>
                        <TableNetwork setIsModify={setIsModify} list={network} loading={loading} currentPage={currentPage} order={order} setOrder={setOrder} setLoading={setLoading}/>
                    </Card.Body>
                    <Card.Footer>
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
)}
export default ListNetwork;
