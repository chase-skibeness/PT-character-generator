import React, { useState } from 'react';
import classesData from '../../../data/classes.json';
import './LevelControls.css';

const classes = classesData.classes;

const LevelControls = ({ levelList, addLevel }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [levelsToAdd, setLevelsToAdd] = useState(null);

  function isEligibleForClass({ name, requirements }) {
    const characterAtLevel = levelList.findLast(() => true);

    if (!requirements || name === characterAtLevel.classDef.name) return true;

    return (
      characterAtLevel.level >= requirements.level &&
      requirements.prerequisites.includes(characterAtLevel.classDef.name)
    );
  }

  function generateClassOptions() {
    let optionList = [];
    for (const [className, classDef] of Object.entries(classes)) {
      if (isEligibleForClass(classDef))
        optionList.push(
          <option key={`${className}optionkey`} value={className}>
            {classDef.name}
          </option>
        );
    }
    return optionList;
  }

  return (
    <div className="character-view-levels-controls">
      <select
        onChange={(e) => setSelectedClass(e.target.value || '')}
        value={selectedClass?.name}
      >
        <option value="">--Choose Class--</option>
        {generateClassOptions()}
      </select>
      <input
        type="number"
        min={1}
        defaultValue={1}
        placeholder="1"
        onChange={(e) => setLevelsToAdd(parseInt(e.target.value))}
      />
      <button
        onClick={() => addLevel(levelsToAdd, selectedClass)}
        disabled={!selectedClass}
      >
        Add Level
      </button>
    </div>
  );
};

export default LevelControls;
