import React, { useState } from 'react';
import './App.css';
import CharacterCreatorInputForm from './components/Input/CharacterCreatorInputForm';
import CharacterLevelView from './components/View/CharacterLevelView';

function App() {
  const [name, setName] = useState('');
  const [race, setRace] = useState('');
  const [baseStats, setBaseStats] = useState({
    STR: null,
    END: null,
    DEF: null,
    INT: null,
    SPI: null,
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
    SPI: null,
    MDF: null,
    SPD: null,
    LCK: null,
    ACC: null,
  });

  const characterInfo = {
    name: name,
    setName: setName,
    race: race,
    setRace: setRace,
    baseStats: baseStats,
    setBaseStats: setBaseStats,
    growthRates: growthRates,
    setGrowthRates: setGrowthRates,
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Project Township Character Generator</h1>
      </header>
      <main>
        <CharacterCreatorInputForm characterInfo={characterInfo} />
        <CharacterLevelView
          name={name}
          baseStats={baseStats}
          growthRates={growthRates}
        />
      </main>
    </div>
  );
}

export default App;
