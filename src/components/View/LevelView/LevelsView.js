import React from 'react';
import { Table, Highlight } from '@chakra-ui/react';
import LevelControls from '../LevelControls/LevelControls';
import { ActionBarRoot, ActionBarContent } from '../../../ui/action-bar';

const statList = [
  'STR',
  'END',
  'DEF',
  'INT',
  'SPI',
  'MDF',
  'SPD',
  'LCK',
  'ACC',
];

const LevelsView = ({ levelList, addLevel, growthRates }) => {
  function getStatColor(characterAtLevel, checkedStat) {
    if (characterAtLevel) {
      const modifier = characterAtLevel.classDef.modifiers[checkedStat];
      if (modifier) {
        switch (true) {
          case modifier > 0.4:
            return { color: 'green.600', fontWeight: 'bold' };
          case modifier > 0.25:
            return { color: 'green.600' };
          case modifier > 0.1:
            return { color: 'green.400' };
          case modifier > 0:
            return { color: 'green.200' };
          case modifier < 0:
            return { color: 'red.500' };
          default:
            return '';
        }
      }
    }
    return '';
  }

  return (
    <>
      <Table.Root stickyHeader striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Level</Table.ColumnHeader>
            <Table.ColumnHeader>Class</Table.ColumnHeader>
            {statList.map((stat) => (
              <Table.ColumnHeader key={`${stat}header`} textAlign={'center'}>
                {stat}: {growthRates[stat]?.code}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {levelList.map((characterAtLevel) => (
            <Table.Row key={characterAtLevel.level}>
              <Table.Cell>{characterAtLevel.level}</Table.Cell>
              <Table.Cell>{characterAtLevel.classDef?.name}</Table.Cell>
              {statList.map((stat) => (
                <Table.Cell
                  key={`${characterAtLevel.level}${stat}Cellkey`}
                  textAlign={'center'}
                >
                  <Highlight
                    query={`${characterAtLevel.stats[stat].value}`}
                    styles={getStatColor(characterAtLevel, stat)}
                  >
                    {`${characterAtLevel.stats[stat].value || ''}`}
                  </Highlight>
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <ActionBarRoot open={true}>
        <ActionBarContent>
          <LevelControls levelList={levelList} addLevel={addLevel} />
        </ActionBarContent>
      </ActionBarRoot>
    </>
  );
};

export default LevelsView;
