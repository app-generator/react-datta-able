import React from 'react';
import { Button } from 'react-bootstrap'; 

const ButtonFilter = ({open, setOpen}) => {

  return (
    <Button variant="primary" className='text-capitalize' size="sm" onClick={() => setOpen(!open)} aria-expanded={open}>
      <span className="material-icons">
        tune
      </span>
    </Button>
    
  );
}

export default ButtonFilter