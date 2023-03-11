import React, { useState } from 'react';
import { Row, Table, Spinner } from 'react-bootstrap';
import CrudButton from '../../../../components/Button/CrudButton';
import { getPlaybook, deletePlaybook } from '../../../../api/services/playbooks';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../../../components/Modal/ModalConfirm';
import ModalDetailPlaybook from '../Modal/ModalDetailPlaybook'; 
import FormGetName from '../../../../components/Form/FormGetName';
import { getTaxonomy } from '../../../../api/services/taxonomy';


const TablePlaybook = ({callback, list, loading }) => {
    const [playbook, setPlaybook] = useState('')
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

    //Read Playbook
    const showPlaybook = (url)=> {
        setUrl(url)
        setPlaybook('')
        getPlaybook(url)
        .then((response) => {
            setPlaybook(response.data)
            console.log(response.data.contacts)
            setModalShow(true)
        })
        .catch(setError);
    };

    //Remove Playbook
    const Delete = (url) => {
        setLastItem(list.length === 1)
        setUrl(url);
        setModalDelete(true)
    }

    const removePlaybook = (url)=> {
        console.log(url)
        deletePlaybook(url)
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
                                        <Link to={{pathname:'/playbook/edit', state: book}} >
                                            <CrudButton type='edit'/>
                                        </Link>
                                        <CrudButton type='delete' onClick={() => Delete(book.url)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            <ModalDetailPlaybook show={modalShow} playbook={playbook} onHide={() => setModalShow(false)}/>
            <ModalConfirm type='delete' component='Playbook' name={'nombre del playbook'} showModal={modalDelete} onHide={() => setModalDelete(false)} ifConfirm={() => removePlaybook(url)}/>

        </React.Fragment> 
  );
};

export default TablePlaybook;
