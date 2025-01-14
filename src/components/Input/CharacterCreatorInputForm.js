import React, { useState } from 'react';
import NameInput from './NameInput/NameInput';
import RaceInput from './RaceInput/RaceInput';
import BaseStatsInput from './BaseStatsInput/BaseStatsInput';
import GrowthRatesInput from './GrowthRatesInput/GrowthRatesInput';
import './Input.css';

const CharacterCreatorInputForm = () => {
  const [name, setName] = useState('');
  const [race, setRace] = useState('');
  const [baseStats, setBaseStats] = useState({
    STR: null,
    END: null,
    DEF: null,
    INT: null,
    WILL: null,
    MDF: null,
    SPD: null,
    LCK: null,
    ACC: null,
  });
  const [growthRates, setGrowthRates] = useState({
    STR: null,
    END: null,
    DEF: null,
    INT: null,
    WILL: null,
    MDF: null,
    SPD: null,
    LCK: null,
    ACC: null,
  });

  return (
    <div className="input-form-container">
      <NameInput name={name} setName={setName} />
      <RaceInput race={race} setRace={setRace} />
      <BaseStatsInput
        baseStats={baseStats}
        setBaseStats={setBaseStats}
        race={race}
      />
      <GrowthRatesInput
        growthRates={growthRates}
        setGrowthRates={setGrowthRates}
      />
    </div>
  );
};

export default CharacterCreatorInputForm;
