import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Row, Form, Table, Spinner } from 'react-bootstrap';
import CrudButton from '../../../components/Button/CrudButton';
import { deleteCase } from '../../../api/services/cases';
import { getAllPriorities } from '../../../api/services/priorities';
import { getTLP } from '../../../api/services/tlp';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import BadgeItem from '../../../components/Button/BadgeItem';
import { getAllStates } from '../../../api/services/states'; 
import { getUser } from '../../../api/services/users';
import GetUserName from './GetUserName';
import Ordering from '../../../components/Ordering/Ordering'

const TableCase = ({setIfModify, list, loading, setLoading, selectedCases, setSelectedCases, setOrder , order, currentPage}) => {
    
    const [url, setUrl] = useState(null) 
    const [modalDelete, setModalDelete] = useState(false)
    const [id, setId] = useState(null) 
        
    const [prioritiesOption, setPrioritiesOption] = useState({}) 
    const [tlpOption, setTlpOption] = useState({}) 
    const [stateOption, setStateOption] = useState({}) 
    
    //checkbox
    const [isCheckAll, setIsCheckAll] = useState(false);
  
    //ORDER

    useEffect(() => {

        getAllPriorities()
            .then((response) => {
                let priorityOp = {}
                response.map((item) => {
                    priorityOp[item.url] = {name: item.name, color: item.color}
                })
                setPrioritiesOption(priorityOp)
                
            })
            .catch((error)=>{
                console.log(error)
            })
        
        getTLP()
            .then((response) => {
                let tlpOp = {}
                response.data.results.map((item) => {
                    tlpOp[item.url] = {name: item.name, color: item.color}
                })
                setTlpOption(tlpOp)
            })
            .catch((error)=>{
                console.log(error)
            })

        getAllStates()
            .then((response) => {
                let stateOp = {}
                response.map((item) => {
                    stateOp[item.url] = {name: item.name}
                })
                setStateOption(stateOp)
            })
            .catch((error)=>{
                console.log(error)
            })
        
    },[list]);

    const storageCaseUrl = (url) => {
        localStorage.setItem('case', url);    
    }

    //Remove Case
    const Delete = (url, id) => {
        setId(id)
        setUrl(url)
        setModalDelete(true)
    }
    
    const removeCase = (url)=> {
        deleteCase(url)
            .then((response) => {
                setIfModify(response)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setModalDelete(false)
            })
        };

    //Checkbox 
    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setSelectedCases(list.filter(item => item.solve_date == null).map(li => li.url));
        if (isCheckAll) {
            setSelectedCases([]);
        }
    };
    const handleClick = e => { 
        const { id, checked } = e.target;
        setSelectedCases([...selectedCases, id]);
        if (!checked) {
            setSelectedCases(selectedCases.filter(item => item !== id));
        }
    };
    return (
            <React.Fragment>
                <Table responsive hover className="text-center">
                    <thead>
                        <tr>
                            {list.length > 0 ?
                            <th>
                                <Form.Group>
                                    <Form.Check type="checkbox" id={"selectAll"} //lo que superpone es un parametro llamado custom
                                        onChange={handleSelectAll} checked={selectedCases.length != 0 ? isCheckAll : false} /> 
                                </Form.Group>
                            </th>
                            :
                            <th>
                                <Form.Group>
                                    <Form.Check custom type="checkbox" disabled />
                                </Form.Group>
                            </th>
                            }
                            <th>#</th>
                            <Ordering field="date" label="Fecha" order={order} setOrder={setOrder} setLoading={setLoading}/>
                            <Ordering field="priority" label="Prioridad" order={order} setOrder={setOrder} setLoading={setLoading}/>
                            <th>TLP</th>
                            <th>Estado</th>
                            <th>Asignado</th>
                            <th>Accion</th>
                            
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
                        list.map((caseItem, index) => {
                            let datetime = caseItem.date.split('T');
                            datetime = datetime[0] + ' ' + datetime[1].slice(0,8)
                            let idItem = caseItem.url.split('/')[(caseItem.url.split('/')).length-2]
                             
                            return (
                                list &&
                                <tr key={index}>
                                    <td>
                                        <Form.Group>
                                            <Form.Check disabled={caseItem.solve_date !== null ? true : false} 
                                                type="checkbox" id={caseItem.url} 
                                                onChange={handleClick} checked={selectedCases.includes(caseItem.url)} />
                                        </Form.Group>
                                    </td>
                                    <th scope="row">{ 1+index+10*(currentPage-1) }</th>
                                    <td>{datetime}</td>
                                    <td>
                                        <BadgeItem item={prioritiesOption[caseItem.priority]}/>
                                    </td>
                                    <td>
                                        <BadgeItem item={tlpOption[caseItem.tlp]}/>
                                    </td>
                                    <td>{stateOption[caseItem.state] ? stateOption[caseItem.state].name : "No se pudo asignar un estado"}</td>
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
                                        <Link to={{pathname:'/cases/view'}}>
                                            <CrudButton type='read' onClick={() => storageCaseUrl(caseItem.url)}/>
                                        </Link>
                                            <Link to={{pathname:'/cases/edit', state: caseItem.url}} >
                                            {caseItem.solve_date == null ? 
                                                <CrudButton type='edit'/>
                                                :   
                                                <Button 
                                                    id="button_hover"
                                                    className='btn-icon btn-rounded' 
                                                    variant='outline-light'
                                                    title='Caso resuelto'
                                                    style={{
                                                        border: "1px solid",
                                                        borderRadius: "50px",
                                                        color:"#F54901",
                                                      }} >
                                                <i className='fa fa-edit' style={{color: "#F54901"}} ></i>
                                                </Button>}
                                            </Link>
                                        <CrudButton type='delete' onClick={() => Delete(caseItem.url, idItem)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            <ModalConfirm type='delete' component='Caso' name={`el caso ${id}`} showModal={modalDelete} onHide={() => setModalDelete(false)} ifConfirm={() => removeCase(url)}/>
        </React.Fragment> 
  );
};

export default TableCase;
