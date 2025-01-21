import { Card, Heading, Input } from '@chakra-ui/react';
import React from 'react';

const NameInput = ({ name, setName }) => {
  return (
    <Card.Root>
      <Card.Header>
        <Heading>Character Name</Heading>
      </Card.Header>
      <Card.Body>
        <Input
          id="nameInput"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Card.Body>
    </Card.Root>
  );
};

export default NameInput;
