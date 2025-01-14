import React from 'react';

const NameInput = ({ name, setName }) => {
  return (
    <div>
      <h2>Character Name</h2>
      <input
        id="nameInput"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

export default NameInput;
