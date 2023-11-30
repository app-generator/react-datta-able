import React, { useState, useEffect } from 'react';
import { Row, Table, Spinner,Form } from 'react-bootstrap';
import CrudButton from '../../../components/Button/CrudButton';
import { getPlaybook, deletePlaybook } from '../../../api/services/playbooks';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import ModalDetailPlaybook from './ModalDetailPlaybook';
import { getTaxonomy } from '../../../api/services/taxonomies';
import Alert from '../../../components/Alert/Alert';

const TablePlaybook = ({setIsModify, list, loading, currentPage}) => {
    const [playbook, setPlaybook] = useState('')

    const [modalDelete, setModalDelete] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    const [url, setUrl] = useState(null)
    const [name, setName] = useState(null)
    const [listPlaybook, setlistPlaybook] = useState([])

    
    //Alert
    const [showAlert, setShowAlert] = useState(false);

    const textareaStyle = {
        resize:"none", 
        backgroundColor:"transparent", 
        border:"none", 
        boxShadow: "none"
    }

    useEffect( ()=> { 
        async function processList(list) {
            if (Array.isArray(list)) {
              try {
                const list4 = await Promise.all(
                  list.map(async (item) => {
                    const itemAux = { ...item };
                    const list3 = [];
          
                    for (const taxonomyItem of item.taxonomy) {
                      try {
                        const response = await getTaxonomy(taxonomyItem);
                        console.log(response.data.name);
                        list3.push(response.data.name);
                        console.log(list3);
                      } catch (error) {
                        console.error('Error:', error);
                      }
                    }
          
                    itemAux.taxonomy = list3;
                    return itemAux;
                  })
                );
          
                console.log(list4);
                setlistPlaybook(list4);
              } catch (error) {
                console.error('Error:', error);
              }
            } else {
              console.error('list is not an array:', list);
            }
          }
          
          // Llama a la función processList con tu lista
          processList(list);
    
    },[list])

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
            <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)} component="playbook"/>
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
                        { listPlaybook.map((book, index) => {
                            return (
                                <tr key={book.url}>
                                    <th scope="row">{ 1+index+10*(currentPage-1) }</th>
                                    <td>{book.name}</td>
                                    <td>

                                    <Form.Control style={textareaStyle} as="textarea" rows={3} readOnly value={book.taxonomy} />
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
