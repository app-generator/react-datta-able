import Form from 'react-bootstrap/Form';

const SwitchExample = () => {
  return (
    <Form>
      <Form.Check 
        disabled
        type="switch"
        label="disabled switch"
        id="disabled-custom-switch"
      />
    </Form>
  );
}

export default SwitchExample;