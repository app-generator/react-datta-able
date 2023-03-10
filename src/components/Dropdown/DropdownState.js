import { Dropdown } from "react-bootstrap";
import { useState } from "react";


const options = ["Activo", "Inactivo"];

function DropdownState({state, setActive}) {
    const [selected, setSelected] = useState(options[+!state]);
    setActive(+!options.indexOf(selected));
    return (
      <Dropdown >
        <Dropdown.Toggle variant="secondary">
          {selected}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {options.map((value) => ( 
            <Dropdown.Item eventKey={value} key={value} onSelect={() => setSelected(value)} active={selected === value} >
              {value}
            </Dropdown.Item>
          ))}        
        </Dropdown.Menu>
      </Dropdown>      
    );
  }
  
  export default DropdownState;
  