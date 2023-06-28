import React, { useState, useEffect } from 'react';
import { getEvidence, deleteEvidence } from '../../api/services/evidences';
import { Badge, Button } from 'react-bootstrap';
import CrudButton from './../Button/CrudButton';

const ViewFiles = (props) => {
    const [data, setData] = useState({})

    useEffect( ()=> { 
    
        /*getEvidence(props.url)
            .then((response) => {
                console.log(response.data)
                setData(response.data)
            })
            .catch();  
*/
    },[])

    const openFile = () => {
        window.open(data.file, '_blank');
    }

    const deleteFile = () => {
        deleteEvidence(props.url)
            .then((response) => {
                console.log(response.data)
                //no mostrar button
            })
            
    }

    return (
        <>
            <Button 
                className='text-capitalize' 
                variant='light'
                title={'Evidencia '+ props.index} 
                onClick={openFile} 
                size="sm">
                <i class="fas fa-external-link-alt"/>
                {'Abrir Evidencia '+ props.index + '  '} 
                
            </Button>
    <Button 
            size='sm'
            className='btn-icon btn-rounded' 
            variant='outline-danger'
            title={'Eliminar evidencia '+ props.index}
            onClick={deleteFile}>
                <i className='fas fa-trash-alt' />
        </Button> 
        </>
        
    )
    }

export default ViewFiles;
/*
            <Badge 
                    variant='danger'
                    title={'Eliminar evidencia '+ props.index}
                    onClick={deleteFile}>
                        <i className='fas fa-trash-alt' />
                </Badge> 
*/
/* EL DEL MERGE
<Col> 
                                <Button 
                                    disabled={selectedCases.length > 1 ? false : true}
                                    size="sm"
                                    className='text-capitalize'
                                    variant='light'
                                    title='Mergear'
                                    onClick={() => mergeConfirm()}>
                                    <i variant='danger' className="fa fa-code-branch"/>
                                        Merge&nbsp;
                                    <Badge  
                                        className="badge mr-1" >
                                        {selectedCases.length} 
                                    </Badge>
                                </Button>                                
                            </Col> 

*/