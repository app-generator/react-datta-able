import React, { useState, useEffect } from 'react';
import { getEvidence } from '../../../api/services/evidences';
import { Button } from 'react-bootstrap';


const ViewFiles = (props) => {
    const [data, setData] = useState({})

    useEffect( ()=> { 
    
        getEvidence(props.url)
            .then((response) => {
                console.log(response.data)
                setData(response.data)
            })
            .catch();  

    },[])

    const openFile = () => {
        window.open(data.file, '_blank');
    }

    return (
        <Button 
            className='text-capitalize' 
            variant='light'
            title={'Evidencia '+ props.index} 
            onClick={openFile} 
            size="sm">
            <i class="fas fa-external-link-alt"/>
            {'Abrir Evidencia '+ props.index} 
        </Button>
    )
    }

export default ViewFiles
//<i className='fa fa-download' />