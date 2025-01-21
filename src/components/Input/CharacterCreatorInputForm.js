import React, { useEffect, useState } from 'react';
import NameInput from './NameInput/NameInput';
import RaceInput from './RaceInput/RaceInput';
import BaseStatsInput from './BaseStatsInput/BaseStatsInput';
import GrowthRatesInput from './GrowthRatesInput/GrowthRatesInput';
import { GridItem, SimpleGrid } from '@chakra-ui/react';
//import './Input.css';

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
    <SimpleGrid columns={[4]} gap="25px">
      <GridItem colSpan={{ base: 2 }}>
        <NameInput name={name} setName={setName} />
      </GridItem>
      <GridItem colSpan={{ base: 2 }}>
        <RaceInput race={race} setRace={setRace} />
      </GridItem>
      <GridItem colSpan={{ base: 2 }}>
        <BaseStatsInput
          baseStats={baseStats}
          setBaseStats={setBaseStats}
          race={race}
        />
      </GridItem>
      <GridItem colSpan={{ base: 2 }}>
        <GrowthRatesInput
          growthRates={growthRates}
          setGrowthRates={setGrowthRates}
        />
      </GridItem>
    </SimpleGrid>
  );
};

export default CharacterCreatorInputForm;
