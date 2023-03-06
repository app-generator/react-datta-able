import React, { useState } from 'react';
import { Row, Col, Card, Form, Table, Modal, CloseButton, Spinner } from 'react-bootstrap';
import CrudButton from '../../../../components/Button/CrudButton';
import { getNetwork, deleteNetwork, isActive } from '../../../../api/services/networks';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../../../components/Modal/ModalConfirm';
import ActiveButton from '../../../../components/Button/ActiveButton';
import ModalDetailNetwork from '../Modal/ModalDetailNetwork';
import FormNetwork_Entity from '../Form/FormNetwork_Entity';

const TableNetwork = ({callback, list, loading }) => {
    const [network, setNetwork] = useState('')
    const [error, setError] = useState(null)

    const [modalDelete, setModalDelete] = useState(false)
    const [modalState, setModalState] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [contacts, setContacts] = useState([''])


    const [url, setUrl] = useState(null)
    const [cidr, setCidr] = useState(null)
    const [active,setActive] = useState(null)

    const [lastItem, setLastItem] = useState(null);

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    } 

    //Read Network
    const showNetwork = (url)=> {
        setUrl(url)
        setNetwork('')
        getNetwork(url)
        .then((response) => {
            setNetwork(response.data)
            setContacts(Object.keys(response.data.contacts))
            console.log(response.data.contacts)
            setModalShow(true)
        })
        .catch(setError);
    };

    //Update Network
    const pressActive = (cidr, active, url) => {
        setUrl(url)
        setCidr(cidr)
        setActive(active)
        setModalState(true)
    }
    const switchState = ()=> {
        isActive(url, !active) //+!active si el estado es int
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
                setError(error)
            })
            .finally(() => {
                callback(false)
                setModalState(false)
                setModalShow(false)
            })
    };

    //Remove Network
    const Delete = (url) => {
        setLastItem(list.length === 1)
        setUrl(url);
        setModalDelete(true)
    }

    const removeNetwork = (url)=> {
        console.log(url)
        deleteNetwork(url)
            .then((response) => {
                console.log(response)
                callback(lastItem)
            })
            .catch((error) => {
                console.log(error)
                setError(error)
                callback(false) //error si no se puede eliminar el ultimo
            })
            .finally(() => {
                setModalDelete(false)
            })
    };

    if (error) {
        console.log(error);
        return <p>Ups! Se produjo un error al buscar la red.</p>
    }
console.log(network.network_entity)
    return (
            <React.Fragment>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>CIDR</th>
                            <th>Tipo</th>
                            <th>Activo</th>
                            <th>Entidad</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((network, index) => {
                            return (
                                <tr key={network.url}>
                                    <th scope="row">{index+1}</th>
                                    <td>{network.cidr}</td>
                                    <td>{network.type === 'internal' ? 'Interna' : 'Externa'}</td>
                                    <td>
                                        <ActiveButton active={+network.active} onClick={() => pressActive(network.domain, network.active, network.url)} />
                                    </td>
                                    <td><FormNetwork_Entity url={network.network_entity}/></td>
                                    <td>
                                        <CrudButton type='read' onClick={() => showNetwork(network.url)} />
                                        <Link to={{pathname:'/network/edit', state: network}} >
                                            <CrudButton type='edit'/>
                                        </Link>
                                        <CrudButton type='delete' onClick={() => Delete(network.url)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            <ModalDetailNetwork show={modalShow} network={network} onHide={() => setModalShow(false)}/>
            <ModalConfirm type='delete' component='Red' name={cidr} showModal={modalDelete} onHide={() => setModalDelete(false)} ifConfirm={() => removeNetwork(url)}/>
            <ModalConfirm type='editState' component='Red' name={cidr} state={active} showModal={modalState} onHide={() => setModalState(false)} ifConfirm={() => switchState(url, active)}/>

        </React.Fragment> 
  );
};

export default TableNetwork;
