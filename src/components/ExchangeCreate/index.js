import React from 'react';
import { Container } from 'reactstrap';

import ExchangeCreateFormContainer from '../../containers/ExchangeCreateFormContainer';
import ExchangeCreateSummaryContainer from '../../containers/ExchangeCreateSummaryContainer';

const ExchangeCreate = () => {
  return (
    <Container>
      <ExchangeCreateFormContainer />
      <ExchangeCreateSummaryContainer />
    </Container>
  );
};

export default ExchangeCreate;