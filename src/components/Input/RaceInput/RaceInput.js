import React from 'react';
import racesData from '../../../data/races.json';
import {
  Card,
  createListCollection,
  Heading,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@chakra-ui/react';

const races = racesData.races;

const raceCollection = createListCollection({
  items: Object.keys(races).map((raceName) => {
    return { label: raceName, value: raceName };
  }),
});

const RaceInput = ({ race, setRace }) => {
  return (
    <Card.Root maxH="142px">
      <Card.Header>
        <Heading>Select a Race</Heading>
      </Card.Header>
      <Card.Body>
        <SelectRoot
          collection={raceCollection}
          value={[race.name]}
          onValueChange={(e) => {
            setRace(races[e.value[0]]);
          }}
          positioning={{ strategy: 'fixed' }}
        >
          <SelectLabel>{race.description}</SelectLabel>
          <SelectTrigger>
            <SelectValueText placeholder="--Choose Race--" />
          </SelectTrigger>
          <SelectContent>
            {raceCollection.items.map((raceOption) => (
              <SelectItem item={raceOption} key={raceOption.value}>
                {raceOption.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Card.Body>
    </Card.Root>
  );
};

export default RaceInput;
