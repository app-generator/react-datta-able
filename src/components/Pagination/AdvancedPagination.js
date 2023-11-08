import Pagination from 'react-bootstrap/Pagination';
import React, { useState, useEffect } from 'react';

const AdvancedPagination = ({ countItems, updatePage,updatePagination, setUpdatePagination, parentCurrentPage = -1 }) => {

  const [currentPage, setCurrentPage ] = useState(1); 
  const [initPage, setInitPage] = useState(1);

  // lastPage represents the last page or the total of pages, 10 represents the number of items per page
  const [lastPage, setLastPage] = useState(1);

  // arrayPages represents the array of pages to display in view
  const [arrayPages, setArrayPages] = useState([]);

  useEffect(() => { 

    // First time to set lastPage
    if (updatePagination) {// no se actualiza por lastpage
      setLastPage(Math.ceil(countItems / 10));
      setUpdatePagination(false)
    }

    if (parentCurrentPage ===-1) {

      let list = []
      let index = initPage;

      // Array of pages only display 3 numbers 
      while (index <= lastPage && index <= (initPage + 3) ) {
        list.push(index);
        ++index;
      }
      setArrayPages(list);

    } else {

      if (!arrayPages.includes(parentCurrentPage)){
        console.log("No existe la pagina en el array");
      }

    }
   
  }, [countItems, lastPage, updatePagination]);

  const updateCurrentPage = (chosenPage) => { 
    setCurrentPage(chosenPage);
    updatePage(chosenPage);
  }

  const arrayPagesPrev = () => {
    let prev = currentPage - 1;
    if (!arrayPages.includes(prev)){
      let newArrayPages = arrayPages.map(num => num - 1);
      setArrayPages(newArrayPages);
    }
    setCurrentPage(prev);
    updatePage(prev);
  }

  const arrayPagesNext = () => {
    let next = currentPage + 1;
    if (!arrayPages.includes(next)){
      let newArrayPages = arrayPages.map(num => num + 1);
      setArrayPages(newArrayPages);
    }
    setCurrentPage(next);
    updatePage(next);
  }

  return (
      <Pagination>
        <Pagination.First onClick={() => updateCurrentPage(1)}/>
        {currentPage === 1 ? 
          <Pagination.Prev disabled/>
        : 
          <Pagination.Prev onClick={() => arrayPagesPrev()}/>
        }
          {arrayPages.map(page => (
            (page === currentPage) ? 
              <Pagination.Item key={page} onClick={() => updateCurrentPage(page)} active>{page}</Pagination.Item>
            : <Pagination.Item key={page} onClick={() => updateCurrentPage(page)}>{page}</Pagination.Item>
        ))}
        {currentPage === lastPage ? 
          <Pagination.Next disabled/>      
        :
          <Pagination.Next onClick={() => arrayPagesNext()}/>
        }   
        <Pagination.Last onClick={() => updateCurrentPage(lastPage)}/> 
      </Pagination>
  );
}
  
export default AdvancedPagination;
