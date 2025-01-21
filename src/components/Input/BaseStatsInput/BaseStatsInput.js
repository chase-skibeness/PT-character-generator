import {
  Badge,
  Button,
  Card,
  Group,
  Heading,
  HStack,
  NumberInput,
  Stack,
  Field,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react';
import React from 'react';
//import './BaseStatsInput.css';

const BaseStatsInput = ({ baseStats, setBaseStats, race }) => {
  const racialBaseStats = race.baseStats;

  function getRandomBaseStat(stat) {
    return Math.floor(
      Math.random() *
        (racialBaseStats[stat].max - racialBaseStats[stat].min + 1) +
        racialBaseStats[stat].min
    );
  }

  function generateStat(stat) {
    const genStatValue = getRandomBaseStat(stat);
    setBaseStat(stat, genStatValue);
  }

  function setBaseStat(stat, newStatValue) {
    let newStats = { ...baseStats };
    newStats[stat] = { value: parseInt(newStatValue), overflow: 0 };
    setBaseStats(newStats);
  }

  function generateAllStats() {
    let newStats = { ...baseStats };
    Object.keys(newStats).map((stat) => {
      newStats[stat] = { value: getRandomBaseStat(stat), overflow: 0 };
    });
    setBaseStats(newStats);
  }

  function clearAllStats() {
    let newStats = { ...baseStats };
    Object.keys(newStats).map((stat) => {
      newStats[stat] = '';
    });
    setBaseStats(newStats);
  }

  return (
    <Card.Root>
      <Card.Header>
        <Heading>Base Stats</Heading>
      </Card.Header>
      <Card.Body>
        <SimpleGrid columns={[3]} gap={8}>
          {Object.keys(baseStats).map((stat) => (
            <GridItem>
              <Field.Root>
                <Field.HelperText>
                  <Badge
                    key={`${stat}LabelKey`}
                    htmlFor={`${stat}Input`}
                    variant="surface"
                  >
                    {stat}
                  </Badge>
                </Field.HelperText>
                <Group attached>
                  <NumberInput.Root
                    min={racialBaseStats ? racialBaseStats[stat]?.min : 0}
                    max={racialBaseStats ? racialBaseStats[stat]?.max : 100}
                    value={baseStats[stat].value || ''}
                    onValueChange={(e) => setBaseStat(stat, e.value)}
                    disabled={race === ''}
                    step={1}
                    id={`${stat}Input`}
                    key={`${stat}InputKey`}
                  >
                    <NumberInput.Input
                      placeholder={
                        racialBaseStats
                          ? `${racialBaseStats[stat].min} - ${racialBaseStats[stat].max}`
                          : ''
                      }
                    />
                  </NumberInput.Root>
                  <Button
                    key={`${stat}Generator`}
                    onClick={() => generateStat(stat)}
                    disabled={race === ''}
                  >
                    Generate
                  </Button>
                </Group>
              </Field.Root>
            </GridItem>
          ))}
        </SimpleGrid>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Group>
          <Button onClick={generateAllStats} disabled={race === ''}>
            Generate All
          </Button>
          <Button onClick={clearAllStats}>Clear</Button>
        </Group>
      </Card.Footer>
    </Card.Root>
  );
};

export default BaseStatsInput;
