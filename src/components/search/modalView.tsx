// THIS FILE SHOULD NOT EXIST
// It is only a fill-in for dashboard modal UI

import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import SearchView from "./searchView";

export default function ModalView() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
      >
        {<SearchView />}
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </>
  );
}