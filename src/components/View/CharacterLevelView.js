import React, { useState, useEffect } from 'react';
import classesData from '../../data/classes.json';
import LevelView from './LevelView/LevelView';
import './View.css';

const classes = classesData.classes;

const CharacterLevelView = ({ name, baseStats, growthRates }) => {
  const [levelList, setLevelList] = useState([]);

  const [selectedClass, setSelectedClass] = useState(null);

  function calculateStats({ level, classDef, stats }) {
    const newStats = {};
    const modifyGrowthOnly = (statName) => {
      let classMod = classDef.modifiers[statName];
      if (!classMod) classMod = 0;
      console.log('modifyGrowthOnly', statName);
      console.log(statName, classDef.name, classDef.modifiers[statName] ?? 0);
      console.log(
        `${stats[statName]} + (${growthRates[statName].calcGrowth(level)} * (${1 + classMod}))`
      );
      console.log(
        Math.round(
          stats[statName] +
            growthRates[statName].calcGrowth(level) * (1 + classMod)
        )
      );
      return Math.round(
        stats[statName] +
          growthRates[statName].calcGrowth(level) * (1 + classMod)
      );
    };

    const modifyPrevPlusGrowth = (statName) => {
      console.log('modifyPrevPlusGrowth');
      console.log(
        `(${stats[statName]} + ${growthRates[statName].calcGrowth(level)}) * (${1 + classDef.modifiers[statName]})`
      );
      console.log(
        Math.round(
          (stats[statName] + growthRates[statName].calcGrowth(level)) *
            (1 + classDef.modifiers[statName])
        )
      );
      return Math.round(
        (stats[statName] + growthRates[statName].calcGrowth(level)) *
          (1 + classDef.modifiers[statName])
      );
    };
    Object.keys(stats).forEach((statName) => {
      newStats[statName] = modifyGrowthOnly(statName);
    });

    return newStats;
  }

  function generateClassOptions() {
    let optionList = [];
    for (const [className, classDef] of Object.entries(classes)) {
      optionList.push(
        <option key={`${className}optionkey`} value={className}>
          {classDef.name}
        </option>
      );
    }
    return optionList;
  }

  function addLevel() {
    if (levelList.length > 0) {
      const lastLevelEntry = levelList.findLast(() => true);
      setLevelList([
        ...levelList,
        {
          classDef: classes[selectedClass],
          level: lastLevelEntry.level + 1,
          stats: calculateStats(lastLevelEntry),
        },
      ]);
    } else {
      setLevelList([
        {
          classDef: classes[selectedClass],
          level: 1,
          stats: baseStats,
        },
      ]);
    }
  }

  function canAddLevel() {
    return (
      !selectedClass ||
      !Object.values(baseStats).some((stat) => stat) ||
      !Object.values(growthRates).some((stat) => stat)
    );
  }

  return (
    <div className="character-view-container">
      <div className="character-view-header">
        <h3>{name || ''}</h3>
      </div>
      {levelList.length > 0 ? (
        <div className="character-view-levels-container">
          {levelList.map((characterAtLevel) => (
            <LevelView
              key={`${name}${characterAtLevel.level}key`}
              level={characterAtLevel.level}
              classDef={characterAtLevel.classDef}
              stats={characterAtLevel.stats}
            />
          ))}
        </div>
      ) : (
        <br></br>
      )}
      <div className="character-view-levels-controls">
        <select
          onChange={(e) => setSelectedClass(e.target.value || '')}
          value={selectedClass?.name}
        >
          <option value="">--Choose Class--</option>
          {generateClassOptions()}
        </select>
        <button onClick={addLevel} disabled={canAddLevel()}>
          Add Level
        </button>
      </div>
    </div>
  );
};

export default CharacterLevelView;
