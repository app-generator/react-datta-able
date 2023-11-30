import React from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';

const FilterSelectUrl = ({ options, itemName, partOfTheUrl, itemFilter,  itemFilterSetter, setLoading, setCurrentPage }) => {
  const getUrlNumber = (item) => {
    let itemNumber = "";
    if (item !== null) {
      const parts = item.value.split("/");
      itemNumber = parts[parts.length - 2];
      setCurrentPage(1)
      itemFilterSetter(`${partOfTheUrl}=${itemNumber}&`);
      
    } else {
      setCurrentPage(1)
      itemFilterSetter(`${partOfTheUrl}=${itemNumber}&`);
    }
    if (itemFilter !== `${partOfTheUrl}=${itemNumber}&`) {
      setLoading(true);
    }
  };

  return (
      <Form.Group>
            <Select options={options} isClearable placeholder={`Filtrar por ${itemName}`} onChange={(e) => getUrlNumber(e)} />
      </Form.Group>
    
  );
};

export default FilterSelectUrl;