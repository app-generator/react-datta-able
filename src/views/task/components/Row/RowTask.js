import React from 'react';
import { Badge } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getTask, deleteTask } from '../../../../api/services/tasks';
import PriorityButton from '../../../../components/Button/PriorityButton';
import FormGetName from '../../../../components/Form/FormGetName';
import ModalDetailTask from '../Modal/ModalDetailTask';
import ModalConfirm from '../../../../components/Modal/ModalConfirm';
import CrudButton from '../../../../components/Button/CrudButton';
import { Link } from 'react-router-dom';
import ModalEditTask from '../Modal/ModalEditTask';

const RowTask = (props) => {  //url, key, taskDeleted,  setTaskDeleted, setTaskUpdated 
    
    const [task, setTask] = useState('');
    const [error, setError] = useState(null)

    const [modalShow, setModalShow] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)

    useEffect(() => {

        showTaskData(props.url)
        
    }, [props.url, props.taskDeleted]);
    
    //Read Task
    const showTaskData = (url) => {
        console.log('show task url: '+ url)

        getTask(url)
        .then((response) => {
            console.log(response.data)
            setTask(response.data)
        })
        .catch((error) => {
            console.log(error)
            setError(error)
        });
    }

    //Delete Task
    const removeTask = (url)=> {
        console.log('remove task url: '+ url)
        deleteTask(url)
            .then((response) => {
                console.log(response)
                props.setTaskDeleted(response)
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
        task && 
        <React.Fragment>
            <tr key={task.url}>
                <th scope="row">{props.key}</th>
                <td>{task.name}</td>
                <td><PriorityButton url={task.priority}/></td>
                <td>{task.url}</td>                                    
                <td>
                    <CrudButton type='read' onClick={() => setModalShow(true)} />
                    {/*<Link to={{pathname:'/task/edit', state: task}} >
                    </Link>*/}
                    <CrudButton type='edit' onClick={() => setModalEdit(true)}/>
                    <CrudButton type='delete' onClick={() => setModalDelete(true)} />
                </td>
            </tr>

            <ModalDetailTask show={modalShow} task={task} onHide={() => setModalShow(false)}/>
            <ModalEditTask show={modalEdit} task={task} onHide={() => setModalEdit(false)} ifEdit={props.setTaskUpdated} />
            <ModalConfirm showModal={modalDelete} type='delete' component='Task' name={task.url}  onHide={() => setModalDelete(false)} ifConfirm={() => removeTask(task.url)}/>

        </React.Fragment>
    );
};

export default RowTask; 
