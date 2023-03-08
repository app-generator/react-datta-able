import React, { useState } from 'react';
import { Row, Table, Spinner } from 'react-bootstrap';
import CrudButton from '../../../../components/Button/CrudButton';
import { getTask, deleteTask } from '../../../../api/services/tasks';
import { getPlaybook } from '../../../../api/services/playbooks';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../../../components/Modal/ModalConfirm';
import ModalDetailTask from '../Modal/ModalDetailTask'; 
import PriorityButton from '../../../../components/Button/PriorityButton'; 
import FormGetName from '../../../../components/Form/FormGetName';

const TableTask = ({callback, list, loading }) => {
    const [task, setTask] = useState('')
    const [error, setError] = useState(null)

    const [modalDelete, setModalDelete] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    const [url, setUrl] = useState(null)

    const [lastItem, setLastItem] = useState(null);

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    } 

    //Read Task
    const showTask = (url)=> {
        setUrl(url)
        setTask('')
        getTask(url)
        .then((response) => {
            setTask(response.data)
            console.log(response.data.contacts)
            setModalShow(true)
        })
        .catch(setError);
    };

    //Remove Task
    const Delete = (url) => {
        setLastItem(list.length === 1)
        setUrl(url);
        setModalDelete(true)
    }

    const removeTask = (url)=> {
        console.log(url)
        deleteTask(url)
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

    return (
            <React.Fragment>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Prioridad</th>
                            <th>Playbook</th>
                            <th>Descripcion</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((itemTask, index) => {
                            return (
                                <tr key={itemTask.url}>
                                    <th scope="row">{index+1}</th>
                                    <td>{itemTask.name}</td>
                                    <td><PriorityButton url={itemTask.priority}/></td>
                                    <td>
                                        <FormGetName form={false} get={getPlaybook} url={itemTask.playbook} key={index} />
                                    </td>
                                    <td>{itemTask.description}</td>                                    
                                    <td>
                                        <CrudButton type='read' onClick={() => showTask(itemTask.url)} />
                                        <Link to={{pathname:'/task/edit', state: itemTask}} >
                                            <CrudButton type='edit'/>
                                        </Link>
                                        <CrudButton type='delete' onClick={() => Delete(itemTask.url)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            <ModalDetailTask show={modalShow} task={task} onHide={() => setModalShow(false)}/>
            <ModalConfirm type='delete' component='Task' name={'nombre de la tarea'} showModal={modalDelete} onHide={() => setModalDelete(false)} ifConfirm={() => removeTask(url)}/>

        </React.Fragment> 
  );
};

export default TableTask;
