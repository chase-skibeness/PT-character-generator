import React from 'react';
import './GrowthRatesInput.css';

const GROWTH_RATES = {
  Minimal: {
    name: 'Minimal',
    code: '--',
    probability: 0.05,
    description: '+1 every 3 levels',
    calcGrowth: (level) => (level % 3 === 0 ? 1 : 0),
  },
  Steady: {
    name: 'Steady',
    code: '-',
    probability: 0.2,
    description: '+1 every 2 levels',
    calcGrowth: (level) => (level % 2 === 0 ? 1 : 0),
  },
  Normal: {
    name: 'Normal',
    code: '_',
    probability: 0.5,
    description: '+1 every level',
    calcGrowth: () => 1,
  },
  Gradual: {
    name: 'Gradual',
    code: '+',
    probability: 0.1,
    description: '+1 every level, bonus +1 every 3 levels',
    calcGrowth: (level) => (level % 3 == 0 ? 2 : 1),
  },
  Accelerated: {
    name: 'Accelerated',
    code: '++',
    probability: 0.2,
    description: '+1 every level, bonus +1 every 2 levels',
    calcGrowth: (level) => (level % 2 === 0 ? 2 : 1),
  },
  Exceptional: {
    name: 'Exceptional',
    code: '*',
    probability: 0.05,
    description: '2 every level',
    calcGrowth: () => 2,
  },
};

const GrowthRatesInput = ({ growthRates, setGrowthRates }) => {
  function generateGrowthRate(statName) {
    const growthRate = getRandomGrowthRate();
    setGrowthRate(statName, growthRate);
  }

  function getRandomGrowthRate() {
    const roll = Math.random();
    let cumulativeProbability = 0;

    for (const growthRateName in GROWTH_RATES) {
      const rate = GROWTH_RATES[growthRateName];
      cumulativeProbability += rate.probability;

      if (roll <= cumulativeProbability) {
        return rate;
      }
    }

    return GROWTH_RATES.Gradual;
  }

  function setGrowthRate(statName, newGrowthRate) {
    const newGrowthRates = { ...growthRates };
    newGrowthRates[statName] = newGrowthRate;
    setGrowthRates(newGrowthRates);
  }

  function generateAllGrowthRates() {
    const newGrowthRates = { ...growthRates };
    Object.keys(newGrowthRates).forEach((statName) => {
      newGrowthRates[statName] = getRandomGrowthRate();
    });
    setGrowthRates(newGrowthRates);
  }

  function clearAllGrowthRates() {
    const newGrowthRates = { ...growthRates };
    Object.keys(newGrowthRates).forEach((statName) => {
      newGrowthRates[statName] = '';
    });
    setGrowthRates(newGrowthRates);
  }

  return (
    <div className="growth-rate-container">
      <div className="growth-rate-controls">
        <h2>Natural Growth Rates</h2>
        <div className="growth-rate-definitions">
          {Object.keys(GROWTH_RATES).map((growthRateName) => (
            <div
              key={`${GROWTH_RATES[growthRateName].name}: ${GROWTH_RATES[growthRateName].description}Key`}
            >
              <strong>{`${GROWTH_RATES[growthRateName].code}:`}</strong>
              <details>{` ${GROWTH_RATES[growthRateName].description}`}</details>
            </div>
          ))}
        </div>
        <button onClick={generateAllGrowthRates}>Generate All</button>
        <button onClick={clearAllGrowthRates}>Clear</button>
      </div>
      <div className="growth-rate-fields">
        {Object.keys(growthRates).map((statName) => (
          <div key={`${statName}InputContainerKey`}>
            <label key={`${statName}InputLabelKey`}>{statName}</label>
            <select
              onChange={(e) =>
                setGrowthRate(statName, GROWTH_RATES[e.target.value])
              }
              value={growthRates[statName]?.name || ''}
            >
              <option value="">--Choose Growth Rate--</option>
              {Object.keys(GROWTH_RATES).map((growthRateName) => (
                <option
                  key={`growthRateOption${growthRateName}`}
                  value={growthRateName}
                >
                  {GROWTH_RATES[growthRateName].code}
                </option>
              ))}
            </select>
            <button
              key={`${statName}Generator`}
              onClick={() => generateGrowthRate(statName)}
            >
              Generate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrowthRatesInput;
