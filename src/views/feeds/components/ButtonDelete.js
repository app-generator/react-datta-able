import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ButtonDelete({name}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <Button title='Eliminar' className="btn-icon btn-rounded" variant={'outline-danger'} onClick={handleShow} >
            <i className='fas fa-trash-alt'/>
        </Button> 
        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Eliminar {name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Corfirma la eliminación?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}> 
              Cancelar
            </Button>
            <Button variant="outline-danger" onClick={handleClose}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
}

export default ButtonDelete;