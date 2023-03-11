import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Breadcrumb, Form, Spinner } from 'react-bootstrap';
import { getTLP } from '../../api/services/tlp';
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/navigation/navigation'


const ListTLP = () => {

    const [tlp, setTLP] = useState([]);
    const [error, setError] = useState(null);    
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true)
    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)

    const textareaStyle = {
        resize:"none", 
        backgroundColor:"transparent", 
        border:"none", 
        boxShadow: "none"
    }

    useEffect(() => {
        getTLP().then((response) => {
            setTLP(response.data.results);
            setError(null);
        })
        .catch((error)=>{
            if (error) {      
                setAlert({name:`Ups! Se produjo un error al buscar el protocolo de semaforo`, type:0})
            }
        })
        .finally(() => {
            setLoading(false)
        })
    }, []);

    //valores ingresados
    const searcher = (e) => {
        setSearch(e.target.value) //actualizar
    }

    //filtro
    let list = []
    if (!search) {
        list = tlp
    } else {
        list = tlp.filter( (item) => 
            item.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    }

    return (
        <React.Fragment>
            <Alert alert={alert} stateAlert={stateAlert} />
            <Row>
                <Navigation actualPosition="TLP"/>
            </Row>
            <Row>
                <Col>             
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col>
                                    <React.Fragment>
                                        <div className="input-group">
                                            <input value={search} onChange={searcher} type="text" id="m-search" className="form-control" placeholder="Buscar protocolo de semaforo . . ." />
                                            <span className="search-btn btn btn-primary">
                                                <i className="feather icon-search " />
                                            </span>
                                        </div>
                                    </React.Fragment>                           
                                </Col>                                  
                            </Row>                                                                           
                        </Card.Header>
                        <Card.Body>                            
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>#</th>                                        
                                        <th width="5%" >Codigo</th>
                                        <th>Descripcion</th>
                                        <th>¿Cuando utilizarlo?</th>
                                        <th>¿Como compartirlo?</th>      
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.sort((a,b) => a.code - b.code).map((item,i) => (
                                        <tr key={i}>
                                            <th scope="row">{i+1}</th>
                                            <td><p class="p-3 mb-2 bg-dark rounded" style={{color: item.color}}><b>{item.information}</b></p></td>
                                            <td><Form.Control style={textareaStyle} as="textarea" rows={3} readOnly value={item.description} /></td>
                                            <td><Form.Control style={textareaStyle} as="textarea" rows={3} readOnly value={item.when} /></td>
                                            <td><Form.Control style={textareaStyle} as="textarea" rows={3} readOnly value={item.why} /></td> 
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

export default ListTLP;