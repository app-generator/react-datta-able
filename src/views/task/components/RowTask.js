import React from 'react';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getTask, deleteTask } from '../../../api/services/tasks';
import PriorityButton from '../../../components/Button/PriorityButton';
import ModalDetailTask from './ModalDetailTask';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import CrudButton from '../../../components/Button/CrudButton';
import ModalEditTask from './ModalEditTask';

const RowTask = (props) => {  //url, key, taskDeleted,  setTaskDeleted, setTaskUpdated 
    
    const [task, setTask] = useState('');
    const [error, setError] = useState(null)

    const [modalShow, setModalShow] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)

    const [row, setRow] = useState(1); //tamano del textarea

    useEffect(() => {

        showTaskData(props.url)
        
    }, [props.url, props.taskDeleted, props.taskUpdated]);

    //Read Task
    const showTaskData = (url) => {
        console.log('show task url: '+ url)

        getTask(url)
        .then((response) => {
            console.log(response.data)
            setTask(response.data)
            setRow(response.data.description.length / 20);
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

    const textareaStyle = {
        resize:"none", 
        backgroundColor:"transparent", 
        border:"none", 
        boxShadow: "none"
    }


return (
        task && 
        <React.Fragment>
            <tr key={task.url}>
                <th scope="row">{props.id}</th>
                <td>{task.name}</td>
                <td>
                    <PriorityButton url={task.priority}/>
                </td>
                <td>
                    <Form.Control readOnly value={task.description === null ? "No tiene descripcion" : task.description} style={textareaStyle} as="textarea" rows={row}/>
                </td>                                    
                <td>
                    <CrudButton type='read' onClick={() => setModalShow(true)} />
                    <CrudButton type='edit' onClick={() => setModalEdit(true)}/>
                    <CrudButton type='delete' onClick={() => setModalDelete(true)} />
                </td>
            </tr>

            <ModalDetailTask show={modalShow} task={task} onHide={() => setModalShow(false)}/>
            <ModalEditTask show={modalEdit} task={task} onHide={() => setModalEdit(false)} ifEdit={props.setTaskUpdated} />
            <ModalConfirm showModal={modalDelete} type='delete' component='Task' name={task.name}  onHide={() => setModalDelete(false)} ifConfirm={() => removeTask(task.url, task.name)}/>

        </React.Fragment>
    );
};

export default RowTask; 
