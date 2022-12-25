import {Button} from 'react-bootstrap';
import { useState } from "react";

const options = ["Activo", "Inactivo"];

function StateDropdown() {
  const [selected, setSelected] = useState(options[0]);
  return (
    <Button variant="secondary">
      <form>
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          {options.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
          ))}
        </select>
      </form>
    </Button>
  );
};

export default StateDropdown;