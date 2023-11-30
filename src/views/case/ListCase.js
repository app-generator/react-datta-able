import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, Col, Row , Collapse} from 'react-bootstrap';
import CrudButton from '../../components/Button/CrudButton'; 
import TableCase from './components/TableCase'; 
import { getCases, mergeCase } from '../../api/services/cases';
import { getAllPriorities} from "../../api/services/priorities";
import { getTLP } from '../../api/services/tlp';
import { getAllStates } from '../../api/services/states'
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import Search from '../../components/Search/Search';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import ModalConfirm from '../../components/Modal/ModalConfirm';
import Alert from '../../components/Alert/Alert';
import ButtonFilter from '../../components/Button/ButtonFilter';
import FilterSelectUrl from '../../components/Filter/FilterSelectUrl';


const ListCase = () => {
    const [cases, setCases] = useState([]) //lista de casos
    const [ifModify, setIfModify] = useState(null) 
    const [loading, setLoading] = useState(true)
    
    //merge
    const [selectedCases, setSelectedCases] = useState([]);
    const [showModal, setShowModal] = useState(false);
    
    //Alert
    const [showAlert, setShowAlert] = useState(false); 
    //Pagination    
    const [currentPage, setCurrentPage] = useState(1);
    const [countItems, setCountItems] = useState(0);
    const [updatePagination, setUpdatePagination] = useState(false)
    const [disabledPagination, setDisabledPagination] = useState(true)
    //filters
    const [order, setOrder] = useState("");
    const [wordToSearch, setWordToSearch]= useState('')
    const [open, setOpen] = useState(false);

    const [priorities, setPriorities] = useState([]);
    const [priorityFilter, setPriorityFilter] = useState("");

    const [tlpFilter, setTlpFilter] = useState("");
    const [tlps, setTlps] = useState([]);

    const [states, setStates] = useState([]);
    const [stateFilter, setStateFilter] = useState("");
     
    function updatePage(chosenPage){
        setCurrentPage(chosenPage);
    }  
    //ORDER
    useEffect( ()=> {
        getAllStates()
        .then((response) => {
            let stateOp = []
            response.map((item) => {
                stateOp.push({value: item.url, label: item.name})
            })
            console.log(stateOp)
            setStates(stateOp)
        })
        .catch((error)=>{
            console.log(error)
        })
        getAllPriorities()
        .then((response) => {
            let priorityOp = []
            response.map((item) => {
                priorityOp.push({value: item.url, label: item.name})
            })
            console.log(priorityOp)
            setPriorities(priorityOp)
            
        })
        .catch((error)=>{
            console.log(error)
        })

        getTLP()
            .then((response) => {
                let tlp = []
                response.data.results.map((item) => {
                    tlp.push({value: item.url, label: item.name})
                })
                setTlps(tlp)
            })
            .catch((error)=>{
                console.log(error)
            })
        //getCases(currentPage,priorityFilter+tlpFilter+stateFilter+wordToSearch, order) 
        getCases(currentPage,priorityFilter+tlpFilter+stateFilter+wordToSearch, order) 
            .then((response) => {
                setCases(response.data.results)
                setCountItems(response.data.count);
                // Pagination
                if(currentPage === 1){
                    setUpdatePagination(true)  
                }
                setDisabledPagination(false)
                
            })
            .catch((error) => {
            })
            .finally(() => {
                setShowAlert(true)
                console.log("entro")
                setLoading(false)
            })
        
    }, [currentPage, ifModify, order, wordToSearch, priorityFilter, tlpFilter, stateFilter])


    //-----------------MERGE------------------------
    const mergeConfirm = () => {
        setShowModal(true);
    }

    const merge = () => {
        const parent = selectedCases.shift();
        selectedCases.forEach(child => {
            console.log(`MERGE --> parent: ${parent} \n          child:${child} `)
            mergeCase(parent, child)
                .then(response => setIfModify(response))
                .catch(error => console.log(error))
                .finally(() => {
                    setSelectedCases([])
                    setShowModal(false)
                })
        });
    }

    return (
    <React.Fragment>
        <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)} component="case"/>
        <Row>
            <Navigation actualPosition={'Casos'}/>  
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col sm={1} lg={1}>
                              <ButtonFilter open={open} setOpen={setOpen} />
                            </Col>
                            <Col sm={1} lg={6}>
                                <Search type="caso" setWordToSearch={setWordToSearch} wordToSearch={wordToSearch} setLoading={setLoading}/> 
                            </Col>
                            <Col>
                                <Link to={{pathname:'/cases/create'}} >
                                    <CrudButton type='create' name='Caso' />
                                </Link>
                             
                                <Button 
                                    disabled={selectedCases.length > 1 ? false : true}
                                    size="lm"
                                    className='text-capitalize'
                                    variant='light'
                                    title='Mergear'
                                    onClick={() => mergeConfirm()}>
                                    <i variant='danger' className="fa fa-code-branch"/>
                                        Merge&nbsp;
                                    <Badge  
                                        className="badge mr-1" >
                                        {selectedCases.length} 
                                    </Badge>
                                </Button>  
                            </Col>
                        </Row>                        
                        <Row>
                            
                        </Row>
                        <br/>
                        <Collapse in={open}>
                            <div id="example-collapse-text">
                           
                            <Row>
                                <Col sm={4} lg={4}>
                                    <FilterSelectUrl options={priorities} itemName="prioridad" partOfTheUrl="priority" itemFilter={priorityFilter}  itemFilterSetter={setPriorityFilter} setLoading={setLoading} setCurrentPage={setCurrentPage}/>
                                </Col>
                                <Col sm={4} lg={4}>
                                    <FilterSelectUrl options={tlps} itemName="tlp" partOfTheUrl="tlp" itemFilter={tlpFilter}  itemFilterSetter={setTlpFilter} setLoading={setLoading} setCurrentPage={setCurrentPage}/>
                                </Col>
                                <Col sm={4} lg={4}>
                                    <FilterSelectUrl options={states} itemName="estados" partOfTheUrl="state" itemFilter={stateFilter}  itemFilterSetter={setStateFilter} setLoading={setLoading} setCurrentPage={setCurrentPage}/>
                                </Col>
                            </Row>
                            <br /> 
                            </div>
                        </Collapse> 
                    </Card.Header>
                    <Card.Body>
                        <TableCase list={cases} loading={loading} selectedCases={selectedCases} setSelectedCases={setSelectedCases} 
                                order={order}  setOrder={setOrder} setIfModify={setIfModify} setLoading={setLoading} currentPage={currentPage}/>
                    </Card.Body>
                    <Card.Footer >
                        <Row className="justify-content-md-center">
                            <Col md="auto"> 
                                <AdvancedPagination countItems={countItems} updatePage={updatePage} updatePagination={updatePagination} 
                                                    setUpdatePagination={setUpdatePagination} setLoading={setLoading} 
                                                    setDisabledPagination={setDisabledPagination} disabledPagination={disabledPagination} />
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
        <ModalConfirm type='merge' component='casos' name={selectedCases} showModal={showModal} onHide={() => setShowModal(false)} ifConfirm={() => merge()}/>

    </React.Fragment>
)}

export default ListCase; 
