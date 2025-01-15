import React, { useEffect, useState } from 'react';
import NameInput from './NameInput/NameInput';
import RaceInput from './RaceInput/RaceInput';
import BaseStatsInput from './BaseStatsInput/BaseStatsInput';
import GrowthRatesInput from './GrowthRatesInput/GrowthRatesInput';
import './Input.css';

const CharacterCreatorInputForm = ({characterInfo}) => {
  const {name, setName, race, setRace, baseStats, setBaseStats, growthRates, setGrowthRates} = characterInfo;
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
