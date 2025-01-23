import React, { useState, useEffect } from 'react';
import classesData from '../../data/classes.json';
import LevelsView from './LevelView/LevelsView';
import { Card, Heading } from '@chakra-ui/react';

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
        classDef: selectedClass,
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
    <Card.Root>
      <Card.Header>
        <Heading>
          {name
            ? `${name} - Level ${levelList.findLast(() => true).level} ${levelList.findLast(() => true).classDef.name}`
            : ''}
        </Heading>
      </Card.Header>
      <Card.Body>
        <LevelsView
          levelList={levelList}
          addLevel={addLevel}
          growthRates={growthRates}
        />
      </Card.Body>
      <Card.Footer>
        <br />
        <br />
      </Card.Footer>
    </Card.Root>
  );
};

export default CharacterLevelView;
