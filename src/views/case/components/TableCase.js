import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Table, Modal, CloseButton, Spinner } from 'react-bootstrap';
import CrudButton from '../../../components/Button/CrudButton';
import { getCase, deleteCase } from '../../../api/services/cases';
import { getPriorities } from '../../../api/services/priorities';
import { getTLP } from '../../../api/services/tlp';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import BadgeItem from '../../../components/Button/BadgeItem';
import { getStates } from '../../../api/services/states'; 
import { getUser } from '../../../api/services/users';
import GetUserName from './GetUserName';

const TableCase = ({callback, list, loading }) => {
    
    const [cases, setCases] = useState('') 
    const [error, setError] = useState(null) 

    const [modalShow, setModalShow] = useState(false) 
    const [modalDelete, setModalDelete] = useState(false) 
    const [lastItem, setLastItem] = useState(null) 

    const [url, setUrl] = useState(null) 
    const [id, setId] = useState(null) 
    const [date, setDate] = useState(null) 


    const [prioritiesOption, setPrioritiesOption] = useState({}) 
    const [tlpOption, setTlpOption] = useState({}) 
    const [stateOption, setStateOption] = useState({}) 

    useEffect(() => {

        getPriorities()
            .then((response) => {
                console.log(response.data.results)

                let priorityOp = {}
                response.data.results.map((item) => {
                    priorityOp[item.url] = {name: item.name, color: item.color}
                })
                setPrioritiesOption(priorityOp)
            })
            .catch((error)=>{
                setError(error)
            })
        
        getTLP()
            .then((response) => {
                console.log(response.data.results)
                let tlpOp = {}
                response.data.results.map((item) => {
                    tlpOp[item.url] = {name: item.name, color: item.color}
                })
                setTlpOption(tlpOp)
            })
            .catch((error)=>{
                setError(error)
            })

        getStates('?page=1')
            .then((response) => {
                console.log(response.data.results)
                let stateOp = {}
                response.data.results.map((item) => {
                    stateOp[item.url] = {name: item.name}
                })
                setStateOption(stateOp)
            })
            .catch((error)=>{
                setError(error)
            })

    },[list]);

    console.log(list)


    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    }

    //Remove Case
    const Delete = (url) => {
        setLastItem(list.length === 1)
        setUrl(url)
        setModalDelete(true)
    }
    
    const removeCase = (url)=> {
        deleteCase(url)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error)
                setError(error)
            })
            .finally(() => {
                setModalDelete(false)
            })
        };
    
    return (
            <React.Fragment>
                <Table responsive hover className="text-center">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Fecha</th>
                            <th>Prioridad</th>
                            <th>TLP</th>
                            <th>Estado</th>
                            <th>Asignado</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((caseItem, index) => {
                            let datetime = caseItem.date.split('T');
                            datetime = datetime[0] + ' ' + datetime[1].slice(0,8)
                            let idItem = caseItem.url.split('/')[(caseItem.url.split('/')).length-2]
                             
                            return (
                                list &&
                                <tr key={caseItem.url}>
                                    <th scope="row">{idItem}</th>
                                    <td>{datetime}</td>
                                    <td>
                                        <BadgeItem item={prioritiesOption[caseItem.priority]}/>
                                    </td>
                                    <td>
                                        <BadgeItem item={tlpOption[caseItem.tlp]}/>
                                    </td>
                                    <td>{stateOption[caseItem.state].name}</td>
                                    {caseItem.assigned ? 
                                        <td>
                                            <GetUserName form={false} get={getUser} url={caseItem.assigned} key={index} />
                                        </td>
                                        :
                                        <td>
                                            Sin asignar
                                        </td> 
                                    }
                            
                                    <td>
                                        <Link to={{pathname:'/case/read', item: caseItem, priority: prioritiesOption, tlp: tlpOption, state: stateOption}} >
                                            <CrudButton type='read'/>
                                        </Link>
                                        <Link to={{pathname:'/case/edit', state: caseItem, callback: callback}} >
                                            <CrudButton type='edit'/>
                                        </Link>
                                        <CrudButton type='delete' onClick={() => Delete(caseItem.url)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            <ModalConfirm type='delete' component='Caso' name='el caso' showModal={modalDelete} onHide={() => setModalDelete(false)} ifConfirm={() => removeCase(url)}/>
        </React.Fragment> 
  );
};

export default TableCase;
