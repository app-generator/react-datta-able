import React, { useState, useEffect } from 'react';
import { Spinner, Row, Table } from 'react-bootstrap';
import ActiveButton from '../../../components/Button/ActiveButton';
import CrudButton from '../../../components/Button/CrudButton';
import { Link } from 'react-router-dom';
import ButtonState from './ButtonState';
import ButtonView from './ButtonView';
import ButtonDelete from './ButtonDelete';


const TableFeed = ({ setOrder, list, loading, setLoading }) => {
    //ORDER
    const blu = 'royalblue'//'#04A9F5';
    const [arrowDirection, setArrowDirection] = useState({id: 'up', name: 'up'});
    const [arrowStyle, setArrowStyle] = useState({id: `${blu}`, name: 'grey'});

    useEffect(() => {
    },[list]);

    //ORDENAMIENTO
    const orderBy = (str) => {
        if(arrowStyle[str] === 'grey'){
            setArrowStyle({id: 'grey', name: 'grey', [str]: blu});
        } else {
            setArrowDirection({...arrowDirection, [str]: arrowDirection[str] === 'up' ? 'down' : 'up'});
        }
        setOrder(arrowDirection[str] === 'up' ? `-${str}` : `${str}`)

        //setLoading(true);
        
    }


    const storageFeedUrl = (url) => {
        localStorage.setItem('feed', url);    
    }

    return (
            <React.Fragment>
                <Table responsive hover className="text-center">
                    <thead>
                        <tr>
                            <th>Id
                                <a href="#" id="sort-arrow" onClick={() => orderBy('id')}>
                                    <i className={`sm feather icon-arrow-${arrowDirection.id}`} style={{color:`${arrowStyle.id}`}}></i>
                                </a>
                            </th>
                            <th>Nombre
                                <a href="#" id="sort-arrow" onClick={() => orderBy('name')}>
                                    <i className={`sm feather icon-arrow-${arrowDirection.name}`} style={{color:`${arrowStyle.name}`}}></i>
                                </a>
                            </th>
                            <th>Activo</th>
                            <th>Casos Asociados</th>                                                                                  
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? 
                        <tr>
                            <td colSpan="7">
                                <Row className="justify-content-md-center">
                                    <Spinner animation="border" variant="primary" size="sm" />
                                </Row>
                            </td>
                        </tr>
                        :
                            list.map((feed,i) => { 
                                let idItem = feed.url.split('/')[(feed.url.split('/')).length-2];
                                return (
                                    list &&
                                <tr key={i}>
                                    <th scope="row">{idItem}</th>
                                    <td>{feed.name}</td>
                                    <td>
                                        <ButtonState feed={feed}></ButtonState>
                                    </td>
                                    <td>24256</td>
                                    <td>
                                        <ButtonView feed={feed}></ButtonView> 
                                        <Link to={{pathname:"./feeds/edit", state:feed}} > 
                                            <CrudButton type="edit" />                                                    
                                        </Link>    
                                        <ButtonDelete feed={feed}></ButtonDelete>
                                    </td>
                                </tr>
                                );    
                            })
                        }
                    </tbody>
                </Table>
        </React.Fragment> 
  );
};

export default TableFeed;