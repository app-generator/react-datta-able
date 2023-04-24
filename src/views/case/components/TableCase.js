import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Form, Table, Spinner } from 'react-bootstrap';
import CrudButton from '../../../components/Button/CrudButton';
import { deleteCase } from '../../../api/services/cases';
import { getPriorities } from '../../../api/services/priorities';
import { getTLP } from '../../../api/services/tlp';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import BadgeItem from '../../../components/Button/BadgeItem';
import { getStates } from '../../../api/services/states'; 
import { getUser } from '../../../api/services/users';
import GetUserName from './GetUserName';

const TableCase = ({setIfModify, list, loading, selectedCases, setSelectedCases }) => {
    
    const [url, setUrl] = useState(null) 
    const [modalDelete, setModalDelete] = useState(false)
    const [id, setId] = useState(null) 
        
    const [prioritiesOption, setPrioritiesOption] = useState({}) 
    const [tlpOption, setTlpOption] = useState({}) 
    const [stateOption, setStateOption] = useState({}) 
    
//checkbox
    const [isCheckAll, setIsCheckAll] = useState(false);
  
  
    useEffect(() => {

        getPriorities()
            .then((response) => {
                let priorityOp = {}
                response.data.results.map((item) => {
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

        getStates('?page=1')
            .then((response) => {
                let stateOp = {}
                response.data.results.map((item) => {
                    stateOp[item.url] = {name: item.name}
                })
                setStateOption(stateOp)
            })
            .catch((error)=>{
                console.log(error)
            })
        
    },[list]);

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
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
                console.log(response);
            })
            .catch((error) => {
                console.log(error)
                console.log(error)
            })
            .finally(() => {
                setModalDelete(false)
            })
        };

    ////////////////////////////////////////////////////
     
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
    
      console.log(selectedCases);
    
      ////////////////////////////////////////////////////

    return (
            <React.Fragment>
                <Table responsive hover className="text-center">
                    <thead>
                        <tr>
                            <th>
                                <Form.Group>
                                    <Form.Check custom type="checkbox" id={"selectAll"} 
                                        onChange={handleSelectAll} checked={selectedCases.length != 0 ? isCheckAll : false} /> {/*|| selectedCases == list.filter(item => item.solve_date == null).length */}
                                </Form.Group>
                            </th>
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
                                    <td>
                                        <Form.Group>
                                            <Form.Check disabled={caseItem.solve_date != null ? true : false} 
                                                type="checkbox" id={caseItem.url} 
                                                onChange={handleClick} checked={selectedCases.includes(caseItem.url)} />
                                        </Form.Group>
                                    </td>
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
                                        <Link to={{pathname:'/case/edit', state: caseItem}} >
                                            <CrudButton disabled={caseItem.solve_date != null ? true : false} type='edit'/>
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
