import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
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
            <Button title={feed.active ? "Activo": "Inactivo"} className="btn-icon btn-rounded" variant={feed.active ? 'outline-success': 'outline-danger'} onClick={handleShow} >
                <i className={feed.active ? 'fas fa-check' : 'fas fa-ban'}/>
            </Button>
            <Modal show={show} onHide={handleClose} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Modificar el estado {feed.active ? "Activo": "Inactivo"} </Modal.Title>
                </Modal.Header>
                <Modal.Body>{feed.active ? `Desea desactivar fuente de informacion ${feed.name}?` : `Desea activar fuente de informacion ${feed.name}?`}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}> 
                        Cancelar
                    </Button>
                    <Button variant={feed.active ? 'outline-danger' : 'outline-success'} onClick={changeState}>
                        {feed.active ? 'Desactivar' : 'Activar'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ButtonState;