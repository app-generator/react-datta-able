import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    
    <ButtonGroup> 
        {pageNumbers.map(number => (
            <Button variant='light' key={number} className='page-item page-link' onClick={() => paginate(number)} Link={'!#'}>{number}</Button>
        ))}
    </ButtonGroup>
    
  );
};

export default Pagination;