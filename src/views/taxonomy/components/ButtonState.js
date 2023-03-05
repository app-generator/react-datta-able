import React, { useState } from 'react';
import ActiveButton from '../../../components/Button/ActiveButton';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import { putActivationStatus } from '../../../api/services/taxonomy';

function ButtonState({taxonomy}) {    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [error, setError] = useState(null);

    const changeState = (taxonomy)=> {        
        putActivationStatus(taxonomy.url, !taxonomy.active, taxonomy.name).then((response) => {
            console.log(response);
            window.location.href = '/app/taxonomy';
        })
        .catch((error) => {
            setError(error);           
          })
        .finally(()=>{
            handleClose();
        })
    };
    
    return(
        <>           
            <ActiveButton active={+taxonomy.active} onClick={handleShow} />
            <ModalConfirm type='editState' component='Taxonomia' name={taxonomy.name} state={+taxonomy.active} showModal={show} onHide={() => handleClose()} ifConfirm={() => changeState(taxonomy)}/>
        </>
    );
}

export default ButtonState;