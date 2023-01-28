import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putActivationStatus } from '../../../api/services/feeds';

function ButtonState({feed, callback}) {    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const title = ["Inactivo", "Activo"];
    const variant = ['outline-danger', 'outline-success'];
    const className = ['fas fa-ban mx-1', 'fas fa-check mx-1'];
    const [error, setError] = useState(null);

    const changeState = (url, state)=> {
        let message = state ? `La fuente de informacion ${feed.name} ha sido desactivada` : `La fuente de informacion ${feed.name} ha sido activada`;
        putActivationStatus(url, +!state).then((response) => {
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
            <Button title={title[feed.active]} className="btn-icon btn-rounded" variant={variant[feed.active]} onClick={handleShow} >
                <i className={className[feed.active]}/>
            </Button>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Modificar el estado {title[feed.active]} </Modal.Title>
                </Modal.Header>
                <Modal.Body>{feed.active ? `Desea desactivar fuente de informacion ${feed.name}?` : `Desea activar fuente de informacion ${feed.name}?`}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}> 
                        Cancelar
                    </Button>
                    <Button variant={feed.active ? 'outline-danger' : 'outline-success'} onClick={()=> changeState(feed.url, feed.active)}>
                        {feed.active ? 'Desactivar' : 'Activar'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ButtonState;