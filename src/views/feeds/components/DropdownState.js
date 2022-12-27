import { Dropdown } from "react-bootstrap";
import { useState } from "react";


const options = ["Activo", "Inactivo"];

function DropdownState() {
    const [selected, setSelected] = useState(options[0]);
    console.log(selected);
    return (
      <Dropdown >
        <Dropdown.Toggle variant="secondary">
          Estado
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {options.map((value) => ( 
            <Dropdown.Item eventKey={value} key={value} onSelect={(e) => setSelected(value)} active={selected == value} >
              {value}
            </Dropdown.Item>
          ))}        
        </Dropdown.Menu>
      </Dropdown>      
    );
  }
  
  export default DropdownState;