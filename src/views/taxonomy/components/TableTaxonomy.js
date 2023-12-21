import React from 'react';
import { useState } from 'react';
import { Row, Table, Spinner } from 'react-bootstrap';
import CrudButton from '../../../components/Button/CrudButton';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import ButtonView from './ButtonView'
import ButtonState from './ButtonState';
import { deleteTaxonomy } from '../../../api/services/taxonomies';
import Ordering from '../../../components/Ordering/Ordering'


const TableTaxonomy = ({setIsModify, list, loading, order, setOrder, setLoading, currentPage}) => {
    const [modalDelete, setModalDelete] = useState(false) 
    const [url, setUrl] = useState(null) 
    const [name, setName] = useState(null) 

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    }
    
    // Remove Taxonomy
    const Delete = (url, name) => {
        setUrl(url)
        setName(name)
        setModalDelete(true)
    }
    
    const removeTaxonomy = (url, name)=> {
        deleteTaxonomy(url, name)
            .then((response) => {
                setIsModify(response)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setModalDelete(false)
            })
        };
    
    
    return (
            <React.Fragment>
                <Table responsive hover className="text-center">
                    <thead>
                        <tr>
                            <th>#</th>  
                            <Ordering field="name" label="Nombre" order={order} setOrder={setOrder} setLoading={setLoading} />
                            <th>Activo</th>     
                            <th>Reportes</th>                                                                         
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((taxonomy,index) =>{ 
                            const parts = taxonomy.url.split("/");
                            let itemNumber = parts[parts.length - 2];
                        return(
                            <tr key={itemNumber}>
                                <th scope="row">{ 1+index+10*(currentPage-1) }</th>
                                <td>{taxonomy.name}</td>
                                <td>
                                    <ButtonState taxonomy={taxonomy}></ButtonState>
                                </td>                                           
                                <td>{taxonomy.reports.length}</td>
                                <td>
                                    <ButtonView taxonomy={taxonomy}></ButtonView> 
                                    <Link to={{pathname:"./taxonomies/edit", state:taxonomy}} >
                                        <CrudButton type="edit" />                                                    
                                    </Link>                                               
                                    <CrudButton type='delete' onClick={() => Delete(taxonomy.url, taxonomy.name)} />
                                </td>
                            </tr>
                        )})}
                    </tbody>
                </Table>
            
            <ModalConfirm type='delete' component='Taxonomia' name={name} showModal={modalDelete} onHide={() => setModalDelete(false)} ifConfirm={() => removeTaxonomy(url, name)}/>
        </React.Fragment> 
  );
};

export default TableTaxonomy;
