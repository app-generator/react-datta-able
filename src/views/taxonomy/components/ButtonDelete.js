import React, { useState } from 'react';
import CrudButton from '../../../components/Button/CrudButton';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import { deleteTaxonomy } from '../../../api/services/taxonomies';


function ButtonDelete({taxonomy}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState(null);

  const removeTaxonomy = (taxonomy)=> {
    deleteTaxonomy(taxonomy.url, taxonomy.name)
    .then(() => {      
      window.location.href = '/app/taxonomies';
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
        <ModalConfirm type='delete' component='Taxonomia' name={taxonomy.name} showModal={show} onHide={() => handleClose()} ifConfirm={() => removeTaxonomy(taxonomy)}/>
    </>
  );
}

export default ButtonDelete;