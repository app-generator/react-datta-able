import React, { useState, useEffect } from 'react';
import { Row, Table, Spinner } from 'react-bootstrap';
import CrudButton from '../../../../components/Button/CrudButton';
import { getTask, deleteTask } from '../../../../api/services/tasks';
import { getPlaybook } from '../../../../api/services/playbooks';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../../../components/Modal/ModalConfirm';
import ModalDetailTask from '../Modal/ModalDetailTask'; 
import PriorityButton from '../../../../components/Button/PriorityButton'; 
import FormGetName from '../../../../components/Form/FormGetName';
import RowTask from '../Row/RowTask';

const TableTask = ({ tasksOfPlaybook, setTaskDeleted}) => {

    const [error, setError] = useState(null)

    useEffect( ()=> {

    }, [tasksOfPlaybook, setTaskDeleted])

    if (error) {
        console.log(error);
        return <p>Ups! Se produjo un error al buscar la tarea.</p>
    }

    return (
        <React.Fragment>
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Prioridad</th>
                        <th>Descripcion</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {tasksOfPlaybook ? tasksOfPlaybook.map((urlTask, index) => {
                        return (
                            <RowTask url={urlTask} key={index+1} setTaskDeleted={setTaskDeleted} />)
                        }) : <></>
                    }
                </tbody>
            </Table>
        </React.Fragment> 
  );
};

export default TableTask;
