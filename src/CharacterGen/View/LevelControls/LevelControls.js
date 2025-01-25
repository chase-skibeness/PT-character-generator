import React, { useState } from 'react';
import classesData from 'data/classes.json';
import { Group, IconButton, createListCollection } from '@chakra-ui/react';
import {
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectValueText,
  SelectItem,
} from 'ui/select';
import { NumberInputField, NumberInputRoot } from 'ui/number-input';
import { BsPlusCircle } from 'react-icons/bs';

const classes = classesData.classes;

const classCollection = createListCollection({
  items: Object.keys(classes).map((classKey) => {
    let c = classes[classKey];
    return { label: c.name, value: classKey };
  }),
});

const LevelControls = ({ levelList, addLevel }) => {
  const [selectedClass, setSelectedClass] = useState([]);
  const [levelsToAdd, setLevelsToAdd] = useState(1);

  function isEligibleForClass({ name, requirements }) {
    const characterAtLevel = levelList.findLast(() => true);

    if (!requirements || name === characterAtLevel.classDef?.name) return true;

    return (
      characterAtLevel.level >= requirements.level &&
      requirements?.prerequisites.includes(characterAtLevel.classDef?.name)
    );
  }

  function noStats() {
    const characterAtLevel = levelList.findLast(() => true);
    return Object.keys(characterAtLevel.stats).includes(
      (stat) => characterAtLevel.stats[stat].value === null
    );
  }

  return (
    <Group>
      <SelectRoot
        collection={classCollection}
        value={selectedClass}
        onValueChange={(e) => {
          setSelectedClass(e.value);
        }}
        positioning={{ strategy: 'fixed' }}
      >
        <SelectTrigger>
          <SelectValueText placeholder="--Choose Class--" />
        </SelectTrigger>
        <SelectContent>
          {classCollection.items.map((classOption) => {
            if (isEligibleForClass(classes[classOption?.value]))
              return (
                <SelectItem
                  item={classOption}
                  key={classOption?.value + Math.random()}
                >
                  {classOption?.label}
                </SelectItem>
              );
          })}
        </SelectContent>
      </SelectRoot>
      <NumberInputRoot
        min={1}
        value={levelsToAdd}
        onValueChange={(e) => setLevelsToAdd(parseInt(e.value))}
        defaultValue="1"
        step={1}
      >
        <NumberInputField />
      </NumberInputRoot>
      <IconButton
        onClick={() => addLevel(levelsToAdd, classes[selectedClass])}
        disabled={selectedClass.length === 0 || noStats()}
      >
        <BsPlusCircle />
      </IconButton>
    </Group>
  );
};

export default LevelControls;
