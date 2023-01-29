import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Button, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getFeeds } from '../../api/services/feeds';
import ButtonView from './components/ButtonView';
import ButtonDelete from './components/ButtonDelete';
import ButtonState from './components/ButtonState';
import Alert from '../../components/Alert/Alert';


const ListFeeds = () => {
    
    const [feeds, setFeeds] = useState([]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)
    
    useEffect(() => {
        if(sessionStorage.getItem('Alerta')) {
            const storage = JSON.parse(sessionStorage.getItem('Alerta'));
            setAlert(storage)
                setTimeout(() => {
                    setAlert(null)
                    setStateAlert(null)
                    sessionStorage.clear()
                }, 5000);
        }
        getFeeds()
        .then((response) => {
            setFeeds(response.data.results);
            setError(null);
        })
        .catch((error)=>{
            if (error) {      
                setAlert({name:`Ups! Se produjo un error al buscar las fuentes de informacion.`, type:0})
            }
        })
    }, []);
    
    const callbackBackend = (name, stateAlert) => {
        if(stateAlert) {
            getFeeds()
            .then((response) => {
                setFeeds(response.data.results)
                setError(null);
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => {
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
    
    //valores ingresados
    const searcher = (e) => {
        setSearch(e.target.value) //actualizar
    }

    //filtro
    let list = []
    if (!search) {
        list = feeds
    } else {
        list = feeds.filter( (item) => 
            item.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }
    
    return (
        <React.Fragment>
            <Alert alert={alert} stateAlert={stateAlert} />
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href='/app/dhasboard/default'>
                        <i className="fas fa-home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <b>Fuentes de Informacion</b> 
                    </Breadcrumb.Item>
                </Breadcrumb>    
            </Row>
            <Row>
                <Col>             
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col sm={12} lg={9}>
                                <React.Fragment>
                                        <div className="input-group">
                                            <input value={search} onChange={searcher} type="text" id="m-search" className="form-control" placeholder="Buscar fuente de informacion . . ." />
                                            <span className="search-btn btn btn-primary">
                                                <i className="feather icon-search " />
                                            </span>
                                        </div>
                                    </React.Fragment>                                 
                                </Col> 
                                <Col sm={12} lg={3}>
                                    <React.Fragment>
                                        <Button className="text-capitalize" variant='outline-primary' title='Agregar Fuente de Informacion' href="./feeds/new">
                                            <i className='fa fa-plus' />
                                            Agregar Fuente de Informacion
                                        </Button>
                                    </React.Fragment>                           
                                </Col>  
                            </Row>                                                                           
                        </Card.Header>
                        <Card.Body>                            
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Activo</th>
                                        <th>Descripcion</th>                                       
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.sort((a, b) => (a.name < b.name ? -1 : 1)).map((feed,i) => (
                                        <tr key={i}>
                                            <th scope="row">{i+1}</th>
                                            <td>{feed.name}</td>
                                            <td>
                                                <ButtonState feed={feed} callback={callbackBackend}></ButtonState>
                                            </td>
                                            <td>{feed.description}</td>
                                            <td>
                                                <ButtonView feed={feed}></ButtonView>
                                                <Link to={{pathname:"./feeds/edit", state: {feed}}} >
                                                    <Button title='Editar' className="btn-icon btn-rounded" variant={'outline-warning'} >
                                                        <i className='fas fa-edit'/>                                                    
                                                    </Button>
                                                </Link>    
                                                <ButtonDelete feed={feed} callback={callbackBackend}></ButtonDelete>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>            
        </React.Fragment>
    );
};

export default ListFeeds;
