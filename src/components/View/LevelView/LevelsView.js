import React from 'react';
import { Table } from '@chakra-ui/react';
import LevelControls from '../LevelControls/LevelControls';
import { ActionBarRoot, ActionBarContent } from '../../ui/action-bar';

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
                  {characterAtLevel.stats[stat].value}
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
