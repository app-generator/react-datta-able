import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteFeed } from '../../../api/services/feeds';

function ButtonDelete({feed}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState(null);

  const removeFeed = (id)=> {
    deleteFeed(id).then((response) => {
        console.log(response);      
        handleClose();
    })
    .catch(setError);
    return window.location.reload();
  };

  if (error) {
    console.log(error);
    return <p>Ups! Se produjo un error al buscar el protocolo de semaforo.</p>
  }

  return (
    <>
        <Button title='Eliminar' className="btn-icon btn-rounded" variant={'outline-danger'} onClick={handleShow} >
            <i className='fas fa-trash-alt'/>
        </Button> 
        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Eliminar {feed.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Corfirma la eliminación?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}> 
              Cancelar
            </Button>
            <Button variant="outline-danger" onClick={()=> removeFeed(feed.url.split("/")[6])}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
}

export default ButtonDelete;