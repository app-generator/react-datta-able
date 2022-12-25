import { Dropdown } from "react-bootstrap";
import { useState } from "react";


const options = ["Activo", "Inactivo"];

function DropdownState() {
    const [selected, setSelected] = useState(options[0]);
    return (
      <Dropdown onSelect={(e) => setSelected(e.target.value)}>
        <Dropdown.Toggle variant="secondary">
          Estado
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {options.map((value) => (
            <Dropdown.Item eventKey={selected}>
              {value}
            </Dropdown.Item>
          ))}        
        </Dropdown.Menu>
      </Dropdown>      
    );
  }
  
  export default DropdownState;