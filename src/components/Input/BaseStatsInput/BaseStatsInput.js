import React from 'react';
import './BaseStatsInput.css';

const BaseStatsInput = ({ baseStats, setBaseStats, race }) => {
  const racialBaseStats = race.baseStats;

  function getRandomBaseStat(stat) {
    return Math.floor(
      Math.random() *
        (racialBaseStats[stat].max - racialBaseStats[stat].min + 1) +
        racialBaseStats[stat].min
    );
  }

  function generateStat(stat) {
    const genStatValue = getRandomBaseStat(stat);
    setBaseStat(stat, genStatValue);
  }

  function setBaseStat(stat, newStatValue) {
    let newStats = { ...baseStats };
    newStats[stat] = parseInt(newStatValue);
    setBaseStats(newStats);
  }

  function generateAllStats() {
    let newStats = { ...baseStats };
    Object.keys(newStats).map((stat) => {
      newStats[stat] = getRandomBaseStat(stat);
    });
    setBaseStats(newStats);
  }

  function clearAllStats() {
    let newStats = { ...baseStats };
    Object.keys(newStats).map((stat) => {
      newStats[stat] = '';
    });
    setBaseStats(newStats);
  }

  return (
    <div className="base-stats-container">
      <div className="base-stats-controls">
        <h2>Base Stats</h2>
        <button onClick={generateAllStats} disabled={race === ''}>
          Generate All
        </button>
        <button onClick={clearAllStats}>Clear</button>
      </div>
      <div className="base-stats-fields">
        {Object.keys(baseStats).map((stat) => (
          <div key={`${stat}InputContainerKey`}>
            <label key={`${stat}LabelKey`} htmlFor={`${stat}Input`}>
              {stat}
            </label>
            <input
              id={`${stat}Input`}
              key={`${stat}InputKey`}
              type="number"
              min={racialBaseStats ? racialBaseStats[stat]?.min : 0}
              max={racialBaseStats ? racialBaseStats[stat]?.max : 0}
              value={baseStats[stat] || ''}
              onChange={(e) => setBaseStat(stat, e.target.value)}
              placeholder={
                racialBaseStats
                  ? `${racialBaseStats[stat].min} - ${racialBaseStats[stat].max}`
                  : ''
              }
              disabled={race === ''}
            />
            <button
              key={`${stat}Generator`}
              onClick={() => generateStat(stat)}
              disabled={race === ''}
            >
              Generate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseStatsInput;
