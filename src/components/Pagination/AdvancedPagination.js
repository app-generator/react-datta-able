import Pagination from 'react-bootstrap/Pagination';
import React, { useState, useEffect } from 'react';

const AdvancedPagination = ({ countItems, updatePage, updatePagination, setUpdatePagination, setLoading, disabledPagination, setDisabledPagination,parentCurrentPage = -1 }) => {

  const [currentPage, setCurrentPage ] = useState(1); 
  const [initPage, setInitPage] = useState(1);

  // lastPage represents the last page or the total of pages, 10 represents the number of items per page
  const [lastPage, setLastPage] = useState(1);

  // arrayPages represents the array of pages to display in view
  const [arrayPages, setArrayPages] = useState([]);

  useEffect(() => { 
    console.log("entra al useeffect")
    // First time to set lastPage
    if (updatePagination && currentPage ===1) {// no se actualiza por lastpage
      setLastPage(Math.ceil(countItems / 10));
      setUpdatePagination(false)
      setInitPage(1)
      setCurrentPage(1) 
      //setLoading(true)
    }

    if (parentCurrentPage ===-1) {

      let list = []
      let index
      console.log(lastPage)
      if(lastPage >= 4){
        index = lastPage-currentPage >= 4 ? currentPage : lastPage-3 ;
      }else{
        index = initPage
      }
      //let index = initPage ;

      // Array of pages only display 3 numbers 
      while (index <= lastPage && index <= (currentPage + 3)  ) {
      //while (index <= lastPage && index <= (initPage + 3)  ) {
        list.push(index);
        ++index;
      }
      setArrayPages(list);
      console.log(arrayPages)

    } else {

      if (!arrayPages.includes(parentCurrentPage)){
        console.log("No existe la pagina en el array");
      }

    }
   
  }, [currentPage,countItems, lastPage, updatePagination]);
  //}, [countItems, lastPage, updatePagination]);

  const updateCurrentPage = (chosenPage) => { 
    setCurrentPage(chosenPage);
    updatePage(chosenPage);
    if (currentPage !== chosenPage){
      setDisabledPagination(true)
      setLoading(true)
    }
    
  }

  const arrayPagesPrev = () => {
    let prev = currentPage - 1;
    if (!arrayPages.includes(prev)){
      let newArrayPages = arrayPages.map(num => num - 1);
      setArrayPages(newArrayPages);
    }
    setCurrentPage(prev);
    updatePage(prev);
    setDisabledPagination(true)
    setLoading(true)
    
  }

  const arrayPagesNext = () => {
    let next = currentPage + 1;
    if (!arrayPages.includes(next)){
      let newArrayPages = arrayPages.map(num => num + 1);
      setArrayPages(newArrayPages);
    }
    setCurrentPage(next);
    updatePage(next);
    setDisabledPagination(true)
    setLoading(true)
    
  }

  return (
      <Pagination>
        {currentPage === 1 ? 
          <Pagination.First disabled/>
        : 
          <Pagination.First disabled={disabledPagination} onClick={() => updateCurrentPage(1)}/>
        }
        
        {currentPage === 1 ? 
          <Pagination.Prev disabled/>
        : 
          <Pagination.Prev disabled={disabledPagination} onClick={() => arrayPagesPrev()}/>
        }
          {arrayPages.map(page => (
            (page === currentPage) ? 
              <Pagination.Item key={page} disabled={disabledPagination} onClick={() => updateCurrentPage(page)} active>{page}</Pagination.Item>
            : <Pagination.Item key={page} disabled={disabledPagination} onClick={() => updateCurrentPage(page)}>{page}</Pagination.Item>
          ))}
        {currentPage === lastPage ? 
          <Pagination.Next disabled/>      
        :
          <Pagination.Next disabled={disabledPagination} onClick={() => arrayPagesNext()}/>
        }
        {currentPage === lastPage ? 
          <Pagination.Last disabled/>      
        :
          <Pagination.Last disabled={disabledPagination} onClick={() => updateCurrentPage(lastPage)}/> 
        }   
        
      </Pagination>
  );
}
  
export default AdvancedPagination;
