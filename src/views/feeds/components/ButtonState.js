import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ActiveButton from '../../../components/Button/ActiveButton';
import Modal from 'react-bootstrap/Modal';
import { putActivationStatus } from '../../../api/services/feeds';

function ButtonState({feed, callback}) {    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [error, setError] = useState(null);

    const changeState = ()=> {
        let message = feed.active ? `La fuente de informacion ${feed.name} ha sido desactivada` : `La fuente de informacion ${feed.name} ha sido activada`;
        putActivationStatus(feed.url, +!feed.active).then((response) => {
            console.log(response);
            callback(message, true)
        })
        .catch((error) => {
            setError(error);
            if(error){
              callback(message, false)
            }
          })
        .finally(()=>{
            handleClose();
        })
    };
    
    return(
        <>           
            <ActiveButton active={feed.active} onClick={handleShow} />
            <Modal show={show} onHide={handleClose} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Modificar el estado {feed.active ? "Activo": "Inactivo"} </Modal.Title>
                </Modal.Header>
                <Modal.Body>{feed.active ? `Desea desactivar fuente de informacion ${feed.name}?` : `Desea activar fuente de informacion ${feed.name}?`}?</Modal.Body>
                <Modal.Footer>                    
                    <Button variant={feed.active ? 'outline-danger' : 'outline-success'} onClick={changeState}>
                        {feed.active ? 'Desactivar' : 'Activar'}
                    </Button>
                    <Button variant="outline-secondary" onClick={handleClose}> 
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ButtonState;