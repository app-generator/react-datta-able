import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ButtonState({state}) {    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const title = ["Inactivo", "Activo"];
    const variant = ['outline-danger', 'outline-success'];
    const className = ['fas fa-ban mx-1', 'fas fa-check mx-1'];

    return(
        <>
            <Button title={title[state]} className="btn-icon btn-rounded" variant={variant[state]} onClick={handleShow} >
                <i className={className[state]}/>
            </Button>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Modificar el estado {title[state]} </Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Corfirma la modificacion del estado?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}> 
                        Cancelar
                    </Button>
                    <Button variant="outline-warning" onClick={handleClose}>
                        Modiifcar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ButtonState;