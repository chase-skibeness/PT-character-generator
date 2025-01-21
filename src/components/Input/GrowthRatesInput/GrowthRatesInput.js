import {
  Group,
  Card,
  Heading,
  Button,
  SimpleGrid,
  GridItem,
  Field,
  Badge,
  IconButton,
  createListCollection,
  Select,
} from '@chakra-ui/react';
import { BsArrowClockwise, BsFillInfoSquareFill } from 'react-icons/bs';
import React from 'react';
//import './GrowthRatesInput.css';

const GROWTH_RATES = {
  Minimal: {
    name: 'Minimal',
    code: '--',
    probability: 0.05,
    description: '+1 every 3 levels',
    calcGrowth: (level) => (level % 3 === 0 ? 1 : 0),
  },
  Steady: {
    name: 'Steady',
    code: '-',
    probability: 0.2,
    description: '+1 every 2 levels',
    calcGrowth: (level) => (level % 2 === 0 ? 1 : 0),
  },
  Normal: {
    name: 'Normal',
    code: '_',
    probability: 0.5,
    description: '+1 every level',
    calcGrowth: () => 1,
  },
  Gradual: {
    name: 'Gradual',
    code: '+',
    probability: 0.1,
    description: '+1 every level, bonus +1 every 3 levels',
    calcGrowth: (level) => (level % 3 == 0 ? 2 : 1),
  },
  Accelerated: {
    name: 'Accelerated',
    code: '++',
    probability: 0.2,
    description: '+1 every level, bonus +1 every 2 levels',
    calcGrowth: (level) => (level % 2 === 0 ? 2 : 1),
  },
  Exceptional: {
    name: 'Exceptional',
    code: '*',
    probability: 0.05,
    description: '2 every level',
    calcGrowth: () => 2,
  },
};

const GrowthRatesInput = ({ growthRates, setGrowthRates }) => {
  function generateGrowthRate(statName) {
    const growthRate = getRandomGrowthRate();
    setGrowthRate(statName, growthRate);
  }

  function getRandomGrowthRate() {
    const roll = Math.random();
    let cumulativeProbability = 0;

    for (const growthRateName in GROWTH_RATES) {
      const rate = GROWTH_RATES[growthRateName];
      cumulativeProbability += rate.probability;

      if (roll <= cumulativeProbability) {
        return rate;
      }
    }

    return GROWTH_RATES.Gradual;
  }

  function setGrowthRate(statName, newGrowthRate) {
    const newGrowthRates = { ...growthRates };
    newGrowthRates[statName] = newGrowthRate;
    setGrowthRates(newGrowthRates);
  }

  function generateAllGrowthRates() {
    const newGrowthRates = { ...growthRates };
    Object.keys(newGrowthRates).forEach((statName) => {
      newGrowthRates[statName] = getRandomGrowthRate();
    });
    setGrowthRates(newGrowthRates);
  }

  function clearAllGrowthRates() {
    const newGrowthRates = { ...growthRates };
    Object.keys(newGrowthRates).forEach((statName) => {
      newGrowthRates[statName] = '';
    });
    setGrowthRates(newGrowthRates);
  }

  const growthRateCollection = createListCollection({
    items: Object.keys(GROWTH_RATES).map((growthRateKey) => {
      return { label: GROWTH_RATES[growthRateKey].code, value: growthRateKey };
    }),
  });

  return (
    <Card.Root>
      <Card.Header>
        <Heading>Natural Growth Rates</Heading>
      </Card.Header>
      <Card.Body>
        <SimpleGrid columns={[3]} gap={8}>
          {Object.keys(growthRates).map((statName) => (
            <GridItem>
              <Field.Root>
                <Field.HelperText>
                  <Badge
                    key={`${statName}InputLabelKey`}
                    htmlFor={`${statName}Input`}
                    variant="surface"
                  >
                    {statName}
                  </Badge>
                </Field.HelperText>
                <Group attached>
                  <Select.Root
                    collection={growthRateCollection}
                    value={[growthRates[statName]?.name]}
                    onValueChange={(e) => {
                      setGrowthRate(statName, GROWTH_RATES[e.value[0]]);
                    }}
                    positioning={{ strategy: 'fixed' }}
                    minWidth="125px"
                  >
                    <Select.Trigger>
                      <Select.ValueText placeholder="Growth Rate" />
                    </Select.Trigger>
                    <Select.Content>
                      {growthRateCollection.items.map((growthRateOption) => (
                        <Select.Item
                          item={growthRateOption}
                          key={growthRateOption.value}
                        >
                          {growthRateOption.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                  <IconButton
                    key={`${statName}Generator`}
                    onClick={() => generateGrowthRate(statName)}
                  >
                    <BsArrowClockwise />
                  </IconButton>
                </Group>
              </Field.Root>
            </GridItem>
          ))}
        </SimpleGrid>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Group>
          <Button onClick={generateAllGrowthRates} size="sm">
            <BsArrowClockwise /> All
          </Button>
          <Button onClick={clearAllGrowthRates} size="sm">
            Clear
          </Button>
        </Group>
      </Card.Footer>
    </Card.Root>
  );
};

export default GrowthRatesInput;

// Object.keys(GROWTH_RATES).map((growthRateName) => (
//   <div
//     key={`${GROWTH_RATES[growthRateName].name}: ${GROWTH_RATES[growthRateName].description}Key`}
//   >
//     <strong>{`${GROWTH_RATES[growthRateName].code}:`}</strong>
//     <p>{` ${GROWTH_RATES[growthRateName].description}`}</p>
//   </div>
// ));

// <select
//   onChange={(e) => setGrowthRate(statName, GROWTH_RATES[e.target.value])}
//   value={growthRates[statName]?.name || ''}
// >
//   <option value="">--Choose Growth Rate--</option>
//   {Object.keys(GROWTH_RATES).map((growthRateName) => (
//     <option key={`growthRateOption${growthRateName}`} value={growthRateName}>
//       {GROWTH_RATES[growthRateName].code}
//     </option>
//   ))}
// </select>;
