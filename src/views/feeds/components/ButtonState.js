import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putActivationStatus } from '../../../api/services/feeds';

function ButtonState({feed}) {    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const title = ["Inactivo", "Activo"];
    const variant = ['outline-danger', 'outline-success'];
    const className = ['fas fa-ban mx-1', 'fas fa-check mx-1'];
    const [error, setError] = useState(null);

    const changeState = (id, state)=> {
        putActivationStatus(id, +!state).then((response) => {
            console.log(response);      
            handleClose();
        })
        .catch((error) => {
            setError(error);
        })
        .finally(()=>{
            window.location.reload();
        })
    };

    if (error) {
        console.log(error);
        return <p>Ups! Se produjo un error al buscar el protocolo de semaforo.</p>
    }

    return(
        <>
            <Button title={title[feed.active]} className="btn-icon btn-rounded" variant={variant[feed.active]} onClick={handleShow} >
                <i className={className[feed.active]}/>
            </Button>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Modificar el estado {title[feed.active]} </Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Corfirma la modificacion del estado?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}> 
                        Cancelar
                    </Button>
                    <Button variant="outline-warning" onClick={()=> changeState(feed.url.split("/")[6], feed.active)}>
                        Modiifcar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ButtonState;