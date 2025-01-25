import React from 'react';
import { Box, Heading, Stack } from '@chakra-ui/react';

function MonsterGen({ isLocal }) {
  return (
    <Stack gap="8">
      <Box mt="4">
        <Heading size="3xl">Project Township Monster Creation Tool</Heading>
        {isLocal ? <Heading>Running in Local Mode</Heading> : null}
      </Box>
    </Stack>
  );
}

export default MonsterGen;
