import React, { useState } from 'react';
import CrudButton from '../../../components/Button/CrudButton';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import { deleteFeed } from '../../../api/services/feeds';


function ButtonDelete({feed}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState(null);

  const removeFeed = (feed)=> {
    deleteFeed(feed.url).then((response) => {
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
        <ModalConfirm type='delete' component='Fuente de Informacion' name={feed.name} showModal={show} onHide={() => handleClose()} ifConfirm={() => removeFeed(feed)}/>
    </>
  );
}

export default ButtonDelete;