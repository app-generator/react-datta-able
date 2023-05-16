import React, { useState } from 'react';
import { Row, Table, Spinner } from 'react-bootstrap';
import CrudButton from '../../../components/Button/CrudButton';
import { getPlaybook, deletePlaybook } from '../../../api/services/playbooks';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import ModalDetailPlaybook from './ModalDetailPlaybook';
import FormGetName from '../../../components/Form/FormGetName';
import { getTaxonomy } from '../../../api/services/taxonomies';
import Alert from '../../../components/Alert/Alert';

const TablePlaybook = ({setIsModify, list, loading }) => {
    const [playbook, setPlaybook] = useState('')

    const [modalDelete, setModalDelete] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    const [url, setUrl] = useState(null)
    const [name, setName] = useState(null)

    //Alert
    const [showAlert, setShowAlert] = useState(false);

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    } 

    //Read Playbook
    const showPlaybook = (url)=> {
        setUrl(url)
        setPlaybook('')
        getPlaybook(url)
        .then((response) => {
            setPlaybook(response.data)
            console.log(response.data)
            setModalShow(true)
        })
        .catch((error) => {
            console.log(error)
        })
    };

    //Remove Playbook
    const Delete = (url, name) => {
        setUrl(url);
        setName(name);
        setModalDelete(true)
    }

    const removePlaybook = (url, name)=> {
        deletePlaybook(url, name)
            .then((response) => {
                console.log(response.data)
                setIsModify(response)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                //ver si funciona bien
                setModalDelete(false)
                setShowAlert(true)
            })
    };

    return (
        <React.Fragment>
            <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)}/>
                <Table responsive hover className="text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Taxonomias</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((book, index) => {
                            return (
                                <tr key={book.url}>
                                    <th scope="row">{index+1}</th>
                                    <td>{book.name}</td>
                                    <td>
                                        {Object.values(book.taxonomy).map((taxonomyItem, index)=>{
                                            return (
                                                <><FormGetName form={false} get={getTaxonomy} url={taxonomyItem} key={index} /><br/></>
                                            )})
                                        }
                                    </td>
                                    <td>
                                        <CrudButton type='read' onClick={() => showPlaybook(book.url)} />
                                        <Link to={{pathname:'/playbooks/edit', state: book}} >
                                            <CrudButton type='edit'/>
                                        </Link>
                                        <CrudButton type='delete' onClick={() => Delete(book.url, book.name)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            <ModalDetailPlaybook show={modalShow} playbook={playbook} onHide={() => setModalShow(false)}/>
            <ModalConfirm type='delete' component='Playbook' name={name} showModal={modalDelete} onHide={() => setModalDelete(false)} ifConfirm={() => removePlaybook(url, name)}/>

        </React.Fragment> 
  );
};

export default TablePlaybook;
