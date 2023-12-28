import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Form, Spinner } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/Navigation/Navigation'
import { getTLP } from '../../api/services/tlp';
import Search from '../../components/Search/Search'
import Ordering from '../../components/Ordering/Ordering'

const ListTLP = () => {

    const [tlp, setTLP] = useState([]);
    const [error, setError] = useState(null);    
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true)
    const [showAlert, setShowAlert] = useState(false)
    const [wordToSearch, setWordToSearch]= useState('')

    const [order, setOrder] = useState("");

    const textareaStyle = {
        resize:"none", 
        backgroundColor:"transparent", 
        border:"none", 
        boxShadow: "none"
    }

    useEffect(() => {
        getTLP(wordToSearch, order).then((response) => {
            setTLP(response.data.results)         
        })
        .catch((error)=>{
           setError(error)
           setShowAlert(true)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [wordToSearch, order]);

    const resetShowAlert = () => {
        setShowAlert(false);
    }   

    return (
        <React.Fragment>
            <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>
            <Row>
                <Navigation actualPosition="TLP"/>
            </Row>
            <Row>
                <Col>             
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col>

                                    <div className="input-group">
                                        <Search type="por codigo" setWordToSearch={setWordToSearch} wordToSearch={wordToSearch} setLoading={setLoading} />
                                    </div>
                                </Col>                                  
                            </Row>                                                                           
                        </Card.Header>
                        <Card.Body>                            
                            <Table responsive hover className="text-center">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <Ordering field="code" label="Codigo" order={order} setOrder={setOrder} setLoading={setLoading}/>
                                        <th>Descripcion</th>
                                        <th>¿Cuando utilizarlo?</th>
                                        <th>¿Como compartirlo?</th>      
                                    </tr>
                                </thead>
                                <tbody>
                                    {tlp.map((item) => 
                                    {
                                        const parts = item.url.split("/");
                                        let itemNumber = parts[parts.length - 2];

                                    return(
                                        <tr key={itemNumber}>
                                            <th scope="row">{itemNumber}</th>
                                            <td><p className="p-3 mb-2 bg-dark rounded" style={{color: item.color}}><b>{item.information}</b></p></td>
                                            <td><Form.Control style={textareaStyle} as="textarea" rows={3} readOnly value={item.description} /></td>
                                            <td><Form.Control style={textareaStyle} as="textarea" rows={3} readOnly value={item.when} /></td>
                                            <td><Form.Control style={textareaStyle} as="textarea" rows={3} readOnly value={item.why} /></td> 
                                        </tr>
                                     )})}
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