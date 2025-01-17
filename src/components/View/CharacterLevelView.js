import React, { useState, useEffect } from 'react';
import classesData from '../../data/classes.json';
import LevelView from './LevelView/LevelView';
import './View.css';
import LevelControls from './LevelControls/LevelControls';

const classes = classesData.classes;

const CharacterLevelView = ({ name, baseStats, growthRates }) => {
  const [levelList, setLevelList] = useState([
    {
      classDef: classes.Adventurer,
      level: 1,
      stats: baseStats,
    },
  ]);

  useEffect(() => updateLevelList(), [baseStats, growthRates]);

  function calculateStats(level, classDef, stats) {
    const newStats = {};
    const modifyGrowthOnly = (statName) => {
      let classMod = classDef.modifiers[statName];
      if (!classMod) classMod = 0;

      const growth =
        growthRates[statName]?.calcGrowth(level) * (1 + classMod) +
        stats[statName].overflow;
      const overflow = growth % 1;
      return {
        value: Math.floor(stats[statName].value + growth),
        overflow: overflow,
      };
    };

    Object.keys(stats).forEach((statName) => {
      newStats[statName] = modifyGrowthOnly(statName);
    });

    return newStats;
  }

  function addLevel(amount = 1, selectedClass) {
    let newLevelList = [...levelList];
    do {
      const lastLevelEntry = newLevelList.findLast(() => true);
      const newLevel = lastLevelEntry.level + 1;
      const prevClass = lastLevelEntry.classDef;
      const prevStats = lastLevelEntry.stats;
      newLevelList.push({
        classDef: classes[selectedClass],
        level: newLevel,
        stats: calculateStats(newLevel, prevClass, prevStats),
      });
      amount--;
    } while (amount > 0);
    setLevelList(newLevelList);
  }

  function updateLevelList() {
    setLevelList(
      levelList.map((characterAtLevel, i) => {
        if (i === 0)
          return {
            classDef: classes.Adventurer,
            level: 1,
            stats: baseStats,
          };
        const prevCharacterAtLevel = levelList[i - 1];
        return {
          classDef: characterAtLevel.classDef,
          level: characterAtLevel.level,
          stats: calculateStats(
            characterAtLevel.level,
            prevCharacterAtLevel.classDef,
            prevCharacterAtLevel.stats
          ),
        };
      })
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
      <LevelControls levelList={levelList} addLevel={addLevel} />
    </div>
  );
};

export default CharacterLevelView;
