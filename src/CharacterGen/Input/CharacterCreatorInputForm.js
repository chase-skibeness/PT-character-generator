import React from 'react';
import NameInput from './NameInput/NameInput';
import RaceInput from './RaceInput/RaceInput';
import BaseStatsInput from './BaseStatsInput/BaseStatsInput';
import GrowthRatesInput from './GrowthRatesInput/GrowthRatesInput';
import { GridItem, SimpleGrid } from '@chakra-ui/react';

const CharacterCreatorInputForm = ({ characterInfo }) => {
  const {
    name,
    setName,
    race,
    setRace,
    baseStats,
    setBaseStats,
    growthRates,
    setGrowthRates,
  } = characterInfo;
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
      <GridItem>
        <NameInput name={name} setName={setName} />
      </GridItem>
      <GridItem>
        <RaceInput race={race} setRace={setRace} />
      </GridItem>
      <GridItem>
        <BaseStatsInput
          baseStats={baseStats}
          setBaseStats={setBaseStats}
          race={race}
        />
      </GridItem>
      <GridItem>
        <GrowthRatesInput
          growthRates={growthRates}
          setGrowthRates={setGrowthRates}
        />
      </GridItem>
    </SimpleGrid>
  );
};

export default CharacterCreatorInputForm;
