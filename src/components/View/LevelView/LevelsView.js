import React from 'react';
import { Table } from '@chakra-ui/react';
import LevelControls from '../LevelControls/LevelControls';
import { ActionBarRoot, ActionBarContent } from '../../ui/action-bar';

const LevelsView = ({ levelList, addLevel }) => {
  return (
    <>
      <Table.Root stickyHeader striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Level</Table.ColumnHeader>
            <Table.ColumnHeader>Class</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={'end'}>STR</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={'end'}>END</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={'end'}>DEF</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={'end'}>INT</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={'end'}>SPI</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={'end'}>MDF</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={'end'}>SPD</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={'end'}>LCK</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={'end'}>ACC</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {levelList.map((characterAtLevel) => (
            <Table.Row key={characterAtLevel.level}>
              <Table.Cell>{characterAtLevel.level}</Table.Cell>
              <Table.Cell>{characterAtLevel.classDef?.name}</Table.Cell>
              <Table.Cell textAlign={'end'}>
                {characterAtLevel.stats.STR.value}
              </Table.Cell>
              <Table.Cell textAlign={'end'}>
                {characterAtLevel.stats.END.value}
              </Table.Cell>
              <Table.Cell textAlign={'end'}>
                {characterAtLevel.stats.DEF.value}
              </Table.Cell>
              <Table.Cell textAlign={'end'}>
                {characterAtLevel.stats.INT.value}
              </Table.Cell>
              <Table.Cell textAlign={'end'}>
                {characterAtLevel.stats.SPI.value}
              </Table.Cell>
              <Table.Cell textAlign={'end'}>
                {characterAtLevel.stats.MDF.value}
              </Table.Cell>
              <Table.Cell textAlign={'end'}>
                {characterAtLevel.stats.SPD.value}
              </Table.Cell>
              <Table.Cell textAlign={'end'}>
                {characterAtLevel.stats.LCK.value}
              </Table.Cell>
              <Table.Cell textAlign={'end'}>
                {characterAtLevel.stats.ACC.value}
              </Table.Cell>
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
