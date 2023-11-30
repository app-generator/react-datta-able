import React from 'react';
import { Button } from 'react-bootstrap';

const PostButton = ({ onClick }) => {
  return (
    <React.Fragment>
      <Button onClick={onClick}>
        Consultar
      </Button>
    </React.Fragment>
  );
};

export default PostButton;