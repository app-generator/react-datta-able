import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';

const options = {
  true: "Activo",
  false: "Inactivo"
};
const options2 = {
  "Activo": true,
  "Inactivo": false
};

function DropdownState({ state, setActive }) {
  
  const [selected, setSelected] = useState();

  useEffect(() => {                
    setSelected(options[state])
  }, [state]);

  const setValue = (value) => {
    setSelected(value)
    setActive(options2[value])
  }


  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary">
        {selected}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.entries(options).map(([key, value]) => (
          <Dropdown.Item eventKey={key} key={key} onSelect={() => setValue(value)} active={selected === value} >
            {value}
          </Dropdown.Item>)
          )
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownState;

  