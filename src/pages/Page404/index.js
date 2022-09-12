import React from 'react';

import { Container } from './styled';

export default function Page404() {
  document.title = `Page 404 - Inventory`;

  return (
    <Container>
      <h2>Essa página não existe</h2>
    </Container>
  );
}
