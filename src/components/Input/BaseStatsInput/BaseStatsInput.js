import {
  Badge,
  Card,
  Group,
  Heading,
  SimpleGrid,
  GridItem,
  IconButton,
} from '@chakra-ui/react';
import { Button } from '../../ui/button';
import { NumberInputField, NumberInputRoot } from '../../ui/number-input';
import { Field } from '../../ui/field';
import React from 'react';
import { BsArrowClockwise } from 'react-icons/bs';

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
      newStats[stat] = { value: null };
    });
    setBaseStats(newStats);
  }

  return (
    <Card.Root>
      <Card.Header>
        <Heading>Base Stats</Heading>
      </Card.Header>
      <Card.Body>
        <SimpleGrid columns={{ base: 1, sm: 3 }} gap={8}>
          {Object.keys(baseStats).map((stat) => (
            <GridItem>
              <Field
                label={
                  <Badge
                    key={`${stat}LabelKey`}
                    htmlFor={`${stat}Input`}
                    variant="surface"
                  >
                    {stat}
                  </Badge>
                }
              >
                <Group attached>
                  <NumberInputRoot
                    min={racialBaseStats ? racialBaseStats[stat]?.min : 0}
                    max={racialBaseStats ? racialBaseStats[stat]?.max : 100}
                    value={baseStats[stat].value}
                    onValueChange={(e) => setBaseStat(stat, e.value)}
                    disabled={race === ''}
                    step={1}
                    id={`${stat}Input`}
                    key={`${stat}InputKey`}
                  >
                    <NumberInputField
                      placeholder={
                        racialBaseStats
                          ? `${racialBaseStats[stat].min} - ${racialBaseStats[stat].max}`
                          : ''
                      }
                    />
                  </NumberInputRoot>
                  <IconButton
                    key={`${stat}Generator`}
                    onClick={() => generateStat(stat)}
                    disabled={race === ''}
                  >
                    <BsArrowClockwise />
                  </IconButton>
                </Group>
              </Field>
            </GridItem>
          ))}
        </SimpleGrid>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Group>
          <Button onClick={generateAllStats} disabled={race === ''} size="sm">
            <BsArrowClockwise /> All
          </Button>
          <Button onClick={clearAllStats} size="sm">
            Clear
          </Button>
        </Group>
      </Card.Footer>
    </Card.Root>
  );
};

export default BaseStatsInput;
