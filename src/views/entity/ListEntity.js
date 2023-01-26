import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb, Card, Button } from 'react-bootstrap';
import TableEntity from '../../components/Table/TableEntity';
import CrudButton from '../../components/Button/CrudButton';
import { getEntities } from '../../api/services/entities';
import Alert from '../../components/Alert/Alert';
import { Link } from 'react-router-dom';

const ListEntity = () => {
    const [entities, setEntities] = useState([])
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)

    useEffect( ()=> {
        if(sessionStorage.getItem('Alerta')) {
            const storage = JSON.parse(sessionStorage.getItem('Alerta'));
            setAlert(storage)
                setTimeout(() => {
                    setAlert(null)
                    setStateAlert(null)
                    sessionStorage.clear()
                }, 5000);
        }

        getEntities()
        .then((response) => {
            setEntities(response.data.results)
        })
        .catch((error) => {
            setError(error)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])
    
    if (error) {
        console.log(error);
        return <p>Ups! Se produjo un error al buscar las entidades.</p>
    }

    //valores ingresados
    const searcher = (e) => {
        setSearch(e.target.value) 
        }
    //filtro
    let show = []
    if (!search) {
        show = entities
    } else {
        show = entities.filter( (item) => 
            item.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

    const callbackBackend = (name, stateAlert) => {
        if(stateAlert) {
            getEntities()
            .then((response) => {
                setEntities(response.data.results)
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
                setAlert({name:name, type:1})
                setTimeout(() => {
                    setAlert(null)
                    setStateAlert(null)
                }, 5000);
            })
        }
        else {
            setAlert({name:name, type:0})
        }
    }

return (
    <React.Fragment>
        <Row>
        <Alert alert={alert} stateAlert={stateAlert} />
            <Breadcrumb>
                <Breadcrumb.Item href="./app/dashboard/default"><i className="feather icon-home" /></Breadcrumb.Item>
                <Breadcrumb.Item active><b>Entidades</b></Breadcrumb.Item>
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
                                <Link to={{pathname:'/entity/create'}} >
                                    <CrudButton type='create' name='Entidad' />
                                </Link>
                            </Col> 
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <TableEntity callback={callbackBackend} list={show} loading={loading} />
                    </Card.Body>
                    <Card.Footer >
                        <Row className="justify-content-md-center">
                            <Col md="auto"> 
                                <Button> Paginacion </Button>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </React.Fragment>
)}
export default ListEntity