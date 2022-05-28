import React from 'react';

import { Container } from './styled';

export default function Page404() {
  document.title = `Page 404 - Inventory`;

  return (
    <Container>
      <h1>Essa página não existe</h1>
    </Container>
  );
}
