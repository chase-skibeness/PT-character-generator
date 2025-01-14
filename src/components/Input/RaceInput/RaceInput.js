import React from 'react';
import races from '../../../data/races.json';

const RaceInput = ({ race, setRace }) => {
  return (
    <div>
      <h2>Select a Race</h2>
      <select onChange={(e) => setRace(races.races[e.target.value] || '')}>
        <option value="">--Choose Race--</option>
        {Object.entries(races.races).map(([key, race]) => (
          <option key={key} value={key}>
            {race.name}
          </option>
        ))}
      </select>
      <p>{race.description}</p>
    </div>
  );
};

export default RaceInput;
