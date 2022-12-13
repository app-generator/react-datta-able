import Dropdown from 'react-bootstrap/Dropdown';

function FeedState() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="info" id="dropdown-basic">
        Estado
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item active>Activo</Dropdown.Item>
        <Dropdown.Item>Inactivo</Dropdown.Item>        
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default FeedState;