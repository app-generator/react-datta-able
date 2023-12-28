import React,{ useState, useEffect }from 'react'
import {
    Card, Table , Row , Spinner
 } from 'react-bootstrap';

 import { getAllStates } from '../../../../api/services/states'; 
 import { getAllPriorities } from '../../../../api/services/priorities';
import { getTLP } from '../../../../api/services/tlp';

import BadgeItem from '../../../../components/Button/BadgeItem';

import { Link } from 'react-router-dom';
import GetUserName from '../../../case/components/GetUserName';
import CrudButton from '../../../../components/Button/CrudButton';
import { getUser } from '../../../../api/services/users';

const DashboardCases = ({list, loading}) => {
    const [prioritiesOption, setPrioritiesOption] = useState({}) 
    const [tlpOption, setTlpOption] = useState({}) 
    const [stateOption, setStateOption] = useState({}) 

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
  return (
    <div>
        <Card>
            <Card.Header>
                <Card.Title as="h5">Panel de casos</Card.Title>
            </Card.Header>
            <Card.Body className="text-center">
                <Table responsive hover className="text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>uuid</th>
                            <th>Estado</th>
                            <th>Asignado</th>
                            <th>Cantidad de eventos</th>
                            <th>Accion</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    
                    { loading ? 
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
                                    
                                    <th scope="row">{ index +1 }</th>
                                    <td>{caseItem.uuid}</td>
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
                                    <td>-</td>
                                    <td>
                                        <Link to={{pathname:'/cases/view'}}>
                                            <CrudButton type='read' onClick={() => storageCaseUrl(caseItem.url)}/>
                                        </Link>
                                            
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>

    </div>
  )
}

export default DashboardCases