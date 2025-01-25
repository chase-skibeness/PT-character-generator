import React from 'react';
import CharacterGen from './CharacterGen/CharacterGen';
import { Provider } from 'ui/provider';
import { Tabs, Container } from '@chakra-ui/react';
import MonsterGen from 'MonsterGen/MonsterGen';

const isLocal = process.env.NODE_ENV === 'development';

function App() {
  return (
    <Provider>
      <Container>
        <Tabs.Root lazyMount unmountOnExit defaultValue="tab-1">
          <Tabs.List>
            <Tabs.Trigger value="tab-1">Character Generator</Tabs.Trigger>
            <Tabs.Trigger value="tab-2">Monster Creation Tool</Tabs.Trigger>
            <Tabs.Trigger value="tab-3">Ability Creation Tool</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab-1">
            <CharacterGen />
          </Tabs.Content>
          <Tabs.Content value="tab-2">
            <MonsterGen isLocal={isLocal} />
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </Provider>
  );
}

export default App;
