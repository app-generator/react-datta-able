import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteFeed } from '../../../api/services/feeds';
import CrudButton from '../../../components/Button/CrudButton';

function ButtonDelete({feed}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState(null);

  const removeFeed = ()=> {
    deleteFeed(feed.url, feed.name).then((response) => {
      console.log(response);
      window.location.href = '/app/feeds';
    })
    .catch((error) => {
      setError(error);
    })
   .finally(()=>{
      handleClose();
    })
  };

  return (
    <>
        <CrudButton type='delete' onClick={handleShow} />
        <Modal show={show} onHide={handleClose} centered >
          <Modal.Header closeButton>
            <Modal.Title>Eliminar {feed.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Corfirma la eliminación?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={removeFeed}>
              Eliminar
            </Button>
            <Button variant="outline-secondary" onClick={handleClose}> 
              Cancelar
            </Button>            
          </Modal.Footer>
        </Modal>
    </>
  );
}

export default ButtonDelete;