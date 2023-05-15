import React, { useState } from 'react';
import ActiveButton from '../../../components/Button/ActiveButton';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import { putActivationStatus } from '../../../api/services/feeds';

function ButtonState({feed}) {    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [error, setError] = useState(null);

    const changeState = (feed)=> {        
        putActivationStatus(feed.url, !feed.active, feed.name)
        .then(() => {
            window.location.href = '/feeds';
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
            <ActiveButton active={feed.active} onClick={handleShow} />
            <ModalConfirm type='editState' component='Fuente de Informacion' name={feed.name} state={feed.active} showModal={show} onHide={() => handleClose()} ifConfirm={() => changeState(feed)}/>
        </>
    );
}

export default ButtonState;