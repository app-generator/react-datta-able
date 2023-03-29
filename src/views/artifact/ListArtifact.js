import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert'; 

import TableArtifact from './TableArtifact';

import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import Search from '../../components/Search/Search';

const ListArtifact = ({artifact}) => {
    
    

return (
    <React.Fragment>
        


                <Card>
                    <Card.Header>
                        <Row>
                            <Col sm={12} lg={3}>
                               
                            </Col> 
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        {/*<TableArtifact artifact={artifact}/>*/}
                    </Card.Body>
                </Card>

    </React.Fragment>
)}
export default ListArtifact