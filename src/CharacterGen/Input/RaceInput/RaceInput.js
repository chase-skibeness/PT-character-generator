import React from 'react';
import racesData from 'data/races.json';
import {
  Card,
  createListCollection,
  Heading,
  Group,
  IconButton,
  Text,
} from '@chakra-ui/react';
import {
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectValueText,
  SelectItem,
} from 'ui/select';
import { BsArrowClockwise } from 'react-icons/bs';

const races = racesData.races;

const raceCollection = createListCollection({
  items: Object.keys(races).map((raceName) => {
    return { label: raceName, value: raceName };
  }),
});

const RaceInput = ({ race, setRace }) => {
  function generateRandomRace() {
    const raceKeys = Object.keys(races);
    const randomIndex = Math.floor(Math.random() * raceKeys.length);
    setRace(races[raceKeys[randomIndex]]);
  }

  return (
    <Card.Root minH="188px">
      <Card.Header>
        <Heading>Select a Race</Heading>
      </Card.Header>
      <Card.Body>
        <Group attached>
          <SelectRoot
            collection={raceCollection}
            value={[race.name]}
            onValueChange={(e) => {
              setRace(races[e.value[0]]);
            }}
            positioning={{ strategy: 'fixed' }}
          >
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
          <IconButton onClick={generateRandomRace}>
            <BsArrowClockwise />
          </IconButton>
        </Group>
      </Card.Body>
      <Card.Footer>
        <Text textStyle={'sm'}>{race.description}</Text>
      </Card.Footer>
    </Card.Root>
  );
};

export default RaceInput;
