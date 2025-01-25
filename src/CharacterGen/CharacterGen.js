import React, { useState } from 'react';
import CharacterCreatorInputForm from './Input/CharacterCreatorInputForm';
import CharacterLevelView from './View/CharacterLevelView';
import { Box, Heading, Stack } from '@chakra-ui/react';

function CharacterGen() {
  const [name, setName] = useState('');
  const [race, setRace] = useState('');
  const [baseStats, setBaseStats] = useState({
    STR: { value: null, overflow: 0 },
    END: { value: null, overflow: 0 },
    DEF: { value: null, overflow: 0 },
    INT: { value: null, overflow: 0 },
    SPI: { value: null, overflow: 0 },
    MDF: { value: null, overflow: 0 },
    SPD: { value: null, overflow: 0 },
    LCK: { value: null, overflow: 0 },
    ACC: { value: null, overflow: 0 },
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
    <Stack gap="8">
      <Box mt="4">
        <Heading size="3xl">Project Township Character Generator</Heading>
      </Box>
      <CharacterCreatorInputForm characterInfo={characterInfo} />
      <CharacterLevelView
        name={name}
        baseStats={baseStats}
        growthRates={growthRates}
      />
    </Stack>
  );
}

export default CharacterGen;
